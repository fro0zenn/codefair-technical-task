import {FeedService} from 'services';
import {IFeedItem} from "services/feed/types";
import {action, makeObservable, observable} from 'mobx';

class FeedCarouselStore {
    constructor(
        private readonly feedService: FeedService,
    ) {
        makeObservable(this);
    }

    @observable list: Array<IFeedItem> = [];
    @observable isLoading = true;

    onLoadData = async () => {
        this.updateIsLoading(true);
        try {
            this.updateList(await this.loadData());
        } catch (e) {
            this.updateList([]);
            // this.totalElements = 0;
            console.log(e);
        } finally {
            this.updateIsLoading(false);
        }
    };

    protected clear = () => {
        this.updateList([]);
    };

    loadInitialList = async () => {
        this.clear();
        await this.onLoadData();
    };

    @action
    updateList = (newList: Array<IFeedItem>) => {
        this.list = newList;
    };

    @action
    updateIsLoading = (value: boolean) => {
        this.isLoading = value;
    };

    protected loadData = async (): Promise<Array<IFeedItem>> => {
        try {
            return await this.feedService.getFeed();
        } catch (e) {
            console.log(e);
            return [];
        }
    };

    reloadData = async () => {
        await this.onLoadData();
    };
}

export default FeedCarouselStore;
