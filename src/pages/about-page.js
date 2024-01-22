export class AboutPage extends HTMLElement {
  render() {
    this.innerHTML = html`
      <div class="font-bold text-lg">
        <main-nav></main-nav>
        about page
        <br>
        <button class="a" id="increment">Increment</button>
        <br>
        <div>Counter: <span id="counter"></span></div>
      </div>
    `;
    this.afterRender();
  }

  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  afterRender() {
    let counter = 0;
    const counterEl = this.querySelector("#counter");
    counterEl.innerHTML = counter;
    this.querySelector("#increment").addEventListener("click", () => {
      counter++;
      counterEl.innerHTML = counter;
    });
  }
}

customElements.define("about-page", AboutPage);
