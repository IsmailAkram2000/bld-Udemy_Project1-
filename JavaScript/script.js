"use strict";

const dataJson = async () => {
  const res = await fetch("http://localhost:3000/courses");
  return await res.json();
};

// elements
const nav = document.querySelector(".nav-container");
const courseContainer = document.querySelector(".div-courses");
const searchInput = document.querySelector(".search");
const searchBtn = document.querySelector(".search-btn");

// Function to create course card
const courseCard = function (el) {
  let card = document.createElement("div");
  card.className = "course-card";

  let img = document.createElement("img");
  img.src = el.image;
  card.append(img);

  let h4 = document.createElement("h4");
  h4.textContent = el.title;
  card.append(h4);

  let p = document.createElement("p");
  p.textContent = el.author;
  card.append(p);

  let span = document.createElement("span");
  span.textContent = el.rating;
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
  span.textContent = "(" + el.people + ")";
  card.append(span);

  let div = document.createElement("div");
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

// Hidden all courses that didn't search for
const search = function (text) {
  const allCards = document.querySelectorAll(".course-card");

  allCards.forEach((el) => {
    const courseName = el.querySelector("h4").textContent.toLowerCase();
    const searchText = text.toLowerCase();

    if (courseName.indexOf(searchText) == -1) el.style.display = "none";
    else el.style.display = "block";
  });
};

const main = async function () {
  // all courses
  const data = await dataJson();

  // display all courses
  data.forEach((el) => {
    const card1 = courseCard(el);
    courseContainer.append(card1);
  });

  // display search courses  when press submit button
  searchBtn.addEventListener("click", () => {
    search(searchInput.value);
  });

  // display search courses when press Enter
  searchInput.addEventListener("keydown", (el) => {
    if (el.key == "Enter") search(searchInput.value);
  });
};

main();
