"use strict";

const template = document.querySelector("#studentTemplate").content;
const urlJson = "http://petlatkea.dk/2019/hogwarts/students.json";


window.addEventListener("DOMContentLoaded", init);

function init() {
  console.log("init");
fetch("http://petlatkea.dk/2019/hogwarts/students.json")
    .then(res => res.json()) // Get the response as a JSON format
    .then(getJSON); // Call the next function
}

function getJSON(studentList) {
  console.log("getJSON");

     // Execute the function on each element
  studentList.forEach(showSingleStudent);


}



// Declare the callback function to show single student
function showSingleStudent(student) {
  // Declare the variable for the copy
  const copy = template.cloneNode(true);
  //The cloneNode creates a copy of the node, and returns the clone. The cloneNode() method clones all attributes and their values.

  // Get the text of the "h1" element in the document and change the title for each student
  copy.querySelector("h2").textContent = student.fullname;
  copy.querySelector("p").textContent = student.house;

  // Insert the cloned node to the document - in the html element "main" - with the appendChild() method.
  document.querySelector("main").appendChild(copy);
}

// Call the function
init();