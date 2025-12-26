import './sources.css';
import { Source } from '../../interfaces/interfaces';

class Sources {
    draw(data: Source[]) {
        const fragment = document.createDocumentFragment() as DocumentFragment;
        const sourceItemTemp = document.querySelector('#sourceItemTemp') as HTMLTemplateElement | null;

        if (!sourceItemTemp) {
            console.warn('Template #sourceItemTemp wasnìt found');
            return;
        }

        data.forEach((item) => {
            const sourceClone = sourceItemTemp.content.cloneNode(true) as DocumentFragment;

            const nameElement = sourceClone.querySelector('.source__item-name') as HTMLElement | null;
            if (nameElement) {
                nameElement.textContent = item.name;
            }

            const itemElement = sourceClone.querySelector('.source__item') as HTMLElement | null;
            if (itemElement) {
                itemElement.setAttribute('data-source-id', item.id);
            }

            fragment.append(sourceClone);
        });

        const sourcesContainer = document.querySelector('.sources') as HTMLElement | null;
        if (sourcesContainer) {
            sourcesContainer.append(fragment);
        } else {
            console.warn('Element .sources was not found');
        }
    }
}

export default Sources;
