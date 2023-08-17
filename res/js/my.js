const myjs = {
    elements:[],
    instance:function(selector){
        if(selector===undefined){ return myjs; }
        const obj = Object.create(myjs);
        obj.elements = myjs.type(selector)=="String" ? document.querySelectorAll(selector):selector;
        // obj.attribute.elements = obj.css.elements = obj.css.id.elements = obj.css.style.elements = obj.css.class.elements = obj.elements;
        return obj;
    },
    on:function(type, handle) { this.all().forEach(el=>{el.addEventListener(type, handle, false);}); return this; },
    off:function(type, handle){ this.all().forEach(el=>{el.removeEventListener(type, handle, false);}); return this; },
    get:function(i){ return i===undefined ? this.elements : this.elements[i]; },
    first:function(){ return this.isNodeList() ? this.elements[0] : this.elements; },
    all:function(){ return this.isNodeList() ? this.elements:[this.elements]; },
    type:function(obj){ obj = obj || this.elements; return Object.prototype.toString.call(obj).slice(8,-1) || typeof(obj); },
    isNodeList:function( obj ){ return this.type()=="NodeList" ? true:false; },
    isHtmlElement:function( obj ){ return this.type(obj).match(/^HTML.+Element$/) ? true:false; },
    param:(name)=>{ return (new URL(window.location.href)).searchParams.get(name); },

    show:function(){ this.all().forEach(el=>{el.style.display = "block";}); },
    hide:function(){ this.all().forEach(el=>{el.style.display = "none";}); },

    html:function(val){ return this._access("innerHTML", val); },
    text:function(val){ return this._access("textContent", val); },
    _access:function(prop, val){
        if(val===undefined) { return this.first()[prop]; }
        this.all().forEach(el=>{el[prop] = val});
        return this;
    },
    prepend:function(html){ this.all().forEach(el=>{el.innerHTML=html+el.innerHTML;}); return this; },
    append:function(html){ this.all().forEach(el=>{el.innerHTML+=html;}); return this; },
    remove:function(selector){},

    find:function(selector){  },
    children:function(selector){  },
    parent:function(selector){  },
    closest:function(selector){  },
    next:function(selector){  },
    before:function(selector){  },

    prop:function(name, val){ return this._access(name, val); },
    attr:function(name, val){ return this._access(name, val); },
    val:function(val){
        if(val===undefined) { return this.first().value; }
        this.all().forEach(el=>{el.value = val});
        return this;
    },
};

myjs.attribute = {
    access:function(name, val){
        if(val===undefined) {
            return this.attribute.get(name);
        }

        this.attribute.set(name, val);
        return this;
    },
    has:function(name){ return this.get().hasAttribute(name); },
    get:function(name){ return this.get().getAttribute(name); },
    set:function(name, val){ this.get().setAttribute(name, val); return this; },
    remove:function(name){ this.get().removeAttribute(name, val); return this; },
};

myjs.css = {};
myjs.css.id = {};
myjs.css.style = {};
myjs.css.class = {
    get:function(){ return this.get().classList.value; },
    has:function(name){ this.get().classList.contains(name); },
    add:function(...name){ this.get().classList.add(...name); return this; },
    remove:function(name){ this.get().classList.remove(name); return this; },
    toggle:function(name){ this.get().classList.toggle(name); return this; },
    replace:function(name, new_name){ this.get().classList.replace(name, new_name); return this; },
};

