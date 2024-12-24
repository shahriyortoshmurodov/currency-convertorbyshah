let select_from = document.querySelector('.select_from');
let select_to = document.querySelector('.select_to');
let amountInput = document.querySelector('.input-search');
let converterBtn = document.querySelector('.select_btn');
let money = document.querySelector('.money');
let fromFlagImg = document.querySelector('#from-flag'); 
let toFlagImg = document.querySelector('#to-flag');

const url = "https://currency-converter-pro1.p.rapidapi.com/latest-rates?base=USD";

const options = {
  method: "GET",
  headers: {
    "x-rapidapi-key": "7be9cd65cfmsh452c84c8a554106p15f81fjsn8e8b1a65a80a",
    "x-rapidapi-host": "currency-converter-pro1.p.rapidapi.com",
  },
};


const SelectData = async () => {
  try {
    const res = await fetch(url, options);
    const { result } = await res.json();

    
    for (const key in result) {
      const optionFrom = document.createElement('option');
      optionFrom.value = key;
      optionFrom.textContent = key;

      
      select_from.appendChild(optionFrom);
    }

    
    for (const key in result) {
      const optionTo = document.createElement('option');
      optionTo.value = key;
      optionTo.textContent = key;

      
      select_to.appendChild(optionTo);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};


SelectData();


select_from.addEventListener('change', (e) => {
  let flagCode = e.target.value.toLowerCase().slice(0, 2); 
  fromFlagImg.src = `https://flagcdn.com/24x18/${flagCode}.png`;
});

select_to.addEventListener('change', (e) => {
  let flagCode = e.target.value.toLowerCase().slice(0, 2);
  toFlagImg.src = `https://flagcdn.com/24x18/${flagCode}.png`; 
});

converterBtn.addEventListener('click', () => {
  if (!amountInput.value) {
    alert('Please enter an amount!');
  } else {
    pull();
  }
});

const pull = async () => {
  const fromCurrency = select_from.value;
  const toCurrency = select_to.value;
  const amount = amountInput.value;

  const response = await fetch(`https://currency-converter-pro1.p.rapidapi.com/convert?from=${fromCurrency}&to=${toCurrency}&amount=${amount}`, options);
  const data = await response.json();

  money.textContent = `Converted Amount: ${data.result} ${toCurrency}`;
};
