import './news.css';
import { NewsItem } from '../../interfaces/interfaces';
import { constants } from 'buffer';

class News {
    private setElement<T extends HTMLElement>(root: ParentNode, selector: string, callback: (el: T) => void, options?: {required?: boolean}): void {
        const el = root.querySelector(selector) as T | null;

        if (!el) {
            if (options?.required) {
                throw new Error(`Required element not found: ${selector}`);
            }
        }
        callback(el);
    }

    draw(data: NewsItem[]): void {
        const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

        const fragment = document.createDocumentFragment() as DocumentFragment;
        const newsItemTemp = document.querySelector('#newsItemTemp') as HTMLTemplateElement | null;
        if (!newsItemTemp) {
            console.warn('Template #newsItemTemp was not found');
            return;
        }

        news.forEach((item, idx) => {
            const newsClone = newsItemTemp.content.cloneNode(true) as DocumentFragment;

            this.setElement(newsClone, '.news__item', (el) => {
                if (idx % 2) el.classList.add('alt')
            });

            this.setElement(newsClone, '.news__meta-photo', (el) => {
                el.style.backgroundImage = `url(${
                    item.urlToImage || 'img/news_placeholder.jpg'
                    })`
            });

            this.setElement(newsClone, '.news__meta-author', (el) => {
                el.textContent = item.author || item.source.name;
            });

            this.setElement(newsClone, '.news__meta-date', (el) => el.textContent = item.publishedAt
                .slice(0, 10)
                .split('-')
                .reverse()
                .join('-'));

            this.setElement(newsClone, '.news__description-title', (el) => el.textContent = item.title);

            this.setElement(newsClone, '.news__description-source', (el) => el.textContent = item.source.name);

            this.setElement(newsClone, '.news__description-content', (el) => el.textContent = item.description);

            this.setElement(newsClone, '.news__read-more a', (el) => el.setAttribute('href', item.url));

            fragment.append(newsClone);
        });

        this.setElement<HTMLElement>(document, '.news', (el) => {
            el.innerHTML = '';
            el.appendChild(fragment);
        }, {required: true});
    }
}

export default News;
