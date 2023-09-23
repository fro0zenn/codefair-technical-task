import {FEED_ENDPOINT, LIST_ENDPOINT} from "config/endpoints";
import {HttpClientInterface} from "../http/types";
import {IFeedItem} from "./types";

class FeedService {
    CORS_PROXY = "https://cors-anywhere.herokuapp.com/";
    MAX_NEWS = 5;
    MAX_VIDEO = 4;

    constructor(
        private readonly client: HttpClientInterface
    ) {
    }

    protected parseRssFeed = (url: string, quantity: number) => {
        return this.client.get<string>(url)
            .then((response) => {
                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(response.data, "text/xml");
                const items = xmlDoc.querySelectorAll("item");
                const feedItems: Array<IFeedItem> = [];

                for (let i = 0; i < Math.min(quantity, items.length); i++) {
                    const item = items[i];
                // console.log(item.querySelector(""));
                    const title = item.querySelector("title")?.textContent || "";
                    const link = item.querySelector("link")?.textContent || "";
                    const description = item.querySelector("description")?.textContent || "";
                    // Extract video URL from media:content tag
                    const mediaContent = item.querySelector("media\\:content, media\\:group media\\:content");
                    const videoSrc = mediaContent?.getAttribute("url") || "";

                    const imgSrcMatch = description.match(/<img src="(.*?)"/);
                    const imgSrc = imgSrcMatch ? imgSrcMatch[1] : "";

                    feedItems.push({
                        title,
                        link,
                        description,
                        videoSrc,
                        imgSrc
                    });
                }

                return feedItems;
            })
            .catch((error) => {
                console.error("Error fetching and parsing RSS feed:", error);
                return [];
            });
    };

    async getFeed(): Promise<Array<IFeedItem>> {
        try {
            return await this.parseRssFeed(this.CORS_PROXY + FEED_ENDPOINT, this.MAX_NEWS);
        } catch (error) {
            console.error('Error fetching news feed:', error);
            return [];
        }
    }

    async getFeedByLink(
      link: string,
    ): Promise<IFeedItem | undefined> {
      try {
          const data = await this.getFeed();
          const findedNews = data[+link];
          return findedNews || undefined;
      }
      catch (e) {
          console.error('Error fetching news details', e);
      }
    }

    async getVideoByLink(
        link: string,
    ): Promise<IFeedItem | undefined> {
        try {
            const data = await this.getVideoList(Math.ceil(+link/this.MAX_VIDEO+1));
            const findedVideo = data[+link];
            return findedVideo || undefined;
        }
        catch (e) {
            console.error('Error fetching video details', e);
        }
    }

    async getVideoList(page: number): Promise<Array<IFeedItem>>{
        try {
            return await this.parseRssFeed(this.CORS_PROXY + LIST_ENDPOINT, page*this.MAX_VIDEO);
        } catch (error) {
            console.error('Error fetching video list:', error);
            return [];
        }
    }
}

export default FeedService;
