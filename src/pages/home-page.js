import { BusEvent, Subscriber, eventBus } from "../bus/event-bus.js";

export class HomePage extends HTMLElement {
    template = `
            <div>
                <main-nav></main-nav>
                home page
                <button class="toggle-something">Click</button>
                <button class="show-modal">Show modal</button>
                <br>
                <slot-modal class="slot-modal">
                    <div slot="header">
                        <div class="close-modal">X</div>
                        <h1>Header</h1>
                    </div>
                    <div slot="body">
                        This is body content
                    </div>
                    <div slot="footer">
                        <button class="click-1">Click1</button>
                        <button class="click-2">Click2</button>
                    </div>
                </slot-modal>
            </div>
    `;

    constructor() {
        super();
    }

    connectedCallback() {
        if (!this.rendered) {
            this.innerHTML = this.template;
            this.rendered = true;

            this.querySelector('.toggle-something').addEventListener('click', () => {
                eventBus.emit({ event: BusEvent.toggleSomething, subscribers: [Subscriber.mainNav] })
            })

            const slotModal=this.querySelector('.slot-modal');
            function toggleModal() {
                slotModal.toggleModal();
            }
            this.querySelector('.show-modal').addEventListener('click', toggleModal)
            this.querySelector('.click-1').addEventListener('click', toggleModal)
            this.querySelector('.click-2').addEventListener('click', toggleModal)
            this.querySelector('.close-modal').addEventListener('click', toggleModal)
        }
    }
}

customElements.define('home-page', HomePage);
