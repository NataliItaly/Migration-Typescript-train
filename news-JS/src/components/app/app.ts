import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { SourcesResponse } from '../interfaces/interfaces';


class App {
    private controller: AppController;
    private view: AppView;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start(): void {
        const sourceElement = document.querySelector('.sources') as HTMLElement | null;
        if (sourceElement) {
            sourceElement.addEventListener('click', (e: Event) => this.controller.getNews(e, (data) => this.view.drawNews(data)));
            this.controller.getSources((data: SourcesResponse) => {
                this.view.drawSources(data)
                console.log(data)
            });
        }
    }
}

export default App;
