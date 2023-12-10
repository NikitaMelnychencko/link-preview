import axios from 'axios'
import cheerio from'cheerio'
import {IHtmlParsingResult, IHtmlParsServices} from './htmlPars.type'


class HtmlParsServices implements IHtmlParsServices{
  async fetchHtml(url: string): Promise<string> {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      throw new Error('Error fetching HTML');
    }
  }

  parseHtml(html: string, customDescription?: string, customImageUrl?: string): IHtmlParsingResult {
    const $ = cheerio.load(html);

    const title = $('title').text();
    let description = $('meta[name="description"]').attr('content');
    let imageUrl = $('meta[property="og:image"]').attr('content');

    description = customDescription || description;
    imageUrl = customImageUrl || imageUrl;

    return { title, description, imageUrl };
  }
}

export default new HtmlParsServices();
