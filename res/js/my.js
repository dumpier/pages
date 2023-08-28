const myjs={
    elements:[],
    instance(selector){
        if(selector===undefined){return myjs;}
        const obj=Object.assign({}, this);
        obj.elements=this.type(selector)=="String"?document.querySelectorAll(selector):selector;
        [obj.attribute, obj.css, obj.css.id, obj.css.style, obj.css.class].forEach((p)=>{Object.assign(p,obj);});
        return obj;
    },
    on(type,handle){this.all().forEach(el=>{el.addEventListener(type,handle,false);});return this;},
    off(type,handle){this.all().forEach(el=>{el.removeEventListener(type,handle,false);});return this;},
    get(i){return i===undefined?this.elements:this.elements[i];},
    first(){return this.isNodeList()?this.elements[0]:this.elements;},
    all(){return this.isNodeList()?this.elements:[this.elements];},
    type(obj){obj=obj || this.elements;return Object.prototype.toString.call(obj).slice(8,-1) || typeof(obj);},
    isNodeList(obj){return this.type()=="NodeList"?true:false;},
    isHtmlElement(obj){return this.type(obj).match(/^HTML.+Element$/)?true:false;},
    show(){this.all().forEach(el=>{el.style.display="block";});},
    hide(){this.all().forEach(el=>{el.style.display="none";});},
    html(val){return this._access("innerHTML",val);},
    text(val){return this._access("textContent",val);},
    trim(){ let txt=this.text().replace(/(^\s+|\s+$)/gm, ""); this.text(txt); return txt; },
    table(colspan){
        let html = `<table class="table border">`+this.trim().replace(/^/gm, "<tr><td>").replace(/$/gm, "</td></tr>").replace(/\t/gm, "</td><td>") + `</table>`;
        if (colspan) html = html.replace(/<tr><td># (.+?)<\/td><\/tr>/gm, `<tr><th colspan="${colspan}">$1<\/th><\/tr>`);
        this.html(html);
    },
    _access(prop,val){ if(val===undefined){return this.first()[prop];} this.all().forEach(el=>{el[prop]=val}); return this; },
    prepend(html){this.all().forEach(el=>{el.innerHTML=html+el.innerHTML;});return this;},
    append(html){this.all().forEach(el=>{el.innerHTML+=html;});return this;},
    remove(selector){this.all().forEach(el=>{el.querySelectorAll(selector).forEach((sub)=>{sub.remove();});});return this;},
    find(selector){ const elements=[]; this.all().forEach(el=>{ let element=el.querySelectorAll(selector); if(element){elements.push(element);} }); return this.instance(elements); },
    children(){return this.instance(this.first().children);},
    parent(){return this.instance(this.first().parentElement);},
    closest(selector){ return this.instance(this.first().closest(selector)); },
    prop(name,val){return this._access(name,val);},
    attr(name,val){return this._access(name,val);},
    val(val){ if(val===undefined){return this.first().value;} this.all().forEach(el=>{el.value=val}); return this;},
};

myjs.req={
    url:(url)=>{return new URL(url===undefined?window.location.href:url);},
    base:()=>{return window.location.href.replace(/\?.+/g,"");},
    get(name){return name===undefined?this.url().searchParams.getAll():this.url().searchParams.get(name);},
};

myjs.attribute={
    access(name,val){if(val===undefined){return this.attribute.get(name);} this.attribute.set(name,val);return this;},
    has(name){return this.get().hasAttribute(name);},
    get(name){return this.get().getAttribute(name);},
    set(name,val){this.get().setAttribute(name,val);return this;},
    remove(name){this.get().removeAttribute(name,val);return this;},
};

myjs.css={};
myjs.css.id={
    get(){return this.first().id;},
    has(name){return this.first().id[name]?true:false;},
    add(name,val){this.all().forEach(el=>{el.id=val;});return obj;},
    remove(name){this.all().forEach(el=>{el.id=null;});return obj;},
};
myjs.css.style={
    get(){return this.first().style;},
    has(name){return this.first().style[name]?true:false;},
    add(name,val){this.all().forEach(el=>{el.style[name]=val;});return obj;},
    remove(name){this.all().forEach(el=>{el.style[name]=null;});return obj;},
};
myjs.css.class={
    get(){return this.first().classList.value;},
    has(name){return this.first().classList.contains(name);},
    add(...name){this.all().forEach(el=>{el.classList.add(...name)});return obj;},
    remove(name){this.all().forEach(el=>{el.classList.remove(name)});return obj;},
    toggle(name){this.all().forEach(el=>{el.classList.toggle(name)});return obj;},
    replace(name,new_name){this.all().forEach(el=>{el.classList.replace(name,new_name)});return obj;},
};
