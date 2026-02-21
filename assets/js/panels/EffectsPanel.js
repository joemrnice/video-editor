"use strict";

export class EffectsPanel {
  #element;
  #eventBus;

  constructor(element, eventBus) {
    this.#element  = element;
    this.#eventBus = eventBus;
  }

  mount()   { this.#render(); }
  destroy() { if (this.#element) this.#element.innerHTML = ''; }

  #render() {
    if (!this.#element) return;
    this.#element.innerHTML = '';
    const header = document.createElement('div');
    header.className   = 'panel-header';
    header.textContent = 'Effects';
    this.#element.appendChild(header);
  }
}
