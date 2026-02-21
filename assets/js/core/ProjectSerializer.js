"use strict";

const SCHEMA_VERSION = 1;

export class ProjectSerializer {
  serialize(state) {
    return JSON.stringify({
      schemaVersion: SCHEMA_VERSION,
      savedAt:       new Date().toISOString(),
      project:       state.project,
    }, null, 2);
  }

  deserialize(json) {
    const data = JSON.parse(json);
    if (data.schemaVersion !== SCHEMA_VERSION) {
      console.warn(`[ProjectSerializer] Schema mismatch: expected ${SCHEMA_VERSION}, got ${data.schemaVersion}`);
    }
    return data;
  }

  async saveToFile(state) {
    const json  = this.serialize(state);
    const blob  = new Blob([json], { type: 'application/json' });
    const url   = URL.createObjectURL(blob);
    const a     = Object.assign(document.createElement('a'), { href: url, download: 'project.vep' });
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  async loadFromFile() {
    return new Promise((resolve, reject) => {
      const input    = Object.assign(document.createElement('input'), { type: 'file', accept: '.vep,.json' });
      input.onchange = async (e) => {
        const file = e.target.files[0];
        if (!file) return reject(new Error('No file selected'));
        const text = await file.text();
        try   { resolve(this.deserialize(text)); }
        catch (err) { reject(err); }
      };
      input.click();
    });
  }
}
