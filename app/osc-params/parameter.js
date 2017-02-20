import EventEmitter from 'events';

class Parameter extends EventEmitter{
  constructor(name, type, value, min, max) {
    super()
    this.path = name;
    this.name = name;
    this.type = type;
    this.min = min;
    this.max = max;
    this.set(value)
  }

  set(val){
    val = this._toType(val);

    // no change, return false
    if(val == this.value){
      return false;
    }

    const oldVal = this.value;
    this.value = val;

    // emit change event
    this.emit('change', val, oldVal);
    // return true, indicating the value changed
    return true;
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

  getValueAsString(){
    return this._toString(this.value);
  }

  _toType(value){
    if(this.type == 'string')
      return value.toString();

    if(this.type == 'int')
      return parseInt(value);

    if(this.type == 'float')
      return parseFloat(value);

    if(this.type == 'bool')
      return (value !== false && value !== 'false' && value !== '0' && value !== 0);

    if(this.type == 'color'){
      const parts = value.toString().split(',');
      return [parseFloat(parts[0]), parseFloat(parts[1]), parseFloat(parts[2]), parseFloat(parts[3])];
    }

    if(this.type == 'point'){
      const parts = value.toString().split(',');
      return [parseFloat(parts[0]), parseFloat(parts[1]), parseFloat(parts[2])];
    }

    return value;
  }

  _toString(value){
    return value.toString();
  }
}

module.exports = Parameter;
