const currency_one = document.getElementById("currency-one"); //สกุลเงิน
const currency_two = document.getElementById("currency-two"); //สกุลเงิน

const amount_one = document.getElementById("amount-one"); //ตัวเลขสกุลเงิน
const amount_two = document.getElementById("amount-two"); //ตัวเลขสกุลเงิน

const rateText = document.getElementById("rate");
const swap = document.getElementById("btn"); //ปุ่ม swap

currency_one.addEventListener("change", calculateMoney);
currency_two.addEventListener("change", calculateMoney);

amount_one.addEventListener("input", calculateMoney);
amount_two.addEventListener("input", calculateMoney);

function calculateMoney() {
  const one = currency_one.value;
  const two = currency_two.value;

  // console.log("สกุลเงินต้นทางมีค่า = ", one);
  // console.log("สกุลเงินปลายทางมีค่า = ", two);

  // let url = `https://api.exchangerate-api.com/v4/latest/${one}`;

  // ดึงข้อมูลจาก Api มาใช้
  fetch(`https://api.exchangerate-api.com/v4/latest/${one}`)
    .then((res) => res.json())
    .then((data) => {
      // console.log(data.rates[two]);

      const rate = data.rates[two];
      rateText.innerText = `1 ${one} = ${rate} ${two}`;

      // คำนวณผลลัพธ์
      amount_two.value = (amount_one.value * rate).toFixed(2);
    });
}

//สลับค่า value
swap.addEventListener("click", () => {
  // USD => THB || THB => USD
  // TEMP => USD || THB => TEMP (USD)

  const temp = currency_one.value; //ต้นทาง
  currency_one.value = currency_two.value;
  currency_two.value = temp;

  calculateMoney();
});

calculateMoney();
