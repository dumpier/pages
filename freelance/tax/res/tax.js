window.onload=()=>{
	tax.render("#render-1");
    $("input[type=text].amount").on("change", function(e){ tax.amount.change(); });
    $("input[type=text].age").on("change", function(){ tax.amount.change(); });
    console.log($("input[type=text].age"));
}

var tax = tax || {
    items:[
        {editable:true, title:"入力用"},
        ["収入", "売上", "売上（補正用）"],
        ["経費", "経費", "経費（補正用）"],
        ["控除", "基礎控除", "青色申告控除", "社会保険料控除", "小規模企業共済等掛金控除", "生命保険料控除", "地震保険料控除", "配偶者控除・配偶者特別控除", "扶養控除", "医療費控除", "控除（補正用）"],
        ["課税所得額", "※国民健康保険年間所得額", "※課税所得額による所得税率"],
        [],
        {editable:false, title:"結果表示用"},
        ["税金", "住民税・均等割", "住民税・所得割", "個人事業税", "所得税", "消費税", "税金（補正用）"],
        ["年金", "国民年金", "年金（補正用）"],
        ["保険", "国民健康保険・平等割", "国民健康保険・均等割", "国民健康保険・所得割", "国民健康保険・後期高齢者(支援)", "国民健康保険・後期高齢者(介護)", "保険（補正用）"],
        ["概要", "合計支払額（年金・保険・税金）", "手取り額"],
        [],
    ],

    render:(selector, items)=>{
        const html = {"raw":""};
        let operator = {};
        (items || tax.items).forEach(function(item, i){
            if (myjs.type(item)==="Object") {
                return operator = item;
            } else if (item.length == 0) {
                return tax.embed(selector, html, operator);
            }

            item.forEach(function(name, ii) {
                let css_id = `${i}-${ii}`;
                let input_yearly = operator.editable ? `<input type="text" class="amount" id="input-yearly-${css_id}" value="">` : "";
                if (ii==0) {
                    html.raw += `<tr><th colspan=2>${name}</th><td></td><td></td></tr>`;
                } else if (ii==1) {
                    html.raw += `<tr><th rowspan=${item.length-1}></th><td>${name}</td><td class="amount" id="monthly-${css_id}"></td><td id="yearly-${css_id}">${input_yearly}</td></tr>`;
                } else {
                    html.raw += `<tr><td>${name}</td><td class="amount" id="monthly-${css_id}"></td><td id="yearly-${css_id}">${input_yearly}</td></tr>`;
                }
            });
        });
    },

    // 生成されたHTMLをテンプレートに埋め込む
    embed:(selector, html, operator)=>{
        // テンプレートからhtmlを取得し、代入する
        let template = $("#tax-table").first().html();
        template = template.replace(/(<tbody>)(<\/tbody>)/g, "$1"+html.raw+"$2").replace(/{usage}/, operator.title);
        $(selector).first().append(template);
        // クリアする
        html.raw = "";
    },
};

tax.amount = {
    // 入力が変更された場合
    change:()=>{
        $("#render-1 input[type=text].amount").els.forEach(function(input){
            let css_id = input.id.replace(/input-yearly-/, "");
            let amount = input.value;
            $(`#monthly-${css_id}`).current().textContent = amount ? (amount/12).toFixed(1) : "";
        });

    },
}