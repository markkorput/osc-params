const Group = require('./group');
const Param = require('./parameter');
const _ = require('lodash');

class Layout {
  constructor(jsonText) {
    this.jsonText = jsonText;
  }

  getGroup() {
    if (this.group) {
      return this.group;
    }

    this.group = new Group();
    this.applyTo(this.group);
    return this.group;
  }

  applyTo(group) {
    if (!this.jsonText) { return; }

    const json = JSON.parse(this.jsonText);

    group.clear();

    for (const key in json) {
      if (json[key].type == undefined) {
        group.setName(key);
        this._apply(json[key], group);
      }
    }
  }

  _apply(json, group) {
    for (const key in json) {
      const data = json[key];

      if (data.type) {
        const p = new Param(key,
                                data.type,
                                data.value,
                                data.min,
                                data.max);
        group.add(p);
      } else {
        const g = new Group(key);
        this._apply(data, g);
        group.add(g);
      }
    }
  }
}

module.exports = Layout;
