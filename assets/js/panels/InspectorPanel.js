"use strict";

export class InspectorPanel {
  #element;
  #eventBus;
  #target = null;

  constructor(element, eventBus) {
    this.#element  = element;
    this.#eventBus = eventBus;
  }

  mount()   { this.#render(); }
  destroy() { if (this.#element) this.#element.innerHTML = ''; }

  inspect(target) { this.#target = target; this.#render(); }

  #render() {
    if (!this.#element) return;
    const header = document.createElement('div');
    header.className   = 'panel-header';
    header.textContent = 'Inspector';
    this.#element.innerHTML = '';
    this.#element.appendChild(header);
  }
}
