function BackboneAdapter(model){
  if (!(this instanceof BackboneAdapter)) return new BackboneAdapter(model);
  this.model = model;
}

BackboneAdapter.prototype = {
  subscribe: function(prop, fn){
    this.model.on('change:' + prop, fn);
  },
  unsubscribe: function(prop, fn){
    this.model.off('change:' + prop, fn);
  },
  unsubscribeAll: function(){
    this.model.off();
  },
  set: function(prop, value){
    var props = prop.split('.');
    var propsExceptLast = props.slice(0, props.length - 1);
    var obj = get(this.model, propsExceptLast);
    var lastProp = props[props.length - 1];
    if (obj.set){
      obj.set(lastProp, value);
    }else{
      obj[lastProp] = value;
    }
  },
  get: function(prop){
    return get(this.model, prop.split('.'));
  }
}

function get(obj, nestedProps){
  if (nestedProps.length === 0) throw new Error
  if (nestedProps.length > 1){
    var prop = nestedProps[0];
    return get(_get(obj, prop), nestedProps.slice(1));
  }else{
    var prop = nestedProps[0];
    return _get(obj, prop);
  }
}

function _get(obj, prop){
  if (prop in obj){
    return obj[prop];
  }else{
    return obj.get(prop);
  }
}

module.exports = BackboneAdapter;