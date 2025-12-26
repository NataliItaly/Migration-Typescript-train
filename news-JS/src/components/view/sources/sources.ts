import './sources.css';
import { Source } from '../../interfaces/interfaces';

class Sources {
    private setElement<T extends HTMLElement>(root: ParentNode, selector: string, callback: (el: T) => void, options?: {required?: boolean}): void {
        const el = root.querySelector(selector) as T | null;

        if (!el) {
            if (options?.required) {
                throw new Error(`Required element not found: ${selector}`);
            }
            return;
        }
        callback(el);
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

            this.setElement(sourceClone, '.source__item-name', (el) => el.textContent = item.name);

            this.setElement(sourceClone, '.source__item', (el) => {
                if (item.id) el.dataset.sourceId = item.id;
            });


            fragment.append(sourceClone);
        });

        this.setElement(document, '.sources', (el) => {
            el.innerHTML = '';
            el.append(fragment);
        }, {required: true});
    }
}

export default Sources;
