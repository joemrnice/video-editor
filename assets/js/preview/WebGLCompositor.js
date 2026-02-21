"use strict";

export class WebGLCompositor {
  #gl;
  #renderer;
  #layers = [];

  constructor(gl, renderer) {
    this.#gl       = gl;
    this.#renderer = renderer;
  }

  addLayer(layer)    { this.#layers.push(layer); }
  removeLayer(index) { this.#layers.splice(index, 1); }
  clearLayers()      { this.#layers = []; }

  composite(timeMs) {
    this.#renderer?.clear();
    for (const layer of this.#layers) {
      layer.render?.(this.#gl, timeMs);
    }
  }
}
