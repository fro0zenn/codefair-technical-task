import {FeedService} from 'services';
import {IFeedItem} from "services/feed/types";
import {action, makeObservable, observable} from 'mobx';

class VideoListStore {
    constructor(
        private readonly feedService: FeedService,
    ) {
        makeObservable(this);
    }

    @observable list: Array<IFeedItem> = [];
    @observable page = 1;
    @observable isLoading = true;
    @observable isLoadingMore = false;

    onLoadData = async () => {
        this.updateIsLoading(true);
        try {
            const data = await this.loadData();
            this.updateList(data);
        } catch (e) {
            this.list = [];
            this.updateList([]);
            // this.totalElements = 0;
            console.log(e);
        } finally {
            this.updateIsLoading(false);
        }
    };

    loadMore = async() => {
        try {
            this.page++;
            this.updateIsLoadingMore(true);
            const newData = await this.loadData();
            this.updateList(newData)
        } catch (e) {
            console.error(e);
            this.page--;
        }
        finally {
            this.updateIsLoadingMore(false);
        }
    };

    protected clear = () => {
        this.updateList([]);
        this.page = 1;
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

    @action
    updateIsLoadingMore = (value: boolean) => {
        this.isLoadingMore = value;
    };

    protected loadData = async (): Promise<Array<IFeedItem>> => {
        try {
            return await this.feedService.getVideoList(this.page);
        } catch (e) {
            console.log(e);
            return [];
        }
    };

    reloadData = async () => {
        await this.onLoadData();
    };
}

export default VideoListStore;
