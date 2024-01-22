import { parseObjAttribute } from "../../raw.js";

export class SingleSelectMenu extends HTMLElement {
  render() {
    this.innerHTML = html`
      <div>
        <div>single select menu</div>
      </div>
    `;
  }

  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
    console.log(parseObjAttribute(this.getAttribute("data-class")), "single select menu");
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log(name, oldValue, newValue);
    console.log(name, parseObjAttribute(newValue));
  }

  static get observedAttributes() {
    return ["data-class"];
  }
}

customElements.define("single-select-menu", SingleSelectMenu);
