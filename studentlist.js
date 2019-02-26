"use strict";

const template = document.querySelector("#studentTemplate").content;
const urlJson = "http://petlatkea.dk/2019/hogwarts/students.json";
let arrayOfStudents = [];
let filterArray;

window.addEventListener("DOMContentLoaded", init);

function init() {
  console.log("init");
  fetch("http://petlatkea.dk/2019/hogwarts/students.json")
    .then(res => res.json()) // Get the response as a JSON format
    .then(getJSON); // Call the next function
}

function getJSON(studentList) {
  console.log("getJson");

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

const Hogward_Student = {
  // - add properties and values
  firstName: "-firstName-",
  lastName: "-lastName-",
  house: "-house-",
  // - function for divided fullname
  splitingName(fullName) {
    const firstSpace = fullName.indexOf(" ");
    const lastSpace = fullName.lastIndexOf(" ");
    this.firstName = fullName.slice(0, firstSpace + 1);
    this.lastName = fullName.slice(lastSpace + 1);
  },
  assignHouse(student) {
    this.house = student.house;
  }
};
function getnameLength(firstSpace) {
  return firstSpace.length;
  console.log(firstSpace("john"));
}

function buildObjects(dataList) {
  dataList.forEach(onedata => {
    let student = Object.create(Hogward_Student);
    student.splitingName(onedata.fullname);
    student.assignHouse(onedata);
    // console.log(student);
    arrayOfStudents.push(student);
  });
  // console.log(arrayOfStudents);
  filterArray = arrayOfStudents;
  filterByHouse(filterArray);
}

function filterByHouse(filterArray) {
  filterArray.filter(onlyGryffindor);
  filterArray.filter(onlyHufflepuff);
  filterArray.filter(onlyRavenclaw);
  filterArray.filter(onlySlytherin);
}

function onlyGryffindor(element) {
  if (element.house === "Gryffindor") {
    return true;
  } else {
    return false;
  }
}

function onlyHufflepuff(element) {
  if (element.house === "Hufflepuff") {
    return true;
  } else {
    return false;
  }
}

function onlyRavenclaw(element) {
  if (element.house === "Ravenclaw") {
    return true;
  } else {
    return false;
  }
}

function onlySlytherin(element) {
  if (element.house === "Slytherin") {
    return true;
  } else {
    return false;
  }
}
