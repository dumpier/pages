const $ = function(selector){
    return selector ? myjs.create(selector) : myjs;
};

const myjs = {
    els:null,
    type:function(obj){ obj = obj || this.els; return Object.prototype.toString.call(obj).slice(8,-1) || typeof(obj); },
    isHtmlElement:function( obj ){ return this.type(obj).match(/^HTML.+Element$/) ? true:false; },
    current:function(){ return this.type()=="NodeList" ? this.els[0] : this.els; },

    param:(name)=>{ return (new URL(window.location.href)).searchParams.get(name); },
    create:(selector)=>{
        const obj = Object.create(myjs);
        // TODO $(this)=>NodeList or HtmlxxxElement
        obj.els = myjs.type(selector)=="String" ? document.querySelectorAll(selector) : selector;
        return obj;
    },
    html:function(html){
        if(!html) return this.current().innerHTML;
        this.current().innerHTML = html;
        return this;
    },
    prepend:function(html){ this.current().innerHTML=html+this.current().innerHTML; return this; },
    append:function(html){ this.current().innerHTML+=html; return this; },
    remove:function(selector){},

    first:function(){ return myjs.create(this.current()); },
    eq:function(i){ return myjs.create(this.els[i]); },
    find:function(sector){  },
    children:function(sector){  },
    parent:function(sector){  },
    closest:function(sector){  },
    next:function(sector){  },
    before:function(sector){  },

    prop:function(name, value){},
    attr:function(name, value){},

    val:function(value){},
    css:function(value){},

    on:function(type, handle) { this.els.forEach(function(el){el.addEventListener(type, handle, false);}); return this; },
    off:function(type, handle){ this.els.forEach(function(el){el.removeEventListener(type, handle, false);}); return this; },
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

