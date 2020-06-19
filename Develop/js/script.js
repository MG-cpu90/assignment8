// Variables
const contactForm = $("#contactForm");
const nameInput = $("#nameInput");
const emailInput = $("#emailInput");
const textArea = $("#textArea");
const submitButton = $("#submitButton");

submitButton.on("click", function (event) {

    event.preventDefault();
    console.log("Form submitted!");

});

$(function () {
    $('[data-toggle="popover"]').popover()
  })