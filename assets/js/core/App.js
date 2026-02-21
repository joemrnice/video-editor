"use strict";

import { EventBus }         from './EventBus.js';
import { StateManager }     from './StateManager.js';
import { HistoryManager }   from './HistoryManager.js';
import { ProjectSerializer }from './ProjectSerializer.js';

class App {
  #eventBus;
  #state;
  #history;
  #serializer;

  constructor() {
    this.#eventBus   = new EventBus();
    this.#state      = new StateManager({ project: null, selection: [], playhead: 0 }, this.#eventBus);
    this.#history    = new HistoryManager(this.#state, this.#eventBus);
    this.#serializer = new ProjectSerializer();
  }

  get eventBus()   { return this.#eventBus; }
  get state()      { return this.#state; }
  get history()    { return this.#history; }
  get serializer() { return this.#serializer; }

  init() {
    document.addEventListener('keydown', (e) => this.#handleKeyDown(e));
    this.#eventBus.emit('app:ready', { version: '0.1.0' });
    console.info('[App] Initialized');
  }

  #handleKeyDown(e) {
    const ctrl = e.ctrlKey || e.metaKey;
    if (ctrl && e.key === 'z') { e.preventDefault(); this.#history.undo(); }
    if (ctrl && e.key === 'y') { e.preventDefault(); this.#history.redo(); }
    if (ctrl && e.key === 's') { e.preventDefault(); this.#eventBus.emit('project:save'); }
  }
}

export const app = new App();
app.init();
