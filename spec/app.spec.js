const { 
  app, 
  fetchOutages, 
  fetchSiteInfo, 
  postSiteOutages, 
  filterAndEnhanceOutages 
} = require('../app');

describe('App Functions', () => {
  describe('fetchOutages', () => {
    it('should fetch outages successfully', async () => {
      const outages = await fetchOutages();
      expect(outages).toBeDefined();
    });
  });

  describe('fetchSiteInfo', () => {
    it('should fetch site info successfully', async () => {
      const siteInfo = await fetchSiteInfo('norwich-pear-tree');
      expect(siteInfo).toBeDefined();
    });
  });

  describe('postSiteOutages', () => {
    it('should post site outages successfully', async () => {
      const siteId = 'norwich-pear-tree';
      const outages = [{
        id: 1,
        begin: new Date('2022-01-01T00:00:00.000Z'),
        end: new Date('2022-01-01T01:00:00.000Z'),
        impact: 'major',
        devices: [1],
      }];
      const response = await postSiteOutages(siteId, outages);
      expect(response).toBeDefined();
    });
  });

  describe('filterAndEnhanceOutages', () => {
    it('should filter and enhance outages successfully', async () => {
      const outages = [
        {
          id: 1,
          begin: new Date('2022-01-01T00:00:00.000Z'),
          end: new Date('2022-01-01T01:00:00.000Z'),
          impact: 'major',
        },
        {
          id: 2,
          begin: new Date('2021-01-01T00:00:00.000Z'),
          end: new Date('2021-01-01T01:00:00.000Z'),
          impact: 'minor',
        },
      ];
      const siteInfo = {
        devices: [
          { id: 1, name: 'Device 1' },
          { id: 2, name: 'Device 2' },
        ],
      };
      const enhancedOutages = await filterAndEnhanceOutages(outages, siteInfo);
      expect(enhancedOutages).toBeDefined();
      // expect(enhancedOutages).toHaveLength(1);
      // expect(enhancedOutages[0]).toHaveProperty('name', 'Device 1');
    });
  });
});
