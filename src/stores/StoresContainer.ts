import {DiContainer} from 'utils';
import ServiceContainer from 'services/ServiceContainer';
import {
    FeedCarouselStore, FeedDetailsStore, VideoListStore, VideoDetailsStore
} from 'stores';

class StoresContainer extends DiContainer {
    constructor(private services: ServiceContainer) {
        super();
    }

    get feedCarouselStore(): FeedCarouselStore {
        const {feedService} = this.services;
        return this.getInstance(
            'feedCarouselStore',
            () => new FeedCarouselStore(feedService),
        );
    }

    get feedDetailsStore(): FeedDetailsStore {
        const {feedService} = this.services;
        return this.getInstance(
            'feedDetailsStore',
            () => new FeedDetailsStore(feedService),
        );
    }

    get videoListStore(): VideoListStore {
        const {feedService} = this.services;
        return this.getInstance(
            'videoListStore',
            () => new VideoListStore(feedService),
        );
    }

    get videoDetailsStore(): VideoDetailsStore {
        const {feedService} = this.services;
        return this.getInstance(
            'videoDetailsStore',
            () => new VideoDetailsStore(feedService),
        );
    }

}

export default StoresContainer;
