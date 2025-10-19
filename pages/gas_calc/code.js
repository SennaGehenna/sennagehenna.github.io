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
  gas_paid = document.getElementById("gas_paid")

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

  gas_paid.textContent = "€"+(km_one_way_value * 2 * 5 * gas_price_value * gas_used_value / 100).toFixed(2);
}