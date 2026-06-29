document.onload = function(){
  km_one_way = document.getElementById("km_one_way")
  gas_price = document.getElementById("gas_price")
  gas_used = document.getElementById("gas_used")
  km_one_way.addEventListener('input', function() {
    this.value = this.value.replace(/[^0-9 \,]/, '');
  });
  gas_price.addEventListener('input', function() {
    this.value = this.value.replace(/[^0-9 \,]/, '');
  });
  gas_used.addEventListener('input', function() {
    this.value = this.value.replace(/[^0-9 \,]/, '');
  });
}




function calculate(){
  km_one_way = document.getElementById("km_one_way")
  gas_price = document.getElementById("gas_price")
  gas_used = document.getElementById("gas_used")
  gas_paid_day = document.getElementById("gas_paid_day")
  gas_paid_week = document.getElementById("gas_paid_week")
  gas_paid_month = document.getElementById("gas_paid_month")

  if(km_one_way.value == undefined || gas_price.value == undefined || gas_used.value == undefined)
    return;

  km_one_way_value = km_one_way.value.replace(",",".")
  gas_price_value = gas_price.value.replace(",",".")
  gas_used_value = gas_used.value.replace(",",".")

  console.log("km_one_way_value => " + km_one_way_value);
  console.log("gas_price_value => " + gas_price_value);
  console.log("gas_used_value => " + gas_used_value);

  if(isNaN(km_one_way_value) || isNaN(gas_price_value) || isNaN(gas_used_value))
    return;
  per_day = (km_one_way_value * 2 * gas_price_value * gas_used_value / 100).toFixed(2);
  per_week = (per_day * 5).toFixed(2);
  per_month = (per_week * 4).toFixed(2);
  
  gas_paid_day.textContent = "€"+per_day;
  gas_paid_week.textContent = "€"+per_week;
  gas_paid_month.textContent = "€" + per_month;

}
