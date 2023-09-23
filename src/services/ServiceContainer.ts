import {DiContainer} from 'utils';
import {HttpClient} from './http';
import {FeedService} from 'services';
import {HttpClientInterface} from "./http/types";

class ServiceContainer extends DiContainer {
    private get httpClient(): HttpClientInterface {
        return this.getInstance('httpClient', () => new HttpClient());
    }

    get feedService(): FeedService {
        return this.getInstance('feedService', () => new FeedService(this.httpClient));
    }

}

export default ServiceContainer;
