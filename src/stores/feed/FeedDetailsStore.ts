import {FeedService} from 'services';
import {action, makeObservable, observable} from 'mobx';
import {IFeedItem} from "../../services/feed/types";

const INITIAL_DATA: IFeedItem = {
    description: '',
    imgSrc: '',
    link: '',
    title: ''
};


class FeedDetailsStore {
    constructor(
        private readonly feedService: FeedService,
    ) {
        makeObservable(this);
    }

    @observable data: IFeedItem | undefined = undefined;
    @observable isLoading = true;

    onLoadData = async (link: string) => {
        this.updateIsLoading(true);
        try {
            this.updateData(await this.loadData(link));
        } catch (e) {
            this.updateData(INITIAL_DATA);
            // this.totalElements = 0;
            console.log(e);
        } finally {
            this.updateIsLoading(false);
        }
    };

    protected clear = () => {
        this.updateData(undefined);
    };

    loadInitialData = async (link: string) => {
        this.clear();
        await this.onLoadData(link);
    };

    @action
    updateData = (newData: IFeedItem | undefined) => {
        this.data = newData;
    };

    @action
    updateIsLoading = (value: boolean) => {
        this.isLoading = value;
    };

    protected loadData = async (link: string): Promise<IFeedItem | undefined> => {
        try {
            return await this.feedService.getFeedByLink(link);
        } catch (e) {
            console.log(e);
            return undefined;
        }
    };

}

export default FeedDetailsStore;
