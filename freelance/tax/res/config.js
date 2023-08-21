var config = config || {
    items:[
        {editable:true, title:"入力用"},
        ["収入", "売上", "売上（補正用）"],
        ["経費", "経費", "経費（補正用）"],
        ["控除", "基礎控除", "青色申告控除", "社会保険料控除", "小規模企業共済等掛金控除", "生命保険料控除", "地震保険料控除", "配偶者控除・配偶者特別控除", "扶養控除", "医療費控除", "住宅ローン控除", "控除（補正用）"],
        ["課税所得額", "※国民健康保険年間所得額", "※課税所得額による所得税率"],
        [],
        {editable:false, title:"結果表示用"},
        ["税金", "住民税・均等割", "住民税・所得割", "個人事業税", "所得税", "消費税", "固定資産税", "税金（補正用）"],
        ["年金", "国民年金", "年金（補正用）"],
        ["保険", "国民健康保険・平等割", "国民健康保険・均等割", "国民健康保険・所得割", "国民健康保険・後期高齢者(支援)", "国民健康保険・後期高齢者(介護)", "保険（補正用）"],
        ["概要", "合計支払額（年金・保険・税金）", "手取り額（経費含む）"],
        [],
    ],

    template:/*html*/`
<div class="flex">
    <div class="column">
        <table class="table border">
            <thead>
                <tr><th colspan="2" class="diagonal">入力用</th><th>月間(万円)</th><th>年間(万円)</th></tr>
            </thead>
            <tbody>
                <tr><th colspan="2">収入</th><td class="amount monthly" id="monthly-1-0"></td><td class="amount yearly bold" id="yearly-1-0"></td></tr>
                <tr><th rowspan="2"></th><td>売上</td><td class="amount income" id="monthly-1-1"></td><td class="right" id="yearly-1-1"><input type="text" class="amount income" id="input-yearly-1-1" data-value="600"></td></tr>
                <tr><td>売上（補正用）</td><td class="amount income" id="monthly-1-2"></td><td class="amount" id="yearly-1-2"><input type="text" class="amount income" id="input-yearly-1-2" data-value=""></td></tr>

                <tr><th colspan="2">経費</th><td class="amount monthly cost" id="monthly-2-0"></td><td class="amount yearly cost bold" id="yearly-2-0"></td></tr>
                <tr><th rowspan="2"></th><td>経費</td><td class="amount cost" id="monthly-2-1"></td><td class="right" id="yearly-2-1"><input type="text" class="amount cost" id="input-yearly-2-1" data-value="200"></td></tr>
                <tr><td>経費（補正用）</td><td class="amount cost" id="monthly-2-2"></td><td class="right" id="yearly-2-2"><input type="text" class="amount cost" id="input-yearly-2-2" data-value=""></td></tr>

                <tr><th colspan="2">控除</th><td class="amount monthly cost" id="monthly-3-0"></td><td class="amount yearly cost bold" id="yearly-3-0"></td></tr>
                <tr><th rowspan="11"></th><td>基礎控除</td><td class="amount cost" id="monthly-3-1"></td><td class="right" id="yearly-3-1"><input type="text" class="amount cost" id="input-yearly-3-1" data-value="48"></td></tr>
                <tr><td>青色申告控除</td><td class="amount cost" id="monthly-3-2"></td><td class="right" id="yearly-3-2"><input type="text" class="amount cost" id="input-yearly-3-2" data-value="65"></td></tr>
                <tr><td>社会保険料控除</td><td class="amount cost" id="monthly-3-3"></td><td class="right" id="yearly-3-3"><input type="text" class="amount cost" id="input-yearly-3-3" data-value=""></td></tr>
                <tr><td>小規模企業共済等掛金控除</td><td class="amount cost" id="monthly-3-4"></td><td class="right" id="yearly-3-4"><input type="text" class="amount cost" id="input-yearly-3-4" data-value=""></td></tr>
                <tr><td>生命保険料控除</td><td class="amount cost" id="monthly-3-5"></td><td class="right" id="yearly-3-5"><input type="text" class="amount cost" id="input-yearly-3-5" data-value=""></td></tr>
                <tr><td>地震保険料控除</td><td class="amount cost" id="monthly-3-6"></td><td class="right" id="yearly-3-6"><input type="text" class="amount cost" id="input-yearly-3-6" data-value=""></td></tr>
                <tr><td>配偶者控除・配偶者特別控除</td><td class="amount cost" id="monthly-3-7"></td><td class="right" id="yearly-3-7"><input type="text" class="amount cost" id="input-yearly-3-7" data-value=""></td></tr>
                <tr>
                    <td><span>扶養控除<span class="balloon">具体的には、扶養される親族が16歳以上18歳以下、23歳以上69歳以下の場合は38万円、特定扶養親族である19歳以上23歳未満の場合は63万円です。 70歳以上の親族は同居か別居（※）かで控除額が変わり、納税者または配偶者の直系尊属（父母・祖父母など）で同居していれば控除額は58万円、同居以外は48万円となります。</span></span></td>
                    <td class="amount cost" id="monthly-3-8"></td><td class="amount" id="yearly-3-8"><input type="text" class="amount cost" id="input-yearly-3-8" data-value=""></td></tr>
                <tr><td>医療費控除</td><td class="amount cost" id="monthly-3-9"></td><td class="amount" id="yearly-3-9"><input type="text" class="amount cost" id="input-yearly-3-9" data-value=""></td></tr>
                <tr><td>住宅ローン控除</td><td class="amount cost" id="monthly-3-10"></td><td class="amount" id="yearly-3-10"><input type="text" class="amount cost" id="input-yearly-3-10" data-value=""></td></tr>
                <tr><td>控除（補正用）</td><td class="amount cost" id="monthly-3-11"></td><td class="amount" id="yearly-3-11"><input type="text" class="amount cost" id="input-yearly-3-11" data-value=""></td></tr>

                <tr><th colspan="2"><span style="color:blue;">課税所得額</span></th><td class="amount monthly" id="monthly-4-0"></td><td class="amount yearly bold" id="yearly-4-0"></td></tr>
                <tr><th rowspan="2"></th>
                    <td><span>国民健康保険年間所得額<span class="balloon">※<span style="color:blue;">課税所得額</span>-43万円</span></span></td>
                    <td class="amount monthly" id="monthly-4-1"></td><td class="amount yearly bold" id="yearly-4-1"></td></tr>
                <tr>
                    <td><span>課税所得額による所得税率<span class="balloon"><span style="color:blue;">※課税所得額</span>より変動します。<br>　・195万以下、5%<br>　・330万以下、10%<br>　・695万以下、20%<br>　・900万以下、23%<br>　・1800万以下、33%<br>　・4000万以下、40%<br>　・4000万以上、45%</span></span></td>
                    <td class="right" id="monthly-4-2"></td><td class="right bold" id="yearly-4-2"></td>
                </tr>
            </tbody>
        </table>
    </div>

    <div class="column">
        <table class="table border">
            <thead>
                <tr><th colspan="2" class="diagonal">結果表示用</th><th>月間(万円)</th><th>年間(万円)</th></tr>
            </thead>
            <tbody>
                <tr><th colspan="2">税金</th><td class="amount monthly"></td><td class="amount yearly bold" id="yearly-7-0"></td></tr>
                <tr><th rowspan="7"></th><td>住民税・均等割</td><td class="amount monthly" id="monthly-7-1"></td><td class="amount yearly" id="yearly-7-1">0.5</td></tr>
                <tr><td><span>住民税・所得割<span class="balloon">課税所得額x一律10％<br>※道府県民税が一律4%、市町村民税が一律6%</span></span></td><td class="amount monthly" id="monthly-7-2"></td><td class="amount yearly" id="yearly-7-2"></td></tr>
                <tr><td>個人事業税</td><td class="amount monthly" id="monthly-7-3"></td><td class="amount yearly" id="yearly-7-3"></td></tr>
                <tr><td><span>所得税<span class="balloon">課税所得額x所得税率</span></span></td><td class="amount monthly" id="monthly-7-4"></td><td class="amount yearly" id="yearly-7-4"></td></tr>
                <tr><td>消費税</td><td class="amount monthly" id="monthly-7-5"></td><td class="amount yearly" id="yearly-7-5"></td></tr>
                <tr><td>固定資産税</td><td class="amount monthly" id="monthly-7-6"></td><td class="amount" id="yearly-7-6"><input type="text" class="amount" id="input-yearly-7-6" data-value=""></td></tr>
                <tr><td>税金（補正用）</td><td class="amount monthly" id="monthly-7-10"></td><td class="amount yearly" id="yearly-7-10"><input type="text" class="amount" id="input-yearly-7-10" data-value=""></td></tr>

                <tr><th colspan="2">年金</th><td class="amount monthly"></td><td class="amount yearly bold" id="yearly-8-0"></td></tr>
                <tr><th rowspan="2"></th><td>国民年金<span class="inline-right">加入人数<input type="text" class="right number ml-5" id="nenkin-count" data-value="1"></span></td><td class="amount monthly" id="monthly-8-1"></td><td class="amount yearly" id="yearly-8-1"></td></tr>
                <tr><td>年金（補正用）</td><td class="amount monthly" id="monthly-8-2"></td><td class="amount yearly" id="yearly-8-2"><input type="text" class="amount" id="input-yearly-8-2" data-value=""></td></tr>
                <tr><th colspan="2">保険</th><td class="amount monthly" id="monthly-9-0"></td><td class="amount yearly bold" id="yearly-9-0"></td></tr>

                <tr><th rowspan="4"></th><th rowspan="4">加入者年齢</th><td class="right"><input type="text" class="right age" id="age-1" data-value=""></td><td class="right"><input type="text" class="right age" id="age-2" data-value=""></td></tr>
                <tr><td class="right"><input type="text" class="right age" id="age-3" data-value=""></td><td class="right"><input type="text" class="right age" id="age-4" data-value=""></td></tr>
                <tr><td class="right"><input type="text" class="right age" id="age-5" data-value=""></td><td class="right"><input type="text" class="right age" id="age-6" data-value=""></td></tr>
                <tr><td class="right"><input type="text" class="right age" id="age-7" data-value=""></td><td class="right"><input type="text" class="right age" id="age-8" data-value=""></td></tr>

                <tr><th rowspan="6"></th><td>国民健康保険・平等割</td><td class="amount monthly" id="monthly-9-1"></td><td class="amount yearly" id="yearly-9-1"></td></tr>
                <tr><td>国民健康保険・均等割</td><td class="amount monthly" id="monthly-9-2"></td><td class="amount yearly" id="yearly-9-2"></td></tr>
                <tr><td>国民健康保険・所得割</td><td class="amount monthly" id="monthly-9-3"></td><td class="amount yearly" id="yearly-9-3"></td></tr>
                <tr><td>国民健康保険・後期高齢者(支援)</td><td class="amount monthly" id="monthly-9-4"></td><td class="amount yearly" id="yearly-9-4"></td></tr>
                <tr><td>国民健康保険・後期高齢者(介護)</td><td class="amount monthly" id="monthly-9-5"></td><td class="amount yearly" id="yearly-9-5"></td></tr>
                <tr><td>保険（補正用）</td><td class="amount monthly" id="monthly-9-6"></td><td class="amount yearly" id="yearly-9-6"><input type="text" class="amount" id="input-yearly-9-6" data-value=""></td></tr>
                <tr><th colspan="2">概要</th><td></td><td></td></tr>
                <tr><th rowspan="2"></th><td>合計支払額（年金・保険・税金）</td><td class="amount monthly" id="monthly-10-1"></td><td class="amount yearly bold" id="yearly-10-1"></td></tr>
                <tr><td>手取り額（経費含む）</td><td class="amount monthly" id="monthly-10-2"></td><td class="amount yearly bold" id="yearly-10-2"></td></tr>
            </tbody>
        </table>
    </div>
</div>
    `,
};


