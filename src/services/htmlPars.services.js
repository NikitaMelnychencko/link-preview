const axios = require('axios');
const cheerio = require('cheerio');

class HtmlParsServices {
  async fetchHtml(url) {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      throw new Error('Error fetching HTML');
    }
  }

  parseHtml(html, customDescription, customImageUrl) {
    const $ = cheerio.load(html);

    const title = $('title').text();
    let description = $('meta[name="description"]').attr('content');
    let imageUrl = $('meta[property="og:image"]').attr('content');

    description = customDescription || description;
    imageUrl = customImageUrl || imageUrl;

    return { title, description, imageUrl };
  }
}

module.exports = new HtmlParsServices();
