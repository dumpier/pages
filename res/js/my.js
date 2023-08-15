const myjs = {
    elements:[],
    create:function(selector){
        if(selector===undefined){ return myjs; }
        const obj = Object.create(myjs);
        this.elements = myjs.type(selector)=="String" ? document.querySelectorAll(selector):selector;
        return obj;
    },
    get:function(i){ return i===undefined ? this.elements : this.elements[i]; },
    all:function(){ return this.isNodeList() ? this.elements:[this.elements]; },
    type:function(obj){ obj = obj || this.elements; return Object.prototype.toString.call(obj).slice(8,-1) || typeof(obj); },
    isNodeList:function( obj ){ return this.type()=="NodeList" ? true:false; },
    isHtmlElement:function( obj ){ return this.type(obj).match(/^HTML.+Element$/) ? true:false; },
    param:(name)=>{ return (new URL(window.location.href)).searchParams.get(name); },

    show:function(){ this.all().forEach(function(el){el.style.display = "block";}); },
    hide:function(){ this.all().forEach(function(el){el.style.display = "none";}); },

    html:function(val){ return this._access("innerHTML", val); },
    text:function(val){ return this._access("textContent", val); },
    val:function(val){},
    css:function(val){},
    _access:function(prop, val){
        if(val===undefined) return this.elements[0][prop];
        this.all().forEach(function(el){el[prop] = val});
        return this;
    },
    prepend:function(html){ this.all().forEach(function(el){el.innerHTML=html+el.innerHTML;}); return this; },
    append:function(html){ this.all().forEach(function(el){el.innerHTML+=html;}); return this; },
    remove:function(selector){},

    find:function(sector){  },
    children:function(sector){  },
    parent:function(sector){  },
    closest:function(sector){  },
    next:function(sector){  },
    before:function(sector){  },

    prop:function(name, val){},
    attr:function(name, val){},

    on:function(type, handle) { this.all().forEach(function(el){el.addEventListener(type, handle, false);}); return this; },
    off:function(type, handle){ this.all().forEach(function(el){el.removeEventListener(type, handle, false);}); return this; },
};

myjs.attribute = {
    access:function(name, val){
        if(val===undefined) {
            return this.attribute.get(name);
        }

        this.attribute.set(name, val);
        return this;
    },
    has:function(name){ return this.current().hasAttribute(name); },
    get:function(name){ return this.current().getAttribute(name); },
    set:function(name, val){ this.current().setAttribute(name, val); return this; },
    remove:function(name){ this.current().removeAttribute(name, val); return this; },
};


myjs.css = {};
myjs.css.id = {};
myjs.css.class = {
    get:function(){ return this.current().classList.value; },
    has:function(name){ this.current().classList.contains(name); },
    add:function(...name){ this.current().classList.add(...name); return this; },
    remove:function(name){ this.current().classList.remove(name); return this; },
    toggle:function(name){ this.current().classList.toggle(name); return this; },
    replace:function(name, new_name){ this.current().classList.replace(name, new_name); return this; },
};