var tax = tax || {
    eval:(v)=>{ return Number((myjs.type(v)=="String" && v.match(/^=/)) ? eval(v.slice(1)) : v); },

    refresh:()=>{
        const total = {
            /*収入*/income:0,
            /*支出*/cost:0,
            /*控除*/deduction:0,
            /*課税所得*/taxable:0,
            /*税金*/tax:0,
            /*年金*/pension:0,
            /*保険*/insurance:0,
            /*支払総額*/payment:0,
            /*手取総額*/after_tax:0,
        };

        document.querySelectorAll(`input[type="text"]`).forEach((input)=>{
            input.value = input.value=="" ? input.dataset.value : input.value;
        });

        document.querySelectorAll(`input[type="text"].amount`).forEach((input)=>{
            const css = {id:"", id_common:"",};
            css.id = input.getAttribute("id");
            css.id_common = css.id.replace(/input-yearly-/, "");

            let amount = tax.eval(input.value);
            let amount_monthly = (amount/12).toFixed(1);
            document.getElementById(`monthly-${css.id_common}`).textContent = amount ? amount_monthly : "";

            // 課税対象か、非課税対象か
            let plus_minuse = input.classList.contains("cost")? -1 : 1;

            // 合計収入
            total.income += input.classList.contains("income") ? plus_minuse*amount : 0;
            // 課税所得額
            total.taxable += plus_minuse*amount;
            // 合計経費
            total.cost += css.id.match(/^input-yearly-2/) ? amount : 0;
            // 合計控除
            total.deduction += css.id.match(/^input-yearly-3/) ? amount : 0;
        });


        // 合計売上
        document.getElementById(`yearly-1-0`).textContent = total.income;
        // 合計経費
        document.getElementById(`yearly-2-0`).textContent = total.cost;
        // 合計控除
        document.getElementById(`yearly-3-0`).textContent = total.deduction;

        // 課税所得額
        document.getElementById(`yearly-4-0`).textContent = total.taxable;
        // 国民健康保険年間所得額
        let insurance = total.taxable-43;
        document.getElementById(`yearly-4-1`).textContent = insurance;
        // 課税所得額による所得税率
        let income_tax_rate = total.taxable<=195 ? 5 : (total.taxable <= 330 ? 10 : (total.taxable <= 695 ? 20 : 24));
        document.getElementById(`yearly-4-2`).textContent = `${income_tax_rate}%`;

        let tax_amount = 0;
        // 住民税・所得割
        tax_amount = total.taxable/10;
        total.tax += tax.eval(tax_amount);
        document.getElementById(`yearly-7-2`).textContent = tax_amount;
        // 個人事業税
        let freelance_tax = (total.taxable>=290 ? (total.taxable-290)*0.05 : 0).toFixed(1);
        total.tax += tax.eval(freelance_tax);
        document.getElementById(`yearly-7-3`).textContent = freelance_tax;
        // 所得税
        tax_amount = (total.taxable*income_tax_rate/100);
        total.tax += tax.eval(tax_amount);
        document.getElementById(`yearly-7-4`).textContent = tax_amount;
        // 合計税金
        document.getElementById(`yearly-7-0`).textContent = total.tax;

        // 年金
        // 国民年金
        let tax_count = document.getElementById("nenkin-count").value;
        tax_amount = (1.654*12*tax_count).toFixed(1);
        total.pension += tax.eval(tax_amount);
        document.getElementById(`yearly-8-1`).textContent = tax_amount;
        // 合計年金
        document.getElementById(`yearly-8-0`).textContent = total.pension;

        // 保険
        // 加入者情報
        let number_of_persons = number_of_under_40 = number_of_40_65 = number_of_66_75 = number_of_after_75 = 0;
        document.querySelectorAll(`input[type=text].age`).forEach(function(input){
            let age = input.value;
            if (age==="") { return ; }

            age = Number(age);
            number_of_persons += 1;
            if (age<40) {
                number_of_under_40 += 1;
            } else if (age<65) {
                number_of_40_65 += 1;
            } else if (age<75) {
                number_of_66_75 += 1;
            } else {
                number_of_after_75 += 1;
            }
        });
        number_of_persons = number_of_persons==0 ? 1 : number_of_persons;

        // 国民健康保険・均等割
        tax_amount = 4.5*number_of_persons;
        total.insurance += Number(tax_amount);
        document.getElementById(`yearly-9-2`).textContent = tax_amount;
        // 国民健康保険・所得割
        tax_amount = (insurance*0.0717).toFixed(1);
        total.insurance += Number(tax_amount);
        document.getElementById(`yearly-9-3`).textContent = tax_amount;
        // 国民健康保険・後期高齢者(支援)
        tax_amount = (insurance*0.0242*number_of_40_65+1.5*number_of_persons).toFixed(1);
        total.insurance += Number(tax_amount);
        document.getElementById(`yearly-9-4`).textContent = tax_amount;
        // 国民健康保険・後期高齢者(介護)
        tax_amount = (insurance*0.0223+1.6*number_of_40_65).toFixed(1);
        total.insurance += Number(tax_amount);
        document.getElementById(`yearly-9-5`).textContent = tax_amount;
        // 合計保険
        document.getElementById(`yearly-9-0`).textContent = total.insurance.toFixed(1);

        // 概要
        // 合計
        total.payment = (total.tax + total.pension + total.insurance).toFixed(1);
        document.getElementById(`yearly-10-1`).textContent = total.payment;
        total.after_tax = (total.income-total.payment).toFixed(1);
        document.getElementById(`yearly-10-2`).textContent = total.after_tax;

        // 月額の計算
        document.querySelectorAll(`td.amount.yearly`).forEach((td)=>{
            let amount_yearly = td.textContent;
            let amount_monthly = amount_yearly ? Number(amount_yearly/12).toFixed(2) : "";
            td.closest("tr").querySelector("td.amount.monthly").textContent = amount_monthly;
        });
    },
};
