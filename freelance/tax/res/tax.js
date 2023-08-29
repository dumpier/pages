var $$ = $$ || {
    all(selector){ return document.querySelectorAll(selector); },
    get(selector){ return document.getElementById(selector); },
}

var tax = tax || {
    refresh(){
        // 合計額の初期化
        const total = Object.create(tax.total);

        // datasetに設定した初期値の反映（v-modelのを使うとvalueが無効化されるのでdatasetに初期値を設定する）
        $$.all(`input[type="text"]`).forEach((input)=>{
            input.value = input.value=="" ? input.dataset.value ?? "" : input.value;
        });

        // 入力金額の走査
        $$.all(`input[type="text"].amount`).forEach((input)=>{
            const css = {id:"", id_common:"",};
            css.id = input.getAttribute("id");
            css.id_common = css.id.replace(/input-yearly-/, "");

            let amount = this.eval(input.value);
            let amount_monthly = (amount/12).toFixed(1);
            $$.get(`monthly-${css.id_common}`).textContent = amount ? amount_monthly : "";

            // 消費税、年金補正、保険補正などは別で合計する
            // 合計税金
            total.tax += css.id.match(/^input-yearly-tax/) ? amount : 0;
            total.pension += css.id.match(/^input-yearly-pension/) ? amount : 0;
            total.insurance += css.id.match(/^input-yearly-insurance/) ? amount : 0;
            if (input.classList.contains("payment")) { return; }

            // 課税対象か、非課税対象か
            let plus_minuse = input.classList.contains("cost")? -1 : 1;

            // 合計収入
            total.income += input.classList.contains("income") ? plus_minuse*amount : 0;
            // 課税所得額
            total.taxable += plus_minuse*amount;
            // 合計経費
            total.cost += css.id.match(/^input-yearly-cost/) ? amount : 0;
            // 合計控除
            total.deduction += css.id.match(/^input-yearly-deduction/) ? amount : 0;
        });

        // 合計売上
        $$.get(`yearly-income-0`).textContent = total.income;
        // 合計経費
        $$.get(`yearly-cost-0`).textContent = total.cost;
        // 合計控除
        $$.get(`yearly-deduction-0`).textContent = total.deduction;
        // 課税所得額
        $$.get(`yearly-taxable-0`).textContent = total.taxable;
        // 国民健康保険年間所得額
        let insurance = total.taxable-43;
        $$.get(`yearly-taxable-1`).textContent = insurance;
        // 課税所得額による所得税率
        let income_tax_rate = tax.rate.income(total.taxable);
        $$.get(`yearly-taxable-2`).textContent = `${income_tax_rate}%`;
        $$.get(`income_tax_rate`).textContent = `(税率：${income_tax_rate}%)`;

        // 納税額
        let tax_amount = 0;
        // 住民税・所得割
        tax_amount = total.taxable/10;
        total.tax += this.eval(tax_amount);
        $$.get(`yearly-tax-2`).textContent = tax_amount;
        // 個人事業税
        let freelance_tax = this.freelance.tax(total.taxable);
        total.tax += this.eval(freelance_tax);
        $$.get(`yearly-tax-3`).textContent = freelance_tax;
        // 所得税
        tax_amount = (total.taxable*income_tax_rate/100);
        total.tax += this.eval(tax_amount);
        $$.get(`yearly-tax-4`).textContent = tax_amount;
        // 合計税金
        $$.get(`yearly-tax-0`).textContent = total.tax.toFixed(1);

        // 年金
        // 国民年金
        let pension_count = $$.get("nenkin-count").value;
        tax_amount = (1.654*12*pension_count).toFixed(1);
        total.pension += this.eval(tax_amount);
        $$.get(`yearly-pension-1`).textContent = tax_amount;
        // 合計年金
        $$.get(`yearly-pension-0`).textContent = total.pension;

        // 保険
        // 加入者情報の集計
        const persons = this.persons.totalling();
        // 国民健康保険・均等割
        tax_amount = 4.5*persons.total;
        total.insurance += Number(tax_amount);
        $$.get(`yearly-insurance-2`).textContent = tax_amount;
        // 国民健康保険・所得割
        tax_amount = (insurance*0.0717).toFixed(1);
        total.insurance += Number(tax_amount);
        $$.get(`yearly-insurance-3`).textContent = tax_amount;
        // 国民健康保険・後期高齢者(支援)
        tax_amount = (insurance*0.0242*persons.between_40_65+1.5*persons.total).toFixed(1);
        total.insurance += Number(tax_amount);
        $$.get(`yearly-insurance-4`).textContent = tax_amount;
        // 国民健康保険・後期高齢者(介護)
        tax_amount = (insurance*0.0223+1.6*persons.between_40_65).toFixed(1);
        total.insurance += Number(tax_amount);
        $$.get(`yearly-insurance-5`).textContent = tax_amount;
        // 合計保険
        $$.get(`yearly-insurance-0`).textContent = total.insurance.toFixed(1);

        // 概要
        // 合計
        total.payment = (total.tax + total.pension + total.insurance).toFixed(1);
        $$.get(`yearly-total-1`).textContent = total.payment;
        total.after_tax = (total.income-total.payment).toFixed(1);
        $$.get(`yearly-total-2`).textContent = total.after_tax;

        // 月額の計算
        $$.all(`td.amount.yearly`).forEach((td)=>{
            let amount_yearly = td.textContent;
            let amount_monthly = amount_yearly ? Number(amount_yearly/12).toFixed(2) : "";
            td.closest("tr").querySelector("td.amount.monthly").textContent = amount_monthly;
        });
    },

    eval:(v)=>{ return Number((myjs.type(v)=="String" && v.match(/^=/)) ? eval(v.slice(1)) : v); },
    rate:{
        income(taxable){
            // 所得税率定義（195万以上10％、330万以上20％、695万以上23％。。。）
            const rate = { 0:5, 195:10, 330:20, 695:23, 900:33, 1800:40, 4000:45,};
            let income_tax_rate = 0;
            Object.keys(rate).forEach((amount)=>{
                if (taxable >= amount) { income_tax_rate = rate[amount]; }
            });

            return income_tax_rate;
        },
    },
    persons:{
        // 保険加入人数の算出
        totalling(){
            const result = {total:0, under_40:0, between_40_65:0, between_66_74:0, after_75:0,};
            $$.all(`input[type=text].age`).forEach(function(input){
                let age = input.value;
                if (age==="") { return ; }

                age = Number(age);
                result.total += 1;
                if (age<40) { return result.under_40 += 1; }
                if (age<65) { return result.between_40_65 += 1; }
                if (age<75) { return result.between_66_74 += 1; }
                if (age>=75) { return result.after_75 += 1; }
            });
            result.total = result.total==0 ? 1 : result.total;
            return result;
        },
    },
    freelance:{
        // 個人事業税
        tax(taxable){ return (taxable>=290 ? (taxable-290)*0.05 : 0).toFixed(1); },
    },
    total:{
        /*収入*/income:0,
        /*支出*/cost:0,
        /*控除*/deduction:0,
        /*課税所得*/taxable:0,
        /*税金*/tax:0,
        /*年金*/pension:0,
        /*保険*/insurance:0,
        /*支払総額*/payment:0,
        /*手取総額*/after_tax:0,
    }
};
