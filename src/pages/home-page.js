import { BusEvent, Subscriber, eventBus } from "../bus/event-bus.js";

export class HomePage extends HTMLElement {
  render({ text, items }) {
    this.innerHTML = html`
      <div>
        <main-nav class="main-nav"></main-nav>
        <p>${text}</p>
        <button class="toggle-something">Click</button>
        <br />
        <button class="show-modal">Show modal</button>
        <br />
        <slot-modal class="slot-modal">
          <div slot="header">
            <div class="close-modal">X</div>
            <h1>Header</h1>
          </div>
          <div slot="body">This is body content</div>
          <div slot="footer">
            <button class="click-1">Click1</button>
            <button class="click-2">Click2</button>
          </div>
        </slot-modal>
        <single-select-menu
          class="single-select-menu"
          data-class="${items}"
        ></single-select-menu>
      </div>
    `;
    this.afterRender();
  }

  constructor() {
    super();
  }

  connectedCallback() {
    this.render({
      text: "HOME",
      items: [
        { value: "one" },
        { value: "two" },
        {
          value: "three",
        },
      ],
    });
  }

  afterRender() {
    this.querySelector(".toggle-something").addEventListener("click", () => {
      eventBus.emit({
        event: BusEvent.toggleSomething,
        subscribers: [Subscriber.mainNav],
      });
    });
    const toggleModal = () => {
      this.querySelector(".slot-modal").toggleModal();
    };
    this.querySelector('main-nav').addEventListener("initialized", () => {
      console.log("main nav initialized");
      console.log(this.querySelector('main-nav').navigateTo);
    });
    this.querySelector(".show-modal").addEventListener("click", toggleModal);
    this.querySelector(".click-1").addEventListener("click", toggleModal);
    this.querySelector(".click-2").addEventListener("click", toggleModal);
    this.querySelector(".close-modal").addEventListener("click", toggleModal);
  }
}

customElements.define("home-page", HomePage);
