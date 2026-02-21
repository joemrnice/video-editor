"use strict";

let _nextId = 0;

export class BaseEffect {
  id;
  name;
  enabled;
  params;

  constructor(name = 'Effect') {
    this.id      = ++_nextId;
    this.name    = name;
    this.enabled = true;
    this.params  = {};
  }

  apply(_gl, inputTexture, _timeMs) { return inputTexture; }
  serialize()   { return { id: this.id, name: this.name, enabled: this.enabled, params: { ...this.params } }; }
  deserialize(data) { Object.assign(this.params, data.params ?? {}); this.enabled = data.enabled ?? true; }
}
