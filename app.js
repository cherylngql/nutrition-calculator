let totalFat = 0;
let totalProtein = 0;
let totalFiber = 0;

function displayIndividual(input) {
  let food = input.find('input').val().replace(' ', '+');
  fetch(`https://api.nutritionix.com/v1_1/search/${food}?results=0%3A20&cal_min=0&cal_max=50000&fields=*&appId=b96c9d7e&appKey=8e96a54eb0b1b268f7d36a6c25caef9e`)
  .then(response => response.json())
  .then(function(data) {
    let fat = parseFloat(data.hits[0].fields.nf_total_fat);
    let protein = parseFloat(data.hits[0].fields.nf_protein);
    let fiber = parseFloat(data.hits[0].fields.nf_dietary_fiber);
    input.find('#fat').text(fat + 'g');
    input.find('#protein').text(protein + 'g');
    input.find('#fiber').text(fiber + 'g');
    input.find('.food').text(input.find('input').val());
    totalFat += fat;
    totalProtein += protein;
    totalFiber += fiber;
  });
  input.find('.individual-value').show();
}

$(document).ready(function() {
  $('#calculate').on('click', function() {
    totalFat = 0;
    totalProtein = 0;
    totalFiber = 0;
    $('li').each(function() {
      if ($(this).find('input').val()) {
        displayIndividual($(this));
      }
    });
    $('#calculate').attr("disabled", "disabled");
    $('li input:empty').attr("disabled", "disabled");
  });
  $('#sum').on('click', function() {
    $('#total_fat').text(totalFat.toFixed(2));
    $('#total_protein').text(totalProtein.toFixed(2));
    $('#total_fiber').text(totalFiber.toFixed(2));
    $('h3').show();
    $('#sum').attr("disabled", "disabled");
  });
});
