var config = config || {
    links:/*html*/`
    <ul class="inline">
        <li><a href="./index.html">jquery版</a></li>
        <li><a href="./js.html">自前js版</a></li>
        <li><a href="./vuejs.html">vue.js版</a></li>
    </ul>
    `,
    items:[
        {editable:true, title:"入力用"},
        ["収入", "売上", "売上（補正用）"],
        ["経費", "経費", "経費（補正用）"],
        ["控除", "基礎控除", "青色申告控除", "社会保険料控除", "小規模企業共済等掛金控除", "生命保険料控除", "地震保険料控除", "配偶者控除・配偶者特別控除", "扶養控除", "医療費控除", "住宅ローン控除", "控除（補正用）"],
        ["課税所得額", "(v)国民健康保険年間所得額", "(v)課税所得額による所得税率"],
        [],
        {editable:false, title:"結果表示用"},
        ["税金", "住民税・均等割", "住民税・所得割", "個人事業税", "所得税", "消費税", "(e)固定資産税", "(e)税金（補正用）"],
        ["年金", "国民年金", "(e)年金（補正用）"],
        ["保険", "国民健康保険・平等割", "国民健康保険・均等割", "国民健康保険・所得割", "国民健康保険・後期高齢者(支援)", "国民健康保険・後期高齢者(介護)", "(e)保険（補正用）"],
        ["概要", "合計支払額（年金・保険・税金）", "手取り額（経費含む）"],
        [],
    ],

    template:/*html*/`
<div class="flex">
    <div class="column">
        <table class="table border">
            <thead>
                <tr><th colspan="2" class="diagonal">入力用(数式が使用可能。例、=5*2)</th><th>月間(万円)</th><th>年間(万円)</th></tr>
            </thead>
            <tbody>
                <tr><th colspan="2">収入</th><td class="amount monthly" id="monthly-income-0"></td><td class="amount yearly bold" id="yearly-income-0"></td></tr>
                <tr><th rowspan="2"></th><td>売上</td><td class="amount income" id="monthly-income-1"></td><td class="right" id="yearly-income-1"><input type="text" @change="refresh" class="amount income" id="input-yearly-income-1" data-value="600"></td></tr>
                <tr><td>売上（補正用）</td><td class="amount income" id="monthly-income-2"></td><td class="amount" id="yearly-income-2"><input type="text" @change="refresh" class="amount income" id="input-yearly-income-2"></td></tr>

                <tr><th colspan="2">経費</th><td class="amount monthly cost" id="monthly-cost-0"></td><td class="amount yearly cost bold" id="yearly-cost-0"></td></tr>
                <tr><th rowspan="2"></th><td>経費</td><td class="amount cost" id="monthly-cost-1"></td><td class="right" id="yearly-cost-1"><input type="text" @change="refresh" class="amount cost" id="input-yearly-cost-1" data-value="200"></td></tr>
                <tr><td>経費（補正用）</td><td class="amount cost" id="monthly-cost-2"></td><td class="right" id="yearly-cost-2"><input type="text" @change="refresh" class="amount cost" id="input-yearly-cost-2"></td></tr>

                <tr><th colspan="2">控除</th><td class="amount monthly cost" id="monthly-deduction-0"></td><td class="amount yearly cost bold" id="yearly-deduction-0"></td></tr>
                <tr><th rowspan="11"></th><td><a href="https://www.nta.go.jp/taxes/shiraberu/taxanswer/shotoku/1199.htm" target=deduction_1>基礎控除<span class="balloon">※納税者本人の合計所得金額が<br>　・2,400万円以下、48万円<br>　・2,400万円超2,450万円以下、32万円<br>　・2,450万円超2,500万円以下、16万円<br>　・2,500万円超、０円</span></a></td>
                    <td class="amount cost" id="monthly-deduction-1"></td><td class="right" id="yearly-deduction-1"><input type="text" @change="refresh" class="amount cost" id="input-yearly-deduction-1" data-value="48"></td></tr>
                <tr><td><a href="https://www.nta.go.jp/taxes/shiraberu/taxanswer/shotoku/2072.htm" target= target=deduction_2>青色申告控除<span class="balloon">※申告方法により、控除金額が10万円、55万円、65万円に別れる</span></a></td><td class="amount cost" id="monthly-deduction-2"></td><td class="right" id="yearly-deduction-2"><input type="text" @change="refresh" class="amount cost" id="input-yearly-deduction-2" data-value="65"></td></tr>
                <tr><td>社会保険料控除</td><td class="amount cost" id="monthly-deduction-3"></td><td class="right" id="yearly-deduction-3"><input type="text" @change="refresh" class="amount cost" id="input-yearly-deduction-3"></td></tr>
                <tr><td>小規模企業共済等掛金控除</td><td class="amount cost" id="monthly-deduction-4"></td><td class="right" id="yearly-deduction-4"><input type="text" @change="refresh" class="amount cost" id="input-yearly-deduction-4"></td></tr>
                <tr><td>生命保険料控除</td><td class="amount cost" id="monthly-deduction-5"></td><td class="right" id="yearly-deduction-5"><input type="text" @change="refresh" class="amount cost" id="input-yearly-deduction-5"></td></tr>
                <tr><td>地震保険料控除</td><td class="amount cost" id="monthly-deduction-6"></td><td class="right" id="yearly-deduction-6"><input type="text" @change="refresh" class="amount cost" id="input-yearly-deduction-6"></td></tr>
                <tr>
                    <td><a href="https://www.nta.go.jp/taxes/shiraberu/taxanswer/shotoku/1195.htm" target=deduction_7>配偶者控除・配偶者特別控除<span class="balloon">※配偶者と納税者本人の収入により変動<br>最大38万円が控除（納税者収入が900万以下、配偶者収入が48-95万の場合）</span></a></td>
                    <td class="amount cost" id="monthly-deduction-7"></td><td class="right" id="yearly-deduction-7"><input type="text" @change="refresh" class="amount cost" id="input-yearly-deduction-7"></td></tr>
                <tr>
                    <td><a href="https://www.nta.go.jp/taxes/shiraberu/taxanswer/shotoku/1180.htm" target=deduction_8>扶養控除<span class="balloon">具体的には、扶養される親族が16歳以上18歳以下、23歳以上69歳以下の場合は38万円、特定扶養親族である19歳以上23歳未満の場合は63万円です。 70歳以上の親族は同居か別居（※）かで控除額が変わり、納税者または配偶者の直系尊属（父母・祖父母など）で同居していれば控除額は58万円、同居以外は48万円となります。</span></span></td>
                    <td class="amount cost" id="monthly-deduction-8"></td><td class="amount" id="yearly-deduction-8"><input type="text" @change="refresh" class="amount cost" id="input-yearly-deduction-8"></td></tr>
                <tr><td>医療費控除</td><td class="amount cost" id="monthly-deduction-9"></td><td class="amount" id="yearly-deduction-9"><input type="text" @change="refresh" class="amount cost" id="input-yearly-deduction-9"></td></tr>
                <tr><td>住宅ローン控除</td><td class="amount cost" id="monthly-deduction-10"></td><td class="amount" id="yearly-deduction-10"><input type="text" @change="refresh" class="amount cost" id="input-yearly-deduction-10"></td></tr>
                <tr><td>控除（補正用）</td><td class="amount cost" id="monthly-deduction-11"></td><td class="amount" id="yearly-deduction-11"><input type="text" @change="refresh" class="amount cost" id="input-yearly-deduction-11"></td></tr>

                <tr><th colspan="2"><span style="color:blue;">課税所得額</span></th><td class="amount monthly" id="monthly-taxable-0"></td><td class="amount yearly bold" id="yearly-taxable-0"></td></tr>
                <tr><th rowspan="2"></th>
                    <td><span>国民健康保険年間所得額<span class="balloon">※<span style="color:blue;">課税所得額</span>-43万円</span></span></td>
                    <td class="amount monthly" id="monthly-taxable-1"></td><td class="amount yearly bold" id="yearly-taxable-1"></td></tr>
                <tr>
                    <td><span>課税所得額による所得税率<span class="balloon"><span style="color:blue;">※課税所得額</span>より変動します。<br>　・195万以下、5%<br>　・330万以下、10%<br>　・695万以下、20%<br>　・900万以下、23%<br>　・1800万以下、33%<br>　・4000万以下、40%<br>　・4000万以上、45%</span></span></td>
                    <td class="right" id="monthly-taxable-2"></td><td class="right bold" id="yearly-taxable-2"></td>
                </tr>
            </tbody>
        </table>
    </div>

    <div class="column">
        <table class="table border">
            <thead>
                <tr><th colspan="4" class="diagonal">結果表示用</th><th>月間(万円)</th><th>年間(万円)</th></tr>
            </thead>
            <tbody>
                <tr><th colspan="4">税金</th><td class="amount monthly"></td><td class="amount yearly bold" id="yearly-tax-0"></td></tr>
                <tr><th rowspan="7"></th><td colspan="3">住民税・均等割</td><td class="amount monthly" id="monthly-tax-1"></td><td class="amount yearly" id="yearly-tax-1">0.5</td></tr>
                <tr><td colspan="3"><span>住民税・所得割<span class="balloon">課税所得額x一律10％<br>※道府県民税が一律4%、市町村民税が一律6%</span></span></td><td class="amount monthly" id="monthly-tax-2"></td><td class="amount yearly" id="yearly-tax-2"></td></tr>
                <tr><td colspan="3"><span>個人事業税<span class="balloon">※（課税所得額-290万円）x 5%</span></span></td><td class="amount monthly" id="monthly-tax-3"></td><td class="amount yearly" id="yearly-tax-3"></td></tr>
                <tr><td colspan="3"><span>所得税<span id="income_tax_rate" class="ml-10"></span><span class="balloon">課税所得額x所得税率</span></span></td><td class="amount monthly" id="monthly-tax-4"></td><td class="amount yearly" id="yearly-tax-4"></td></tr>
                <tr><td colspan="3">消費税</td><td class="amount monthly" id="monthly-tax-5"></td><td class="amount yearly" id="yearly-tax-5"></td></tr>
                <tr><td colspan="3">固定資産税</td><td class="amount monthly" id="monthly-tax-6"></td><td class="amount" id="yearly-tax-6"><input type="text" @change="refresh" class="amount" id="input-yearly-tax-6"></td></tr>
                <tr><td colspan="3">税金（補正用）</td><td class="amount monthly" id="monthly-tax-10"></td><td class="amount yearly" id="yearly-tax-10"><input type="text" @change="refresh" class="amount" id="input-yearly-tax-10"></td></tr>

                <tr><th colspan="4">年金</th><td class="amount monthly"></td><td class="amount yearly bold" id="yearly-pension-0"></td></tr>
                <tr><th rowspan="2"></th><td colspan="2">国民年金</td><td><span class="inline-right">加入人数<input type="text" @change="refresh" class="right number ml-5" id="nenkin-count" data-value="1"></span></td><td class="amount monthly" id="monthly-pension-1"></td><td class="amount yearly" id="yearly-pension-1"></td></tr>
                <tr><td colspan="3">年金（補正用）</td><td class="amount monthly" id="monthly-pension-2"></td><td class="amount yearly" id="yearly-pension-2"><input type="text" @change="refresh" class="amount" id="input-yearly-pension-2"></td></tr>

                <tr><th colspan="4">保険</th><td class="amount monthly" id="monthly-insurance-0"></td><td class="amount yearly bold" id="yearly-insurance-0"></td></tr>
                <tr><th rowspan="4"></th><th rowspan="4" colspan="2">加入者年齢</th>
                    <td class="right"><input type="text" @change="refresh" class="right age"></td><td class="right"><input type="text" @change="refresh" class="right age"></td><td class="right"><input type="text" @change="refresh" class="right age"></td></tr>
                <tr><td class="right"><input type="text" @change="refresh" class="right age"></td><td class="right"><input type="text" @change="refresh" class="right age"></td><td class="right"><input type="text" @change="refresh" class="right age"></td></tr>
                <tr><td class="right"><input type="text" @change="refresh" class="right age"></td><td class="right"><input type="text" @change="refresh" class="right age"></td><td class="right"><input type="text" @change="refresh" class="right age"></td></tr>
                <tr><td class="right"><input type="text" @change="refresh" class="right age"></td><td class="right"><input type="text" @change="refresh" class="right age"></td><td class="right"><input type="text" @change="refresh" class="right age"></td></tr>

                <tr><th rowspan="6"></th><td colspan="3">国民健康保険・平等割</td><td class="amount monthly" id="monthly-insurance-1"></td><td class="amount yearly" id="yearly-insurance-1"></td></tr>
                <tr><td colspan="3"><span>国民健康保険・均等割<span class="balloon">※4.5万円x加入人数</span></span></td><td class="amount monthly" id="monthly-insurance-2"></td><td class="amount yearly" id="yearly-insurance-2"></td></tr>
                <tr><td colspan="3"><span>国民健康保険・所得割<span class="balloon">※(課税所得額-43万円)x7.17%</span></span></td><td class="amount monthly" id="monthly-insurance-3"></td><td class="amount yearly" id="yearly-insurance-3"></td></tr>
                <tr><td colspan="3"><span>国民健康保険・後期高齢者(支援)<span class="balloon">※(課税所得額-43万円)x2.42%x後期高齢者人数(40歳以上65歳未満の人数)＋1.5万円x加入人数</span></span></td><td class="amount monthly" id="monthly-insurance-4"></td><td class="amount yearly" id="yearly-insurance-4"></td></tr>
                <tr><td colspan="3"><span>国民健康保険・後期高齢者(介護)<span class="balloon">※(課税所得額-43万円)x2.23%＋1.2万円x後期高齢者人数(40歳以上65歳未満の人数)</span></span></td><td class="amount monthly" id="monthly-insurance-5"></td><td class="amount yearly" id="yearly-insurance-5"></td></tr>
                <tr><td colspan="3">保険（補正用）</td><td class="amount monthly" id="monthly-insurance-6"></td><td class="amount yearly" id="yearly-insurance-6"><input type="text" @change="refresh" class="amount" id="input-yearly-insurance-6"></td></tr>
                <tr><th colspan="4">概要</th><td></td><td></td></tr>
                <tr><th rowspan="3"></th><td colspan="3">合計支払額（年金・保険・税金）</td><td class="amount monthly" id="monthly-total-1"></td><td class="amount yearly bold" id="yearly-total-1"></td></tr>
                <tr><td colspan="3">手取り額（経費含む）</td><td class="amount monthly" id="monthly-total-2"></td><td class="amount yearly bold" id="yearly-total-2"></td></tr>
            </tbody>
        </table>
    </div>
</div>
    `,
};
