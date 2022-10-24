const dropList = document.querySelectorAll(".drop-list select"),
fromCurrency = document.querySelector(".from select"),
toCurrency = document.querySelector(".to select"),
getButton = document.querySelector("form button");

for (let i = 0; i < dropList.length; i++) {
    for(currency_code in country_list){
        let selected;
        if(i == 0){
            selected = currency_code == "EGP" ? "selected" : "";
        }else if(i == 1){
            selected = currency_code == "KES" ? "selected" : "";
        }

        let optionTag = 
        `<option value = "${currency_code}" ${selected}>${currency_code}</option>`;
        dropList[i].insertAdjacentHTML("beforeend", optionTag);
    }

    dropList[i].addEventListener('change', e => {
        loadFlag(e.target)
    });
}

function loadFlag(element){
    for(code in country_list){
        if(code == element.value){ //if currency code of country list is equal to option value
            let ImgTag = element.parentElement.querySelector("img"); //selecting img tag of particular drop list
            //passing country code of a selected currency code in a img url
            ImgTag.src = `https://countryflagsapi.com/png/${country_list[code]}`
        }
    }
}

window.addEventListener("load", () => {
    getExchangeRate();
});

getButton.addEventListener("click", e => {
    e.preventDefault()//prevent form from submitting
    getExchangeRate();
});

const exchangeIcon = document.querySelector(".drop-list .icon")
exchangeIcon.addEventListener("click", ()=>{
    let tempCode = fromCurrency.value; //temporary currency code of FROM drop list
    fromCurrency.value = toCurrency.value; //pass To currency code to From currency code
    toCurrency.value = tempCode; //passing temporary currency code to To currency code
    loadFlag(fromCurrency);
    loadFlag(toCurrency);
    getExchangeRate();
});


function getExchangeRate(){
    const exchangeRateTxt = document.querySelector(".exchange-rate")
    const amount = document.querySelector('.amount input');
    let amountVal = amount.value;
    if(amountVal == "" || amountVal == "0"){
        amount.value = "1";
        amountVal = 1;
    }
    exchangeRateTxt.innerText = "Getting exchange rate...";
    let url = `https://v6.exchangerate-api.com/v6/f3318d679f7080a6dacd6b9d/latest/${fromCurrency.value}`;
    fetch(url).then(response => response.json()).then(result => {
        let exchangeRate = result.conversion_rates[toCurrency.value];
        // console.log(exchangeRate);
        let totalexchangeRate = (amountVal * exchangeRate)
        console.log(totalexchangeRate)
        exchangeRateTxt.innerText = `${amountVal} ${fromCurrency.value} = ${totalexchangeRate} ${toCurrency.value}`
    }).catch(() => {
        exchangeRateTxt.innerText = "Something went wrong";
    })
}



