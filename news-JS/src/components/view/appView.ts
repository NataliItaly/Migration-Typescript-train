import News from './news/news';
import Sources from './sources/sources';
import { NewsData, SourcesData } from '../interfaces/interfaces';

export class AppView {
    private news: News;
    private sources: Sources;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    public drawNews(data: NewsData | null | undefined): void {
        const values = data?.articles ?? [];
        this.news.draw(values);
    }

    public drawSources(data: SourcesData | null | undefined): void {
        const values = data?.sources ?? [];
        this.sources.draw(values);
    }
}

export default AppView;
