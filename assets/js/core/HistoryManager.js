"use strict";

export class HistoryManager {
  #undoStack = [];
  #redoStack = [];
  #state;
  #eventBus;
  #maxHistory;

  constructor(stateManager, eventBus, maxHistory = 100) {
    this.#state      = stateManager;
    this.#eventBus   = eventBus;
    this.#maxHistory = maxHistory;
  }

  execute(command) {
    command.execute();
    this.#undoStack.push(command);
    if (this.#undoStack.length > this.#maxHistory) this.#undoStack.shift();
    this.#redoStack = [];
    this.#emit();
  }

  undo() {
    const cmd = this.#undoStack.pop();
    if (!cmd) return;
    cmd.undo();
    this.#redoStack.push(cmd);
    this.#emit();
  }

  redo() {
    const cmd = this.#redoStack.pop();
    if (!cmd) return;
    cmd.execute();
    this.#undoStack.push(cmd);
    this.#emit();
  }

  canUndo() { return this.#undoStack.length > 0; }
  canRedo() { return this.#redoStack.length > 0; }
  clear()   { this.#undoStack = []; this.#redoStack = []; this.#emit(); }

  #emit() {
    this.#eventBus?.emit('history:change', { canUndo: this.canUndo(), canRedo: this.canRedo() });
  }
}

export class BaseCommand {
  execute() { throw new Error('execute() must be implemented'); }
  undo()    { throw new Error('undo() must be implemented'); }
}
