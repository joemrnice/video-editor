"use strict";

export class EffectChain {
  #effects = [];

  add(effect) {
    this.#effects.push(effect);
    return this;
  }

  remove(id) {
    this.#effects = this.#effects.filter(e => e.id !== id);
    return this;
  }

  getAll()    { return [...this.#effects]; }
  get length(){ return this.#effects.length; }

  apply(gl, inputTexture, timeMs) {
    let current = inputTexture;
    for (const effect of this.#effects) {
      if (effect.enabled !== false) {
        current = effect.apply?.(gl, current, timeMs) ?? current;
      }
    }
    return current;
  }
}
