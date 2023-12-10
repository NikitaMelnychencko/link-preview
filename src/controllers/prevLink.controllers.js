const HtmlParsServices = require('../services/htmlPars.services');
const axios = require('axios');

const PrevLinkCtr = {
  getPrevLink: async (req, res) => {
    const { urls } = req.query;

    if (!urls) {
      return res.status(400).send('URL is required');
    }
    const arrayUrls = JSON.parse(urls);
    const promises = arrayUrls.map(async url => {
      const html = await HtmlParsServices.fetchHtml(url);
      const previewData = HtmlParsServices.parseHtml(html);
      return previewData;
    });

    Promise.all(promises)
      .then(previewDataArray => {
        return res.status(200).json({
          status: 'success',
          code: 200,
          previewData: previewDataArray,
        });
      })
      .catch(error => {
        console.error('Error fetching link preview:', error.message);
        return res.status(500).send('Error fetching link preview');
      });
  },

  getMedia: async (req, res) => {
    const imageUrl = req.query.url;
    if (!imageUrl) {
      return res.status(400).send('URL is required');
    }

    try {
      const response = await axios.get(imageUrl, { responseType: 'stream' });
      res.setHeader('Content-Type', response.headers['content-type']);
      response.data.pipe(res);
    } catch (error) {
      res.status(500).send('Error fetching image');
    }
  },
};

module.exports = PrevLinkCtr;
