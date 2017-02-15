import EventEmitter from 'events';

class Parameter extends EventEmitter{
  constructor(name, type, value, min, max) {
    super()
    this.path = name;
    this.name = name;
    this.type = type;
    this.value = value;
    this.min = min;
    this.max = max;
  }

  set(val){
    const oldVal = this.value;
    this.value = val;
    this.emit('set', val);

    if(oldVal != val)
      this.emit('change', val, oldVal);
  }

  setPath(p){
    this.path = p;
  }

  getPath(){
    return this.path || '';
  }

  getValue(){
    return this.value;
  }
}

module.exports = Parameter;
