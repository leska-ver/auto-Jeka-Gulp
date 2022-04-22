// import $ from "jquery";


function search () {



  //Проверка ошибок console.log() 
  const search = document.querySelector('.header__center-form');
  const searchBtn = document.querySelector('.header__center-search');
  const searchInput = document.querySelector('.header__center-input');
  const searchClose = document.querySelector('.header__center-close');

  // search Лупа
  searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    searchInput.classList.add('header__center-input--active');
    search.classList.add('search-active');
    searchClose.classList.add('header__center-close-active');
  })

  searchClose.addEventListener('click', (e) => {
    e.preventDefault();
    searchInput.classList.remove('header__center-input--active');
    search.classList.remove('search-active');
    searchClose.classList.remove('header__center-close-active');
  })

  window.addEventListener('click', (event) => {
    if (!search.contains(event.target)) searchInput.classList.remove('header__center-input--active');
    if (!search.contains(event.target)) search.classList.remove('search-active');
    if (!search.contains(event.target)) searchClose.classList.remove('header__center-close-active');
  });




};


export default search;