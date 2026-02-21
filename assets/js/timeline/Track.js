"use strict";

let _nextId = 0;

export class Track {
  id;
  name;
  type;
  clips;
  muted;
  locked;

  constructor({ name = 'Track', type = 'video' } = {}) {
    this.id     = ++_nextId;
    this.name   = name;
    this.type   = type;
    this.clips  = [];
    this.muted  = false;
    this.locked = false;
  }

  addClip(clip)    { this.clips.push(clip); return this; }
  removeClip(id)   { this.clips = this.clips.filter(c => c.id !== id); return this; }
  getClip(id)      { return this.clips.find(c => c.id === id) ?? null; }
}
