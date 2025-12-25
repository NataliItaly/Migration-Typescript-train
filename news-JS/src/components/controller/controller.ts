import AppLoader from './appLoader';
import { NewsResponse, SourcesResponse } from '../interfaces/interfaces';

type NewsCallback = (data: NewsResponse) => void;
type SourcesCallback = (data: SourcesResponse) => void;

class AppController extends AppLoader {
    public getSources(callback: SourcesCallback): void {
        super.getResp(
            {
                endpoint: 'sources',
            },
            callback
        );
    }

    public getNews(e: Event, callback: NewsCallback): void {
        let target = e.target as HTMLElement | null;
        const newsContainer = e.currentTarget as HTMLElement;

        while (target && target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                const sourceId = target.getAttribute('data-source-id');
                if (newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
                    super.getResp(
                        {
                            endpoint: 'everything',
                            options: {
                                sources: sourceId,
                            },
                        },
                        callback
                    );
                }
                return;
            }
            target = target.parentNode as HTMLElement | null;
        }
    }
}

export default AppController;
