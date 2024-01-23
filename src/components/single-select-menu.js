import { base64ToObject } from "../../raw.js";

export class SingleSelectMenu extends HTMLElement {
  render({ items }) {
    this.innerHTML = html`
      <div data-name="container" class="w-full relative">
        <div data-name="header">
          <label data-name="headerLabel"> aaa </label>
          <button data-name="collapsedIcon">
            <svg
              data-name="collapsedIconSvg"
              xmlns="http://www.w3.org/2000/svg"
              :class="getClasses('collapsedIconSvg')"
              height="48"
              width="48"
              viewBox="0 0 48 48"
            >
              <path
                data-name="collapsedIconPath"
                :class="getClasses('collapsedIconPath')"
                d="m24 30.8-12-12 2.15-2.15L24 26.5l9.85-9.85L36 18.8Z"
              />
            </svg>
          </button>
        </div>

        <div data-name="menu" class="hidden absolute left-0 right-0 z-10 mt-1 max-h-72 overflow-auto bg-yellow-500">
          <ul data-name="menuList">
            ${items
              .map(
                (el, i) =>
                  `<li data-name="listItem${i}" class="listItem">${el.value}</li>`
              )
              .join("")}
          </ul>
        </div>
      </div>
    `;
    this.afterRender();
  }

  constructor() {
    super();
  }

  connectedCallback() {
    const items = base64ToObject(this.getAttribute("data-items"));
    console.log("single select menu initialized");
    this.render({ items: items });
  }

  afterRender() {
    this.querySelector('[data-name="collapsedIcon"]').addEventListener(
      "click",
      () => {
        this.querySelector('[data-name="menu"]').classList.toggle("hidden");
      }
    );

    this.querySelectorAll(".listItem").forEach((el) => {
      el.addEventListener("click", (e) => {
        this.dispatchEvent(
          new CustomEvent("item-selected", {
            detail: {
              value: e.target.textContent,
            },
          })
        );
        this.close();
      });
    });
  }

  close() {
    this.querySelector('[data-name="menu"]').classList.add("hidden");
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log(name, oldValue, base64ToObject(newValue))
  }

  static get observedAttributes() {
    return ["data-items"];
  }
}

customElements.define("single-select-menu", SingleSelectMenu);
