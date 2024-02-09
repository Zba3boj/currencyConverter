const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdown = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");


//adding more elements in dropdown 
for(let select of dropdown)
{
    for(currCode in countryList) 
    {
        let option = document.createElement("option");
        option.innerText = currCode;
        option.value = currCode;
        select.append(option); 
        if(select.name === "from" && currCode === "USD")
        {
            option.selected = "selected";

        }
        else if(select.name === "to" && currCode === "INR")
        {
            option.selected = "selected";
        }
    }
    select.addEventListener("change" , (evt) => {
        updateFlag(evt.target);
    })
}
const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}
btn.addEventListener("click" , async (evt) => {
    //remove the form submission automatically in button property 
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    console.log(amtVal);
    if(amtVal === "" || amtVal < 1)
    {
        amtVal = 1;
        amount.value = "1";
    }
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[toCurr.value.toLowerCase()];
    let finalAmount = amtVal * rate;
    msg.innerText  = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
    
})