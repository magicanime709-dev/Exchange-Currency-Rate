const BASE_URL =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const date = document.querySelector(".date");
const msg = document.querySelector(".msg");

// Updating flag img (API)
const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

// Dropdowns and flag update
for (let select of dropdowns) {
  // Populate dropdowns
  for (currCode in countryList) {
    let newOptions = document.createElement("option");
    newOptions.innerText = currCode;
    newOptions.value = currCode;
    // Initial country and currency
    if (select.name === "from" && currCode === "USD") {
      newOptions.selected = "selected";
    } else if (select.name === "to" && currCode === "BDT") {
      newOptions.selected = "selected";
    }
    select.append(newOptions);
  }
  //   First run update for selected currency
  updateFlag(select);

  //   Second run when I choose to update
  select.addEventListener("change", () => {
    updateFlag(select);
  });
}

// Updating Exchange Rate (API) [async, await]
const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  if (amtVal === "" || amtVal < 0) {
    amtVal = 1;
    amount.value = "1";
  }

  // New URL from the BASE_URL
  let URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
  let response = await fetch(URL);
  let data = await response.json();

  // Update Date from data {object}
  date.innerText = `Date: ${data["date"]}`;

  // Update Currency from data {object}
  let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
  let finalAmount = amtVal * rate;

  //1 usd = 100 bdt
  msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
};

btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});

window.addEventListener("load", () => {
  updateExchangeRate();
});


//Theme switching
const switcher = document.getElementById("themeSwitcher");

switcher.addEventListener("change", (e) => {
  document.body.className = ""; // reset

  if (e.target.value === "cyber") {
    document.body.classList.add("theme-cyber");
  } 
  else if (e.target.value === "olive") {
    document.body.classList.add("theme-olive");
  }
});