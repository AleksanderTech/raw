import { navigateTo } from "../../router.js";
import { BusEvent, Subscriber, eventBus } from "../bus/event-bus.js";

export class MainNav extends HTMLElement {
    template = `
            <div class="font-bold text-lg">
               <a href="/" onclick="return false">home</a>
               <a href="/about" onclick="return false">about</a>
               <div id="toggle"></div>
            </div>
    `;

    constructor() {
        super();
    }

    connectedCallback() {
        if (!this.rendered) {
            this.innerHTML = this.template;
            this.rendered = true;
            this.querySelector('[href="/"]').addEventListener('click', () => { this.navigateTo('/') });
            this.querySelector('[href="/about"]').addEventListener('click', () => { this.navigateTo('/about') });

            eventBus.on({
                event: BusEvent.toggleSomething, subscriber: Subscriber.mainNav, handler: () => {
                    const html = this.querySelector('#toggle').innerHTML;
                    this.querySelector('#toggle').innerHTML = html == '' ? 'hello': '';
                }
            })
        }
    }

    navigateTo(url) {
        navigateTo(url)
        return false;
    }
}

customElements.define('main-nav', MainNav);
