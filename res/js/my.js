const $ = function(selector){
    return selector ? myjs.create(document.querySelectorAll(selector)) : myjs;
};

const myjs = {
    els:null,
    current:function(){ return this.type()=="NodeList" ? this.els[0] : this.els; },
    type:function(obj){ obj = obj || this.els; return Object.prototype.toString.call(obj).slice(8,-1) || typeof(obj); },
    param:(name)=>{ return (new URL(window.location.href)).searchParams.get(name); },
    create:(els)=>{
        const obj = Object.create(myjs);
        obj.els = els;
        return obj;
    },
    html:function(html=null){
        if(html===null) return this.current().innerHTML;
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
    addClass:function(name){},
    rempveClass:function(name){},
    toggleClass:function(name){},

    on:function(type, handle) { this.els.forEach(function(el){el.addEventListener(type, handle, false);}); },
    off:function(type, handle){ this.els.forEach(function(el){el.removeEventListener(type, handle, false);});},
};
