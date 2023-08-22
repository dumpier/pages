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
                <tr><th rowspan="2"></th><td>売上</td><td class="amount income" id="monthly-1-1"></td><td class="right" id="yearly-1-1"><input type="text" @change="refresh" class="amount income" id="input-yearly-1-1" data-value="600"></td></tr>
                <tr><td>売上（補正用）</td><td class="amount income" id="monthly-1-2"></td><td class="amount" id="yearly-1-2"><input type="text" @change="refresh" class="amount income" id="input-yearly-1-2" data-value=""></td></tr>

                <tr><th colspan="2">経費</th><td class="amount monthly cost" id="monthly-2-0"></td><td class="amount yearly cost bold" id="yearly-2-0"></td></tr>
                <tr><th rowspan="2"></th><td>経費</td><td class="amount cost" id="monthly-2-1"></td><td class="right" id="yearly-2-1"><input type="text" @change="refresh" class="amount cost" id="input-yearly-2-1" data-value="200"></td></tr>
                <tr><td>経費（補正用）</td><td class="amount cost" id="monthly-2-2"></td><td class="right" id="yearly-2-2"><input type="text" @change="refresh" class="amount cost" id="input-yearly-2-2" data-value=""></td></tr>

                <tr><th colspan="2">控除</th><td class="amount monthly cost" id="monthly-3-0"></td><td class="amount yearly cost bold" id="yearly-3-0"></td></tr>
                <tr><th rowspan="11"></th><td>基礎控除</td><td class="amount cost" id="monthly-3-1"></td><td class="right" id="yearly-3-1"><input type="text" @change="refresh" class="amount cost" id="input-yearly-3-1" data-value="48"></td></tr>
                <tr><td>青色申告控除</td><td class="amount cost" id="monthly-3-2"></td><td class="right" id="yearly-3-2"><input type="text" @change="refresh" class="amount cost" id="input-yearly-3-2" data-value="65"></td></tr>
                <tr><td>社会保険料控除</td><td class="amount cost" id="monthly-3-3"></td><td class="right" id="yearly-3-3"><input type="text" @change="refresh" class="amount cost" id="input-yearly-3-3" data-value=""></td></tr>
                <tr><td>小規模企業共済等掛金控除</td><td class="amount cost" id="monthly-3-4"></td><td class="right" id="yearly-3-4"><input type="text" @change="refresh" class="amount cost" id="input-yearly-3-4" data-value=""></td></tr>
                <tr><td>生命保険料控除</td><td class="amount cost" id="monthly-3-5"></td><td class="right" id="yearly-3-5"><input type="text" @change="refresh" class="amount cost" id="input-yearly-3-5" data-value=""></td></tr>
                <tr><td>地震保険料控除</td><td class="amount cost" id="monthly-3-6"></td><td class="right" id="yearly-3-6"><input type="text" @change="refresh" class="amount cost" id="input-yearly-3-6" data-value=""></td></tr>
                <tr><td>配偶者控除・配偶者特別控除</td><td class="amount cost" id="monthly-3-7"></td><td class="right" id="yearly-3-7"><input type="text" @change="refresh" class="amount cost" id="input-yearly-3-7" data-value=""></td></tr>
                <tr>
                    <td><span>扶養控除<span class="balloon">具体的には、扶養される親族が16歳以上18歳以下、23歳以上69歳以下の場合は38万円、特定扶養親族である19歳以上23歳未満の場合は63万円です。 70歳以上の親族は同居か別居（※）かで控除額が変わり、納税者または配偶者の直系尊属（父母・祖父母など）で同居していれば控除額は58万円、同居以外は48万円となります。</span></span></td>
                    <td class="amount cost" id="monthly-3-8"></td><td class="amount" id="yearly-3-8"><input type="text" @change="refresh" class="amount cost" id="input-yearly-3-8" data-value=""></td></tr>
                <tr><td>医療費控除</td><td class="amount cost" id="monthly-3-9"></td><td class="amount" id="yearly-3-9"><input type="text" @change="refresh" class="amount cost" id="input-yearly-3-9" data-value=""></td></tr>
                <tr><td>住宅ローン控除</td><td class="amount cost" id="monthly-3-10"></td><td class="amount" id="yearly-3-10"><input type="text" @change="refresh" class="amount cost" id="input-yearly-3-10" data-value=""></td></tr>
                <tr><td>控除（補正用）</td><td class="amount cost" id="monthly-3-11"></td><td class="amount" id="yearly-3-11"><input type="text" @change="refresh" class="amount cost" id="input-yearly-3-11" data-value=""></td></tr>

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
                <tr><td><span>個人事業税<span class="balloon">※（課税所得額-290万円）x 5%</span></span></td><td class="amount monthly" id="monthly-7-3"></td><td class="amount yearly" id="yearly-7-3"></td></tr>
                <tr><td><span>所得税<span id="income_tax_rate" class="ml-10"></span><span class="balloon">課税所得額x所得税率</span></span></td><td class="amount monthly" id="monthly-7-4"></td><td class="amount yearly" id="yearly-7-4"></td></tr>
                <tr><td>消費税</td><td class="amount monthly" id="monthly-7-5"></td><td class="amount yearly" id="yearly-7-5"></td></tr>
                <tr><td>固定資産税</td><td class="amount monthly" id="monthly-7-6"></td><td class="amount" id="yearly-7-6"><input type="text" @change="refresh" class="amount" id="input-yearly-7-6" data-value=""></td></tr>
                <tr><td>税金（補正用）</td><td class="amount monthly" id="monthly-7-10"></td><td class="amount yearly" id="yearly-7-10"><input type="text" @change="refresh" class="amount" id="input-yearly-7-10" data-value=""></td></tr>

                <tr><th colspan="2">年金</th><td class="amount monthly"></td><td class="amount yearly bold" id="yearly-8-0"></td></tr>
                <tr><th rowspan="2"></th><td>国民年金<span class="inline-right">加入人数<input type="text" @change="refresh" class="right number ml-5" id="nenkin-count" data-value="1"></span></td><td class="amount monthly" id="monthly-8-1"></td><td class="amount yearly" id="yearly-8-1"></td></tr>
                <tr><td>年金（補正用）</td><td class="amount monthly" id="monthly-8-2"></td><td class="amount yearly" id="yearly-8-2"><input type="text" @change="refresh" class="amount" id="input-yearly-8-2" data-value=""></td></tr>
                <tr><th colspan="2">保険</th><td class="amount monthly" id="monthly-9-0"></td><td class="amount yearly bold" id="yearly-9-0"></td></tr>

                <tr><th rowspan="4"></th><th rowspan="4">加入者年齢</th><td class="right"><input type="text" @change="refresh" class="right age" id="age-1" data-value=""></td><td class="right"><input type="text" @change="refresh" class="right age" id="age-2" data-value=""></td></tr>
                <tr><td class="right"><input type="text" @change="refresh" class="right age" id="age-3" data-value=""></td><td class="right"><input type="text" @change="refresh" class="right age" id="age-4" data-value=""></td></tr>
                <tr><td class="right"><input type="text" @change="refresh" class="right age" id="age-5" data-value=""></td><td class="right"><input type="text" @change="refresh" class="right age" id="age-6" data-value=""></td></tr>
                <tr><td class="right"><input type="text" @change="refresh" class="right age" id="age-7" data-value=""></td><td class="right"><input type="text" @change="refresh" class="right age" id="age-8" data-value=""></td></tr>

                <tr><th rowspan="6"></th><td>国民健康保険・平等割</td><td class="amount monthly" id="monthly-9-1"></td><td class="amount yearly" id="yearly-9-1"></td></tr>
                <tr><td><span>国民健康保険・均等割<span class="balloon">※4.5万円x加入人数</span></span></td><td class="amount monthly" id="monthly-9-2"></td><td class="amount yearly" id="yearly-9-2"></td></tr>
                <tr><td><span>国民健康保険・所得割<span class="balloon">※(課税所得額-43万円)x7.17%</span></span></td><td class="amount monthly" id="monthly-9-3"></td><td class="amount yearly" id="yearly-9-3"></td></tr>
                <tr><td><span>国民健康保険・後期高齢者(支援)<span class="balloon">※(課税所得額-43万円)x2.42%x後期高齢者人数(40歳以上65歳未満の人数)＋1.5万円x加入人数</span></span></td><td class="amount monthly" id="monthly-9-4"></td><td class="amount yearly" id="yearly-9-4"></td></tr>
                <tr><td><span>国民健康保険・後期高齢者(介護)<span class="balloon">※(課税所得額-43万円)x2.23%＋1.2万円x後期高齢者人数(40歳以上65歳未満の人数)</span></span></td><td class="amount monthly" id="monthly-9-5"></td><td class="amount yearly" id="yearly-9-5"></td></tr>
                <tr><td>保険（補正用）</td><td class="amount monthly" id="monthly-9-6"></td><td class="amount yearly" id="yearly-9-6"><input type="text" @change="refresh" class="amount" id="input-yearly-9-6" data-value=""></td></tr>
                <tr><th colspan="2">概要</th><td></td><td></td></tr>
                <tr><th rowspan="2"></th><td>合計支払額（年金・保険・税金）</td><td class="amount monthly" id="monthly-10-1"></td><td class="amount yearly bold" id="yearly-10-1"></td></tr>
                <tr><td>手取り額（経費含む）</td><td class="amount monthly" id="monthly-10-2"></td><td class="amount yearly bold" id="yearly-10-2"></td></tr>
            </tbody>
        </table>
    </div>
</div>
    `,
};
