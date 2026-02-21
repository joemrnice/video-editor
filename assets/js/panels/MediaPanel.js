"use strict";

export class MediaPanel {
  #element;
  #eventBus;
  #items = [];

  constructor(element, eventBus) {
    this.#element  = element;
    this.#eventBus = eventBus;
  }

  mount()   { this.#render(); }
  destroy() { if (this.#element) this.#element.innerHTML = ''; }

  addItem(item)    { this.#items.push(item); this.#render(); }
  removeItem(id)   { this.#items = this.#items.filter(i => i.id !== id); this.#render(); }

  #render() {
    if (!this.#element) return;
    this.#element.innerHTML = '';
    const header  = document.createElement('div');
    header.className = 'panel-header';
    header.textContent = 'Media';
    const content = document.createElement('div');
    content.className = 'panel-content';
    this.#items.forEach(item => {
      const el = document.createElement('div');
      el.className   = 'media-item';
      el.textContent = item.name ?? 'Unnamed';
      el.addEventListener('click', () => this.#eventBus?.emit('media:select', item));
      content.appendChild(el);
    });
    this.#element.appendChild(header);
    this.#element.appendChild(content);
  }
}
