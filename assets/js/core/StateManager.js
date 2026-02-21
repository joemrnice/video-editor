"use strict";

export class StateManager {
  #state;
  #eventBus;
  #subscribers = new Set();

  constructor(initialState, eventBus) {
    this.#state    = Object.freeze(structuredClone(initialState));
    this.#eventBus = eventBus;
  }

  get state() { return this.#state; }

  setState(updater) {
    const patch      = typeof updater === 'function' ? updater(this.#state) : updater;
    const next       = Object.freeze({ ...this.#state, ...patch });
    const prev       = this.#state;
    this.#state      = next;
    this.#subscribers.forEach(fn => fn(next, prev));
    this.#eventBus?.emit('state:change', { next, prev });
  }

  subscribe(fn) {
    this.#subscribers.add(fn);
    return () => this.#subscribers.delete(fn);
  }

  getSlice(key) { return this.#state[key]; }

  reset(initialState) { this.setState(initialState); }
}
