"use strict";
let boxstudent = document.querySelector("#box-student");
const template = document.querySelector("#studentTemplate").content;
const urlJson = "http://petlatkea.dk/2019/hogwarts/students.json";
const Poudlard_Student = {
  // properties
  firstName: "-studentFirstName-",
  middleName: "-studentMidlleName-",
  lastName: "-studentLastName-",
  imagename: "-studentImage-",
  house: "-studentHouse-"
};
const arrayOfStudents = [];
let allFilter = document.querySelector("#filter_button_all");
let slytherinFilter = document.querySelector("#filter_button_Slytherin");
let gryffindorFilter = document.querySelector("#filter_button_Gryffondor");
let hufflepuffFilter = document.querySelector("#filter_button_Hufflepuff");
let ravenclawFilter = document.querySelector("#filter_button_Ravenclaw");

window.addEventListener("DOMContentLoaded", init);

function init() {
  console.log("init");
  fetch("http://petlatkea.dk/2019/hogwarts/students.json")
    .then(res => res.json()) // Get the response as a JSON format
    .then(getJSON); // Call the next function
}

function getJSON(studentList) {
  console.log("getJson");

  // splitting
  studentList.forEach(showSingleStudent => {
    let newStudent = Object.create(Poudlard_Student);
    let fullName = showSingleStudent.fullname.split(" ");
    if (fullName[2]) {
      newStudent.firstName = fullName[0];
      newStudent.middleName = fullName[1];
      newStudent.lastName = fullName[2];
    } else {
      newStudent.firstName = fullName[0];
      newStudent.lastName = fullName[1];
    }
    newStudent.house = showSingleStudent.house;
    arrayOfStudents.push(newStudent);
  });
  displayStud(arrayOfStudents);
}

function displayStud(arraystud) {
  boxstudent.innerHTML = "";
  arraystud.forEach(nouveau => {
    // Declare the variable for the copy
    const copy = template.cloneNode(true);
    console.log(nouveau);
    //The cloneNode creates a copy of the node, and returns the clone. The cloneNode() method clones all attributes and their values.
    copy.querySelector("#data-firstName").textContent = nouveau.firstName;
    copy.querySelector("#data-lastName").textContent = nouveau.lastName;
    copy.querySelector("#data-house").textContent = nouveau.house;
    boxstudent.appendChild(copy);
  });
}

// filtering   fixed the select to display !!! IT's WORkiiiiiiiiiiign Alleeeeluiaaa
function filterHouse(House) {
  let houseFiltered = [];

  houseFiltered = arrayOfStudents.filter(flr => flr.house === House);

  return houseFiltered;
}

function loadFilter() {
  allFilter.addEventListener("click", displayAll);
  slytherinFilter.addEventListener("click", filterSlytherin);
  gryffindorFilter.addEventListener("click", filterGryffindor);
  hufflepuffFilter.addEventListener("click", filterHufflepuff);
  ravenclawFilter.addEventListener("click", filterRavenclaw);
  filterRavenclaw();
}

function displayAll() {
  displayStud(arrayOfStudents);
}

function filterSlytherin() {
  displayStud(filterHouse("Slytherin"));
}
function filterGryffindor() {
  displayStud(filterHouse("Gryffindor"));
}
function filterHufflepuff() {
  displayStud(filterHouse("Hufflepuff"));
}
function filterRavenclaw() {
  displayStud(filterHouse("Ravenclaw"));
}

loadFilter();

init();
