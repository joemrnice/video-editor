"use strict";

export class Renderer {
  #gl;
  #programs = new Map();

  constructor(gl) {
    this.#gl = gl;
  }

  compileShader(source, type) {
    const gl     = this.#gl;
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      const log = gl.getShaderInfoLog(shader);
      gl.deleteShader(shader);
      throw new Error(`Shader compile error: ${log}`);
    }
    return shader;
  }

  createProgram(vertSrc, fragSrc) {
    const gl   = this.#gl;
    const vert = this.compileShader(vertSrc, gl.VERTEX_SHADER);
    const frag = this.compileShader(fragSrc, gl.FRAGMENT_SHADER);
    const prog = gl.createProgram();
    gl.attachShader(prog, vert);
    gl.attachShader(prog, frag);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      throw new Error(`Program link error: ${gl.getProgramInfoLog(prog)}`);
    }
    return prog;
  }

  clear(r = 0, g = 0, b = 0, a = 1) {
    const gl = this.#gl;
    gl.clearColor(r, g, b, a);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  }
}
