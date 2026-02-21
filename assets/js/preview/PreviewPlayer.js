"use strict";

export class PreviewPlayer {
  #canvas;
  #gl;
  #playing = false;
  #currentMs = 0;

  constructor(canvas) {
    this.#canvas = canvas;
    this.#gl     = canvas.getContext('webgl2') ?? canvas.getContext('webgl');
  }

  get currentMs() { return this.#currentMs; }
  get isPlaying() { return this.#playing; }

  play()  { this.#playing = true;  }
  pause() { this.#playing = false; }
  stop()  { this.#playing = false; this.#currentMs = 0; }

  seekTo(ms) { this.#currentMs = Math.max(0, ms); }

  resize(width, height) {
    this.#canvas.width  = width;
    this.#canvas.height = height;
    if (this.#gl) this.#gl.viewport(0, 0, width, height);
  }
}
