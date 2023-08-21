
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
