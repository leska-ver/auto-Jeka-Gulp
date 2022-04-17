// import $ from "jquery";


function footerModal () {


  /* Записываем в переменные массив элементов-кнопок и подложку.
      Подложке зададим id, чтобы не влиять на другие элементы с классом overlay*/
      let modalButtons = document.querySelectorAll('.js-open-modal'),
      overlay      = document.querySelector('.js-overlay-modal'),
      closeButtons = document.querySelectorAll('.js-modal-close');


  /* Перебираем массив кнопок */
  modalButtons.forEach(function(item){

     /* Назначаем каждой кнопке обработчик клика */
     item.addEventListener('click', function(e) {

        /* Предотвращаем стандартное действие элемента. Так как кнопку разные
           люди могут сделать по-разному. Кто-то сделает ссылку, кто-то кнопку.
           Нужно подстраховаться. */
        e.preventDefault();

        /* При каждом клике на кнопку мы будем забирать содержимое атрибута data-modal
           и будем искать модальное окно с таким же атрибутом. */
         let modalId = this.getAttribute('data-modal'),
            modalElem = document.querySelector('.footer__modal[data-modal="' + modalId + '"]');


        /* После того как нашли нужное модальное окно, добавим классы
           подложке и окну чтобы показать их. */
        modalElem.classList.add('active');
        overlay.classList.add('active');
     }); 

  });


  closeButtons.forEach(function(item){

     item.addEventListener('click', function(e) {
       let parentModal = this.closest('.footer__modal');

        parentModal.classList.remove('active');
        overlay.classList.remove('active');
     });

  });


   document.body.addEventListener('keyup', function (e) {
     let key = e.keyCode;

       if (key == 27) {

           document.querySelector('.footer__modal.active').classList.remove('active');
           document.querySelector('.footer__overlay').classList.remove('active');
       };
   }, false);


   overlay.addEventListener('click', function() {
       document.querySelector('.footer__modal.active').classList.remove('active');
       this.classList.remove('active');
   });


};


export default footerModal;