$(document).ready(function() {

  // Used to check the currently entered number
  var input;
  // Used to store all of the inputs until equal is pressed
  var calculation = [];
 
 //Operators array for validation without .
  var operators = ["+","-","/","*"];
  var numbers = [0,1,2,3,4,5,6,7,8,9];
  
  // Function to add the current input to the array
  function addInput(input){
    if (calculation[calculation.length-1] === '.' && input === '.'){
      $("#display").html('Err');
    } else {
      calculation.push(input);
      $("#display").text(input);
      $("#small").append(input);  
    }
  }
  
  // Each button press will update the display
  $("button").on("click", function() {
    input = $(this).text();
    // Clear All
    if (input === 'AC'){
      $("#display").html('');
      $("#small").html('');
      calculation = [];
    } else if (input === '='){
      var totalExpression = calculation.join('');
      $("#display").html(eval(totalExpression));
    } else {
      // Add the next input
      addInput(input);
    }
  });
 
});