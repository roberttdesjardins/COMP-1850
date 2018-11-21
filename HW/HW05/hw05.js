const nameAndAgeP = document.querySelector("#name-and-age");
var name = prompt("Please enter your name:");
var age = prompt("Please enter your age:");
nameAndAgeP.textContent = "Hi " + name + ". You are " + age + " years old!";

const favColourP = document.querySelector("#fav-colour");
var colourChosen = prompt("Please enter your favorite colour:")
favColourP.textContent = "Your favorite colour is " + colourChosen;
document.fgColor = colourChosen;