const main = document.querySelector('main');
const body = document.querySelector('body');
const input = document.querySelector('input');
const header = document.querySelector('header');
const request = new XMLHttpRequest();
const url = `https://api.tvmaze.com/shows`;
const searchUrl = `https://api.tvmaze.com/search/shows?q=`;

function fetchData() {
  request.open('GET', url + input.value);
  request.send();
  request.onload = function () {
    const response = JSON.parse(request.responseText);
    displayShows(response);
  };
}

function displayShows(obj) {
  obj.forEach((element, index) => {
    if (index > 50 && index < 100) {
      const div = document.createElement('div');
      const img = document.createElement('img');
      const title = document.createElement('h3');

      img.src = element.image.medium;
      title.innerHTML = element.name;

      div.append(img, title);
      main.appendChild(div);
      div.addEventListener('click', function () {
        localStorage.setItem('show', element.id);
        window.location.href = './showInfoPage.html';
      });
    }
  });
}

function fetchSuggestions() {
  request.open('GET', searchUrl + check);
  console.log(searchUrl + check);
  request.send();
  request.onload = function () {
    response = JSON.parse(request.responseText);
    console.log(response);
    showSuggestions(response);
  };
}

function showSuggestions(obj) {
  const div = document.createElement('div');
  div.classList.add('suggestions');
  obj.forEach((el) => {
    const list = document.createElement('li');
    list.innerHTML += `<br>${el.show.name}`;
    div.appendChild(list);
    list.addEventListener('click', function (e) {
      e.stopPropagation();
      localStorage.setItem('show', el.show.id);
      window.location.href = './showInfoPage.html';
    });
  });
  header.appendChild(div);
  body.addEventListener('click', function () {
    div.style.display = 'none';
  });
}

window.addEventListener('load', fetchData);

input.addEventListener('keyup', function () {
  check = input.value.toLowerCase();
  console.log(check);
  fetchSuggestions();
});
