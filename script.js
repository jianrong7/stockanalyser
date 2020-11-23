let ticker = ''
let price = ''
let dcf = ''

function displayData() {
    ticker = document.getElementById("stockName").value.toUpperCase();

    // get currentPrice data
    getRequest(
        'https://financialmodelingprep.com/api/v3/company/profile/' + ticker + "?apikey=c666ff95d41eef82744356cb28a0c041",
        drawPriceOutput
    );

    // get DCF data
    getRequest(
        'https://financialmodelingprep.com/api/v3/discounted-cash-flow/' + ticker + "?apikey=c666ff95d41eef82744356cb28a0c041",
        drawDCFOutput
    );
    setTimeout(getRequest, 0)
    document.getElementById("marginOfSafety").innerHTML = price - dcf
}

function drawPriceOutput(responseText) {
    let companyProfile = [JSON.parse(responseText).profile];
    price = companyProfile[0].price
    document.getElementById("currentPrice").innerHTML = price
}
function drawDCFOutput(responseText) {
    let companyProfile = JSON.parse(responseText);
    dcf = companyProfile[0].dcf
    document.getElementById("DCF").innerHTML = dcf
}

// Get URL Request from Financial Modelling Prep
function getRequest(url, success) {
    var req = false;
    try {
    req = new XMLHttpRequest();
    } catch (e) {
    try {
        req = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {
        try {
        req = new ActiveXObject("Microsoft.XMLHTTP");
        } catch (e) {
        return false;
        }
    }
    }
    if (!req) return false;
    if (typeof success != 'function') success = function() {};
    req.onreadystatechange = function() {
    if (req.readyState == 4) {
        if (req.status === 200) {
        success(req.responseText)
        }
    }
    }
    req.open("GET", url, true);
    req.send(null);
    return req;
}