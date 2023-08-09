window.onload=()=>{
	tax.render("#render-1");
}

var tax = tax || {
    items:[
        ["収入", "売上", "売上（補正用）"],
        ["経費", "経費", "経費（補正用）"],
        ["控除", "基礎控除", "青色申告控除", "社会保険料控除", "小規模企業共済等掛金控除", "生命保険料控除", "地震保険料控除", "配偶者控除・配偶者特別控除", "扶養控除", "医療費控除", "控除（補正用）"],
        ["課税所得額", "※国民健康保険年間所得額", "※課税所得額による所得税率"],
        [],
        ["税金", "住民税・均等割", "住民税・所得割", "個人事業税", "所得税", "消費税", "税金（補正用）"],
        ["年金", "国民年金", "年金（補正用）"],
        ["保険", "国民健康保険・平等割", "国民健康保険・均等割", "国民健康保険・所得割", "国民健康保険・後期高齢者(支援)", "国民健康保険・後期高齢者(介護)", "保険（補正用）"],
        ["概要", "年金・保険・税金の合計", "手取り額"],
        [],
    ],

    render:(selector, items)=>{
        const html = {"raw":""};
        (items || tax.items).forEach(function(item, i){
            if (item.length==0) {
                return tax.embed(selector, html);
            }

            item.forEach(function(name, ii) {
                if (ii==0) {
                    html.raw += `<tr><th colspan=2>${name}</th><td></td><td></td></tr>`;
                } else if (ii==1) {
                    html.raw += `<tr><th rowspan=${item.length-1}></th><td>${name}</td><td></td><td></td></tr>`;
                } else {
                    html.raw += `<tr><td>${name}</td><td></td><td> </td></tr>`;
                }
            });
        });
    },

    // 生成されたHTMLをテンプレートに埋め込む
    embed:(selector, html)=>{
        // テンプレートからhtmlを取得し、代入する
        let template = $("#tax-table").first().html();
        template = template.replace(/(<tbody>)(<\/tbody>)/g, "$1"+html.raw+"$2");
        $(selector).first().append(template);
        // クリアする
        html.raw = "";
    },
};

var $ = function(name){
    const obj = myjs.new(document.querySelectorAll(name));
    return obj;
};

const myjs = {
    el:null,
    current:function(){ return this.type()=="NodeList" ? this.el[0] : this.el; },
    type:function(){ return Object.prototype.toString.call(this.el).slice(8,-1) || typeof(this.el); },
    new:(el)=>{
        const obj = Object.create(myjs);
        obj.el = el;
        return obj;
    },
    first:function(){ return myjs.new(this.current()); },
    html:function(html=null){
        if(html===null) return this.current().innerHTML;
        this.current().innerHTML = html;
        return this;
    },
    prepend:function(html){ this.current().innerHTML=html+this.current().innerHTML; return this; },
    append:function(html){ this.current().innerHTML+=html; return this; },

    param:(name)=>{ return (new URL(window.location.href)).searchParams.get(name); },
};

