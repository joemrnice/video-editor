"use strict";

export class TimelineController {
  #element;
  #eventBus;
  #tracks = [];
  #playheadMs = 0;
  #pixelsPerMs = 0.1;

  constructor(element, eventBus) {
    this.#element  = element;
    this.#eventBus = eventBus;
  }

  mount() {}
  destroy() {}

  get playheadMs()   { return this.#playheadMs; }
  get pixelsPerMs()  { return this.#pixelsPerMs; }
  get tracks()       { return [...this.#tracks]; }

  setPlayhead(ms) {
    this.#playheadMs = Math.max(0, ms);
    this.#eventBus?.emit('timeline:playhead', { ms: this.#playheadMs });
  }

  setZoom(pixelsPerMs) {
    this.#pixelsPerMs = Math.max(0.01, pixelsPerMs);
    this.#eventBus?.emit('timeline:zoom', { pixelsPerMs: this.#pixelsPerMs });
  }
}
