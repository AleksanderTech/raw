import { BusEvent, Subscriber, eventBus } from "../bus/event-bus.js";

export class HomePage extends HTMLElement {
    template = `
            <div class="font-bold text-lg">
                <main-nav></main-nav>
                home page
                <button id="click">Click</button>
            </div>
    `;

    constructor() {
        super();
    }

    connectedCallback() {
        if (!this.rendered) {
            this.innerHTML = this.template;
            this.rendered = true;

            this.querySelector('#click').addEventListener('click', () => {
                eventBus.emit({ event: BusEvent.toggleSomething, subscribers: [Subscriber.mainNav] })
            })
        }
    }
}

customElements.define('home-page', HomePage);
