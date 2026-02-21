"use strict";

export class Playhead {
  #positionMs = 0;
  #element;

  constructor(element) {
    this.#element = element;
  }

  get positionMs() { return this.#positionMs; }

  setPosition(ms, pixelsPerMs) {
    this.#positionMs = Math.max(0, ms);
    if (this.#element) {
      this.#element.style.transform = `translateX(${this.#positionMs * pixelsPerMs}px)`;
    }
  }
}
