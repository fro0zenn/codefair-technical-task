/** Main files */
import ServiceContainer from './ServiceContainer';

export { default as FeedService } from 'services/feed/FeedService';

const serviceInstance = new ServiceContainer();

export default serviceInstance;
