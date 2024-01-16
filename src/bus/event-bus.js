export const BusEvent = {
  toggleSomething: "toggleSomething",
}

export const Subscriber = {
  mainNav: "mainNav",
}

export class EventBus {
  events = new Map();

  on({ event, subscriber, handler }) {
    this.events.set(this.#key(event, subscriber), handler);
  }

  emit({ event, data, subscribers }) {
    for (const subscriber of subscribers) {
      if (this.events.get(this.#key(event, subscriber))) {
        this.events.get(this.#key(event, subscriber))?.(data);
      }
    }
  }

  remove(event, subscriber) {
    this.events.delete(this.#key(event, subscriber));
  }

  clearAll() {
    this.events.clear();
  }

  clearAllExcept(subscribers) {
    for (const key of [...this.events.keys()]) {
      if (!subscribers.find((s) => key.endsWith(s))) {
        this.events.delete(key);
      }
    }
  }

  #key(event, subscriber) {
    return `${event}/${subscriber}`;
  }
}

export const eventBus = new EventBus();