const _ = require('lodash');

class Group {
  constructor(name, path) {
    this.name = name;
    this.path = path || name;
    this.type = 'group';
  }

  add(child) {
    if (!this.children) { this.children = []; }

    this.children.push(child);
  }

  setName(name) {
    this.name = name;
  }

  setPath(p){
    this.path = p;
    // todo; update all child-paths
  }

  getPath(){
    return this.path || '';
  }

  get(name) {
    return _.find(this.children || [], ['name', name]);
  }

  clear() {
    this.children = [];
  }

  getChildren() {
    return this.children || [];
  }

  getParameters(recursive){
    if(recursive == undefined)
      recursive = true;

    let result = [];

    for(const child of this.getChildren()){
      if(child.type != 'group'){
        result.push(child);
      } else if(recursive) {
        result = [...result, ...child.getParameters(true)];
      }
    }

    return result;
  }
}

module.exports = Group;
