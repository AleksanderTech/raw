export class AboutPage extends HTMLElement {
    template = `
            <div class="font-bold text-lg">
                <main-nav></main-nav>
                about page
                <button id="increment">Increment</button>
                <div>Counter: <span id="counter"></span></div>
            </div>
    `;

    constructor() {
        super();
    }

    connectedCallback() {
        if (!this.rendered) {
            this.innerHTML = this.template;
            this.rendered = true;
            let counter= 0;
            const counterEl = this.querySelector('#counter');
            counterEl.innerHTML = counter;
            this.querySelector('#increment').addEventListener('click', () => {
                counter++;
                counterEl.innerHTML = counter;
            })
        }
    }
}

customElements.define('about-page', AboutPage);
