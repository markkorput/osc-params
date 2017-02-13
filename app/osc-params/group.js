const _ = require('lodash');

class Group {
  constructor(name) {
    this.name = name;
  }

  add(child) {
    if (!this.children) { this.children = []; }

    this.children.push(child);
  }

  setName(name) {
    this.name = name;
  }

  get(name) {
    return _.find(this.children || [], ['name', name]);
  }

  clear() {
    this.children = [];
  }
}

module.exports = Group;
