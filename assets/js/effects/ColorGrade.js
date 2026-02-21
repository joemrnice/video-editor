"use strict";

import { BaseEffect } from './BaseEffect.js';

export class ColorGrade extends BaseEffect {
  constructor() {
    super('Color Grade');
    this.params = { brightness: 0, contrast: 1, saturation: 1, hue: 0 };
  }

  apply(gl, inputTexture, timeMs) {
    return inputTexture;
  }
}
