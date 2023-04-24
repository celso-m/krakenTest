const express = require('express');
const axios = require('axios');
const app = express();
const API_KEY = 'EltgJ5G8m44IzwE6UN2Y4B4NjPW77Zk6FJK3lL23';

const BASE_URL = 'https://api.krakenflex.systems/interview-tests-mock-api/v1';

const headers = {
  'x-api-key': API_KEY,
};

const fetchOutages = async () => {
  const response = await axios.get(`${BASE_URL}/outages`, { headers });
  return response.data;
};

const fetchSiteInfo = async (siteId) => {
  const response = await axios.get(`${BASE_URL}/site-info/${siteId}`, { headers });
  return response.data;
};

const postSiteOutages = async (siteId, outages) => {
  const response = await axios.post(`${BASE_URL}/site-outages/${siteId}`, outages, { headers });
  return response.data;
};

const filterAndEnhanceOutages = async (outages, siteInfo) => {
  const filteredOutages = outages.filter((outage) => {
    const outageBegin = new Date(outage.begin);
    const isAfter2022 = outageBegin >= new Date('2022-01-01T00:00:00.000Z');
    const isDeviceInSite = siteInfo.devices.some((device) => device.id === outage.id);
    return isAfter2022 && isDeviceInSite;
  });

  const enhancedOutages = filteredOutages.map((outage) => {
    const device = siteInfo.devices.find((device) => device.id === outage.id);
    return {
      ...outage,
      name: device.name,
    };
  });

  return enhancedOutages;
};

app.get('/process-outages', async (req, res) => {
  try {
    const outages = await fetchOutages();
    const siteInfo = await fetchSiteInfo('norwich-pear-tree');
    const enhancedOutages = await filterAndEnhanceOutages(outages, siteInfo);
    await postSiteOutages('norwich-pear-tree', enhancedOutages);

    res.status(200).json({
      message: 'Outages processed successfully',
      outages: enhancedOutages,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error processing outages', error: error.message });
  }
});

module.exports = {
    app,
    fetchOutages,
    fetchSiteInfo,
    postSiteOutages,
    filterAndEnhanceOutages,
  };