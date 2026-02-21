"use strict";

import { BaseEffect } from './BaseEffect.js';

export class Transform extends BaseEffect {
  constructor() {
    super('Transform');
    this.params = { x: 0, y: 0, scaleX: 1, scaleY: 1, rotation: 0, anchorX: 0.5, anchorY: 0.5 };
  }

  apply(gl, inputTexture, timeMs) {
    return inputTexture;
  }
}
