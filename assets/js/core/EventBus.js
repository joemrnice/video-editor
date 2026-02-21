"use strict";

export class EventBus {
  #listeners = new Map();

  on(event, listener) {
    if (!this.#listeners.has(event)) this.#listeners.set(event, new Set());
    this.#listeners.get(event).add(listener);
    return () => this.off(event, listener);
  }

  once(event, listener) {
    const wrapper = (data) => { listener(data); this.off(event, wrapper); };
    return this.on(event, wrapper);
  }

  off(event, listener) {
    this.#listeners.get(event)?.delete(listener);
  }

  emit(event, data) {
    this.#listeners.get(event)?.forEach(fn => {
      try { fn(data); }
      catch (err) { console.error(`[EventBus] Error in listener for "${event}":`, err); }
    });
  }

  clear(event) {
    if (event) this.#listeners.delete(event);
    else this.#listeners.clear();
  }
}
