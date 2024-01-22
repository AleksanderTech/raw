import { navigateTo } from "../../router.js";
import { BusEvent, Subscriber, eventBus } from "../bus/event-bus.js";

export class MainNav extends HTMLElement {
  render() {
    this.innerHTML = html`
      <div class="font-bold text-lg">
        <a href="/" onclick="return false">home</a>
        <a href="/about" onclick="return false">about</a>
        <div id="toggle"></div>
      </div>
    `;
    this.afterRender();
  }

  constructor() {
    super();
  }

  connectedCallback() {
    setTimeout(() => {
      this.render();
      this.dispatchEvent(
        new CustomEvent("initialized", {
          detail: { data: new Date() },
        })
      );
    }, 1000);
  }

  afterRender() {
    this.querySelector('[href="/"]').addEventListener("click", () => {
      this.navigateTo("/");
    });
    this.querySelector('[href="/about"]').addEventListener("click", () => {
      this.navigateTo("/about");
    });

    eventBus.on({
      event: BusEvent.toggleSomething,
      subscriber: Subscriber.mainNav,
      handler: () => {
        const html = this.querySelector("#toggle").innerHTML;
        this.querySelector("#toggle").innerHTML = html == "" ? "hello" : "";
      },
    });
  }

  navigateTo(url) {
    navigateTo(url);
    return false;
  }
}

customElements.define("main-nav", MainNav);
