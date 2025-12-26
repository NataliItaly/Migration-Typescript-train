import './sources.css';
import { Source } from '../../interfaces/interfaces';

class Sources {
    private setElement<T extends HTMLElement>(root: ParentNode, selector: string, callback: (el: T) => void): void {
        const el = root.querySelector(selector) as T | null;
        if (el) {
            callback(el);
        }
    }

    draw(data: Source[]) {
        const fragment = document.createDocumentFragment() as DocumentFragment;
        const sourceItemTemp = document.querySelector('#sourceItemTemp') as HTMLTemplateElement | null;

        if (!sourceItemTemp) {
            console.warn('Template #sourceItemTemp wasnìt found');
            return;
        }

        data.forEach((item) => {
            const sourceClone = sourceItemTemp.content.cloneNode(true) as DocumentFragment;

            /* const nameElement = sourceClone.querySelector('.source__item-name') as HTMLElement | null;
            if (nameElement) {
                nameElement.textContent = item.name;
            } */
            this.setElement(sourceClone, '.source__item-name', (el) => el.textContent = item.name);

            /* const itemElement = sourceClone.querySelector('.source__item') as HTMLElement | null;
            if (itemElement && item.id) {
                itemElement.dataset.sourceId = item.id;
            } */
            this.setElement(sourceClone, '.source__item', (el) => {
                if (item.id) el.dataset.sourceId = item.id;
            });


            fragment.append(sourceClone);
        });

        /* const sourcesContainer = document.querySelector('.sources') as HTMLElement | null;
        if (sourcesContainer) {
            sourcesContainer.innerHTML = '';
            sourcesContainer.append(fragment);
        } else {
            console.warn('Element .sources was not found');
        } */

        this.setElement(document, '.sources', (el) => {
            el.innerHTML = '';
            el.append(fragment);
        });
    }
}

export default Sources;
