let totalFat = 0;
let totalProtein = 0;
let totalFiber = 0;
let totalCalories = 0;
let totalCaloriesFromFat = 0;
let totalCarbohydrates = 0;
let totalSaturatedFat = 0;
function addRow() {
  var newRow = `<tr>
                  <td><input class='food' type='text' placeholder="food"></td>
                  <td><input class='quantity' type='text' placeholder='1'>
                    <select class='dropdown'>
                      <option>NLEA servings</option>
                      <option>grams</option>
                      <option>cups</option>
                      <option>lbs</option>
                      <option>ounces</option>
                      <option selected="selected"></option>
                    </select>
                    <input class='option' type='text'>
                  </td>
                  <td></td>
                  <td></td>
                  <td></td> 
                  <td></td>
                  <td></td>
                  <td></td> 
                  <td></td>
                  <td></td>
                </tr>`;
  $('tr:last-child').before(newRow);

}
function calculateIndividual(input) {
  let food = input.val() + input.closest('tr').find('select :selected').text() + input.closest('tr').find('.option').val();
  let query = food.replace(' ', '+');
  fetch(`https://api.nutritionix.com/v1_1/search/${query}?results=0%3A20&cal_min=0&cal_max=50000&fields=*&appId=b96c9d7e&appKey=8e96a54eb0b1b268f7d36a6c25caef9e`)
  .then(response => response.json())
  .then(function(data) {
    var selectedInfo = Array.prototype.slice.call($('tr th.selected')).map(function(e) {return $(e).text().toLowerCase().replace(' ', '_');});
    for (let i = 0; i < selectedInfo.length; i++) {
      input.closest('tr').find('td.' + selectedInfo[i]).text(parseFloat(data.hits[0].fields['nf_' + selectedInfo[i]]));
    }
  });
}

$(document).ready(function() {
  $('#calculate').on('click', function() {
    totalFat = 0;
    totalProtein = 0;
    totalFiber = 0;
    $('#menu td').each(function() {
      if ($(this).find('input.food').val()) {
        calculateIndividual($(this));
      }
    });
    $('#calculate').attr("disabled", "disabled");
    $('#main li input:empty').attr("disabled", "disabled");
  });
  $('#sum').on('click', function() {
    $('#total_fat').text(totalFat.toFixed(2));
    $('#total_protein').text(totalProtein.toFixed(2));
    $('#total_fiber').text(totalFiber.toFixed(2));
    $('#total_result').show();
    $('#sum').attr("disabled", "disabled");
  });
  $('.choice').on('click', function() {
    if ($(this).hasClass('selected')) {
      $(this).removeClass('selected');
      $(this).addClass('deselected');
    } else {
      $(this).removeClass('deselected');
      $(this).addClass('selected');
    }
  });
  $('.dropdown').on('change', function() {
    if ($(this).find(':selected').text() !== '') {
      $(this).next().prop('disabled', true);
      $(this).next().attr('placeholder', '');
    } else {
      $(this).next().prop('disabled', false);
    }
  });
  $('#add-row').on('click', addRow);
});
