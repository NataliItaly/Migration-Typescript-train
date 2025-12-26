import './news.css';
import { NewsItem } from '../../interfaces/interfaces';
import { constants } from 'buffer';

class News {
    private setElement<T extends HTMLElement>(root: ParentNode, selector: string, callback: (el: T) => void, options?: {required?: boolean}): void {
        const el = root.querySelector(selector) as T | null;

        if (!el) {
            if (options?.required) {
                console.warn('Container .news not found');
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

            /* const newsItemElement = newsClone.querySelector('.news__item') as HTMLElement | null;
            if (newsItemElement && idx % 2) {
                newsItemElement.classList.add('alt');
            } */
            this.setElement(newsClone, '.news__item', (el) => {
                if (idx % 2) el.classList.add('alt')
            });

            /* const photoElement = newsClone.querySelector('.news__meta-photo') as HTMLElement | null;
            if (photoElement) {
                photoElement.style.backgroundImage = `url(${
                    item.urlToImage || 'img/news_placeholder.jpg'
                    })`;
            } */
            this.setElement(newsClone, '.news__meta-photo', (el) => {
                el.style.backgroundImage = `url(${
                    item.urlToImage || 'img/news_placeholder.jpg'
                    })`
            });

            /* const authorElement = newsClone.querySelector('.news__meta-author') as HTMLElement | null;
            if (authorElement) {
                authorElement.textContent = item.author || item.source.name;
            } */
            this.setElement(newsClone, '.news__meta-author', (el) => {
                el.textContent = item.author || item.source.name;
            });

            /* const dateElement = newsClone.querySelector('.news__meta-date') as HTMLElement | null;
            if (dateElement) {
                dateElement.textContent = item.publishedAt
                .slice(0, 10)
                .split('-')
                .reverse()
                .join('-');
            } */
            this.setElement(newsClone, '.news__meta-date', (el) => el.textContent = item.publishedAt
                .slice(0, 10)
                .split('-')
                .reverse()
                .join('-'));

            /* const titleElement = newsClone.querySelector('.news__description-title') as HTMLElement | null;
            if (titleElement) {
                titleElement.textContent = item.title;
            } */
            this.setElement(newsClone, '.news__description-title', (el) => el.textContent = item.title);

            /* const descriptionSourceElement = newsClone.querySelector('.news__description-source') as HTMLElement | null;
            if (descriptionSourceElement) {
                descriptionSourceElement.textContent = item.source.name;
            } */
            this.setElement(newsClone, '.news__description-source', (el) => el.textContent = item.source.name);

            /* const descriptionElement = newsClone.querySelector('.news__description-content') as HTMLElement | null;
            if (descriptionElement) {
                descriptionElement.textContent = item.description;
            } */
            this.setElement(newsClone, '.news__description-content', (el) => el.textContent = item.description);

            /* const readMoreElement = newsClone.querySelector('.news__read-more a') as HTMLElement | null;
            if (readMoreElement) {
                readMoreElement.setAttribute('href', item.url);
            } */
            this.setElement(newsClone, '.news__read-more a', (el) => el.setAttribute('href', item.url));

            fragment.append(newsClone);
        });

        /* const newsContainer = document.querySelector('.news') as HTMLElement | null;
        if (newsContainer) {
            newsContainer.innerHTML = '';
            newsContainer.appendChild(fragment);
        } else {
            console.warn('Container .news not found');
        } */

        this.setElement<HTMLElement>(document, '.news', (el) => {
            el.innerHTML = '';
            el.appendChild(fragment);
        });
    }
}

export default News;
