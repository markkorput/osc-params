import EventEmitter from 'events';

class Parameter extends EventEmitter{
  constructor(name, type, value, min, max) {
    super()
    this.path = name;
    this.name = name;
    this.type = type;

    if(min !== undefined)
      this.setMin(min);
    else if(type == 'color')
      this.setMin([0.0, 0.0, 0.0, 0.0]);

    if(max !== undefined)
      this.setMax(max);
    else if(type == 'color')
      this.setMax([255.0, 255.0, 255.0, 255.0]);

    this.set(value, {force: true});
  }

  set(val, opts){
    opts = opts || {}

    val = this._toType(val);
    val = (opts.force === true) ? val : this._boundedValue(val);

    // no change  , return false
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

  get(){
    return this.value;
  }

  getValue(){
    return this.get();
  }

  getValueAsString(){
    return this._toString(this.value);
  }

  setMin(val){
    this.min = this._toType(val);
  }

  getMin(){
    return this.min;
  }

  setMax(val){
    this.max = this._toType(val);
  }

  getMax(){
    return this.max;
  }

  setPath(p){
    this.path = p;
  }

  getPath(){
    return this.path || '';
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
      return [parseInt(parts[0]), parseInt(parts[1]), parseInt(parts[2]), parseInt(parts[3])];
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

  _isWithinBounds(value){
    if(this.min && this.min > value)
      return false;

    if(this.max && this.max < value)
      return false;

    return true;
  }

  _boundedValue(value){
    if(this.type == 'color' || this.type == 'point'){
      if(this.min !== undefined){
        value.forEach((part, idx) => {
          value[idx] = Math.max(this.min[idx], part);
        });
      }

      if(this.max !== undefined){
        value.forEach((part, idx) => {
          value[idx] = Math.min(this.max[idx], part);
        });
      }

      return value;
    }

    if(this.min !== undefined && this.min > value){
      value = Math.max(this.min, value);
    }

    if(this.max !== undefined && this.max < value){
      rvalue = Math.min(this.max, value);
    }

    return value;
  }
}

module.exports = Parameter;
