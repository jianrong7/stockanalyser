let ticker = ''
let price = 0
let dcf = 0

async function displayData() {
    ticker = document.getElementById("stockName").value.toUpperCase();

    // display current price
    let profileUrl = 'https://financialmodelingprep.com/api/v3/company/profile/' + ticker + "?apikey=c666ff95d41eef82744356cb28a0c041"
    const prof = (async () => {
        const response = await fetch(profileUrl);
        const json = await response.json();

        price = json['profile']['price']
        document.getElementById("currentPrice").innerHTML = price
    })()

    // display dcf
    let dcfUrl = 'https://financialmodelingprep.com/api/v3/discounted-cash-flow/' + ticker + "?apikey=c666ff95d41eef82744356cb28a0c041"
    const dcprof = (async () => {
        const response = await fetch(dcfUrl);
        const json = await response.json();

        dcf = json[0]['dcf']
        document.getElementById("DCF").innerHTML = Math.round(dcf * 100) / 100
    })()

    await new Promise(r => setTimeout(r, 1000));
    let marginOfSafety = ((price - dcf) / price) * 100
    document.getElementById("marginOfSafety").innerHTML = Math.round(marginOfSafety * 100) / 100 + "%"
}
