var userChoice = "nothing";
var computerChoice = "nothing";

function myFunction() {
  initialUserChoice = prompt("Do you choose rock, paper, or scissors?");
  var userChoice = initialUserChoice.toLowerCase();
  document.getElementById("userChoice").innerHTML = "You chose " + userChoice;
  var computerChoice = Math.random()

  if (computerChoice <= 0.33) {
    computerChoice = "rock";
  } else if (computerChoice > 0.33 & computerChoice <= 0.66) {
    computerChoice = "paper";
  } else {
    computerChoice = "scissors";
  }
  document.getElementById("computerChoice").innerHTML = "Computer chose " + computerChoice;

  function compare(userChoice, computerChoice) {
    switch (userChoice) {
      case 'rock':
        if (computerChoice === "scissors") {
          return ("You win! Rock destroys scissors!");
        } else if (computerChoice === "paper") {
          return ("You lose! Paper covers rock!");
        } else {
          return ("It's a tie!");
        }
        break;
      case 'paper':
        if (computerChoice === "rock") {
          return ("You win! Paper covers rock!");
        } else if (computerChoice === scissors) {
          return ("You lose! Scissors cut paper!");
        } else {
          return ("It's a tie!");
        }
        break;
      case 'scissors':
        if (computerChoice === "paper") {
          return ("You win! Scissors cuts paper!");
        } else if (computerChoice === "rock") {
          return ("You lose! Rock crushes scissors!");
        } else {
          return ("It's a tie!");
        }
        break;
      default:
        return ("That's not one of the choices! Try again!");
        break;
    }
  }
  document.getElementById("comparing").innerHTML = compare(userChoice, computerChoice);
}
