"use strict";

/* Fetch data from json file */
const dataJson = async () => {
  const res = await fetch("http://localhost:3000/courses");
  return await res.json();
};

/* elements */
const nav = document.querySelector(".nav-container");
const courseContainer = document.querySelector(".div-courses");
const tabs = document.querySelector(".tab-content");
const searchInput = document.querySelector(".search");
const slider = document.querySelector(".carousel-inner");
const searchBtn = document.querySelector(".search-btn");
const pythonTabBtn = document.querySelector("#python-tab");
const excelTabBtn = document.querySelector("#excel-tab");
const webTabBtn = document.querySelector("#web-tab");
const pythonTab = document.querySelector("#Python");
const excelTab = document.querySelector("#Excel");
const webTab = document.querySelector("#Web");

/* Functions */
// Create course card
const courseCard = function (el) {
  let card = document.createElement("div");
  card.className = "course-card w-24";

  let div = document.createElement("div");
  div.classList = "w-90";
  let img = document.createElement("img");
  img.src = el.image;
  img.classList = "w-100";
  div.append(img);
  card.append(div);

  div = document.createElement("div");
  div.classList = "h-3 mb-3 w-100";
  let h4 = document.createElement("h4");
  h4.textContent = el.title;
  h4.classList = "w-90";
  div.append(h4);
  card.append(div);

  let p = document.createElement("p");
  p.textContent = el.author;
  card.append(p);

  let span = document.createElement("span");
  span.textContent = el.rating + "    ";
  card.append(span);

  for (let i = 1; i <= 4; i++) {
    let icon = document.createElement("i");
    icon.classList = "fa-solid fa-star";
    card.append(icon);
  }

  let icon = document.createElement("i");
  icon.classList = "fa-solid fa-star-half";
  card.append(icon);

  span = document.createElement("span");
  span.textContent = "  (" + el.people + ")";
  card.append(span);

  div = document.createElement("div");
  div.classList = "discount";

  let h5 = document.createElement("h5");
  h5.textContent = "E£" + el.price;
  div.append(h5);

  h5 = document.createElement("h5");
  h5.textContent = "E£" + el.discount;
  div.append(h5);

  card.append(div);

  return card;
};

// Clear all courses card in the container
const clearCourses = function () {
  const curCourses = document.querySelectorAll(".carousel-item");

  curCourses.forEach((el) => {
    el.remove();
  });
};

// Add Courses to the container
const addCourses = function (allCourses, cur) {
  clearCourses();

  let courseRow = document.createElement("div");
  courseRow.classList = "carousel-item active";

  let div = document.createElement("div");
  div.classList = "row";

  allCourses.forEach(function (el, i) {
    // create new row
    if (i % 5 == 0 && i > 0) {
      courseRow.append(div);
      slider.append(courseRow);
      courseRow = document.createElement("div");
      courseRow.classList = "carousel-item";
      div = document.createElement("div");
      div.classList = "row";
    }

    const card = courseCard(el);
    div.append(card);
  });

  courseRow.append(div);

  if (cur == 1) pythonTab.append(courseRow);
  if (cur == 2) excelTab.append(courseRow);
  if (cur == 3) webTab.append(courseRow);
};

// Display the courses that have been search for
const search = function (data, text) {
  const allCards = document.querySelectorAll(".course-card");

  allCards.forEach((el) => {
    const courseName = el.querySelector("h4").textContent.toLowerCase();
    const searchText = text.toLowerCase();

    if (courseName.indexOf(searchText) == -1) el.style.display = "none";
    else el.style.display = "block";
  });

  searchInput.value = "";
};

// Main
const main = async function () {
  // all courses
  const data = await dataJson();

  // tabs courses
  const dataPython = data.filter(function (el) {
    return el.tabs == "Python";
  });
  const dataExcel = data.filter(function (el) {
    return el.tabs == "Excel";
  });
  const dataWeb = data.filter(function (el) {
    return el.tabs == "Web Development";
  });

  // display courses
  addCourses(dataPython, 1);

  pythonTabBtn.addEventListener("click", function () {
    addCourses(dataPython, 1);
  });

  excelTabBtn.addEventListener("click", () => {
    addCourses(dataExcel, 2);
  });

  webTabBtn.addEventListener("click", () => {
    addCourses(dataWeb, 3);
  });

  // display courses when press search button
  searchBtn.addEventListener("click", () => {
    search(data, searchInput.value);
  });

  // display courses when press Enter on search input
  searchInput.addEventListener("keydown", (el) => {
    if (el.key == "Enter") search(data, searchInput.value);
  });
};

main();
