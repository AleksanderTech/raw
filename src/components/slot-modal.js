export class SlotModal extends HTMLElement {
    slots = ['header', 'body', 'footer'];

    template = `
        <div class="slot-modal hidden fixed w-full h-full top-0 left-0 flex justify-center items-center z-10 bg-blue-100 bg-opacity-80">
            <div class="flex flex-col w-96 max-h-96 bg-white rounded-md overflow-y-auto overflow-x-hidden m-4">
               <slot name="header"></slot>
               <slot name="body"></slot>
               <slot name="footer"></slot>
            </div>
        </div>
    `;

    constructor() {
        super();
    }

    connectedCallback() {
        if (!this.rendered) {
            const children = [...this.children];
            this.innerHTML = this.template;
            children.forEach(el => {
                const slotName = el.getAttribute('slot');
                if (this.slots.includes(slotName)) this.querySelector(`slot[name="${slotName}"]`).replaceWith(el)
            })

            this.rendered = true;
        }
    }

    toggleModal() {
        this.querySelector('.slot-modal').classList.toggle('hidden');
    }
}

customElements.define('slot-modal', SlotModal);
