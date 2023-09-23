import StoresContainer from 'stores/StoresContainer';
import services from 'services';

const stores = new StoresContainer(services);

export { default as FeedCarouselStore } from 'stores/feed/FeedCarouselStore';
export { default as FeedDetailsStore } from 'stores/feed/FeedDetailsStore';
export { default as VideoDetailsStore } from 'stores/list/VideoDetailsStore';
export { default as VideoListStore } from 'stores/list/VideoListStore';

export default stores;
