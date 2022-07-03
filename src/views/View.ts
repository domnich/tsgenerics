import { Model } from "../models/Model";


//196
export abstract class View<T extends Model<K>, K> {
    regions: { [key: string]: Element } = {};

    constructor(
        public parent: Element,
        public model: T,
    ) {
        this.bindModel();
    }

    public abstract template(): string;

    public onRender(): void {

    }

    public regionsMap(): { [key: string]: string } {
        return {};
    }

    public eventsMap():  { [key: string]: () => void } {
        return {}
    }

    bindModel(): void {
        this.model.on('change', () => {
            this.render();
        });
    }
    

    bindEvents(fragment: DocumentFragment): void {
        const eventsMap = this.eventsMap();

        for (let eventKey in eventsMap) {
            const [eventName, selector] = eventKey.split('.');
          
            fragment.querySelectorAll(`.${selector}`).forEach((element) => {
                element.addEventListener(eventName, eventsMap[eventKey]);
            });
        }
    }

    mapRegions(fragment: DocumentFragment): void {
        const regionsMap = this.regionsMap();

        for (let key in regionsMap) {
            const selector = regionsMap[key];
            const element = fragment.querySelector(selector);
          
            if (element) {
                this.regions[key] = element;
            }
        }
    }

    render(): void {
        this.parent.innerHTML = '';

        const templateElement: HTMLTemplateElement = document.createElement('template');
        templateElement.innerHTML = this.template();
        
        this.bindEvents(templateElement.content);
        this.mapRegions(templateElement.content);

        this.onRender();

        // TODO: read detailed about DocumentFragment;
        this.parent.append(templateElement.content);
    }
}