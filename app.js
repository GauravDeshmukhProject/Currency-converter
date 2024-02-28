const BaseURL= "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropDown=document.querySelectorAll(".dropdown select");
const btn = document.querySelector("body > div > form > button");
const fromcurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const msg = document.querySelector(".msg");

for(let select of dropDown){
  for(currCode in countryList){
    let newOptions = document.createElement("option");
    newOptions.innerText=currCode ;
    newOptions.value=currCode ;
    if(select.name==="from" && currCode==="USD"){
      newOptions.selected="selected";
    }
    if(select.name==="to" && currCode==="INR"){
      newOptions.selected="selected";
    }
    select.append(newOptions);
  }
  select.addEventListener("change",(event)=>{
    console.log(event.target);
    updateFlag(event.target);
  })
}

const updateFlag=(element)=>{
let curCode = element.value;
console.log(curCode);
let countryCode=countryList[curCode];
let newSrc =`https://flagsapi.com/${countryCode}/flat/64.png`;
console.log(element.parentElement);
let img=element.parentElement.querySelector("img");
img.src=newSrc;
}

btn.addEventListener("click",async (event)=>{
  event.preventDefault();
  let amount= document.querySelector(".amount input");
  let amountValue=  amount.value;
  console.log(amountValue);
  if(amountValue==="" || amountValue<1){
    amountValue=1;
    amount.value=1;
  }
  console.log(fromcurr.value +" "+ toCurr.value);
  let url =`${BaseURL}/${fromcurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`
  console.log(url);
  let resposne= await fetch(url);
  let json=await Response.json();
  let rate = data[toCurr.value.toLowerCase()];
  let finalAmount=rate*amountValue
  msg.innerText=`${amountValue} ${fromcurr} = ${finalAmount} ${toCurr}`;
  console.log(json);
});



