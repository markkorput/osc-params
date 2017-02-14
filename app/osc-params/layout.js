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

    if(!Array.isArray(json) || !json.length == 1){
      console.log("Expected one-item array");
      return;
    }

    group.clear();
    this._apply(json[0], group)
  }

  _apply(json, group) {
    group.setName(json.name);

    for (const child of json.children || []) {

      // group?
      if(Array.isArray(child.children)){
        const g = new Group();
        this._apply(child, g);
        group.add(g)

      // single parameters
      } else {
        const p = new Param(child.name,
                            child.type,
                            child.value,
                            child.min,
                            child.max);
        group.add(p);
      }
    }
  }
}

module.exports = Layout;
