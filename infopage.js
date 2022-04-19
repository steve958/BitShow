const getId = localStorage.getItem('show');
console.log(getId);
const home = document.querySelector('h1');
const main = document.querySelector('main');
const body = document.querySelector('body');
const secton = document.querySelector('section');
const span = document.querySelector('span');
const request = new XMLHttpRequest();
const description = document.createElement('div');
const url = `https://api.tvmaze.com/shows/${getId}`;
const fetchSeasonsUrl = `https://api.tvmaze.com/shows/${getId}/seasons`;
const fetchCastUrl = `https://api.tvmaze.com/shows/${getId}/cast`;

function fetchData() {
  request.open('GET', url);
  request.send();
  request.onload = function () {
    const response = JSON.parse(request.responseText);
    console.log(response);
    displayShows(response);
  };
}

function fetchSeasons() {
  const request = new XMLHttpRequest();
  request.open('GET', fetchSeasonsUrl);
  request.send();
  request.onload = function () {
    const response = JSON.parse(request.responseText);
    displaySeasons(response);
  };
}

function fetchCast() {
  const request = new XMLHttpRequest();
  request.open('GET', fetchCastUrl);
  request.send();
  request.onload = function () {
    const response = JSON.parse(request.responseText);
    displayCast(response);
  };
}

function displayShows(obj) {
  const div = document.createElement('div');
  const img = document.createElement('img');
  const tittle = document.createElement('h2');
  const sumTittle = document.createElement('h3');
  const sum = document.createElement('p');
  tittle.classList.add('title');
  img.src = obj.image.original;
  tittle.innerHTML = obj.name;
  sum.innerHTML = obj.summary;
  sumTittle.innerHTML = 'Show Details';
  div.appendChild(img);
  secton.appendChild(tittle);
  main.appendChild(div);
  main.appendChild(description);
  span.appendChild(sumTittle);
  span.appendChild(sum);
}

function displaySeasons(obj) {
  description.innerHTML = `SEASONS`;
  description.classList.add('description');
  let counter = 0;
  const desc = document.createElement('p');
  desc.innerHTML = '';
  desc.classList.add('description_p');
  obj.forEach((el, i) => {
    desc.innerHTML += `<br>- ${el.premiereDate ?? '/'} - ${el.endDate ?? '/'}`;
    counter++;
  });
  description.innerHTML += `(${counter})`;
  description.appendChild(desc);
}

function displayCast(obj) {
  console.log(obj);
  description.innerHTML += '<br><br>CAST';
  const desc = document.createElement('p');
  desc.innerHTML = '';
  desc.classList.add('description_p');
  obj.forEach((el, i) => {
    if (i <= 10) desc.innerHTML += `<br> - ${el.person.name}`;
  });
  description.appendChild(desc);
}

window.addEventListener('load', fetchData);
window.addEventListener('load', fetchSeasons);
window.addEventListener('load', fetchCast);

home.addEventListener('click', function () {
  window.location.href = './index.html';
});
