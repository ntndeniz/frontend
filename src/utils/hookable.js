export default class Hookable {
  constructor() {
    this.hooks = {};
  }

  hook(name, fn) {
    if (!this.hooks[name]) {
      this.hooks[name] = [];
    }
    this.hooks[name].push(fn);
  }

  async callHook(name, ...args) {
    if (!this.hooks[name]) {
      return;
    }
    for (const fn of this.hooks[name]) {
      await fn(...args);
    }
  }
}