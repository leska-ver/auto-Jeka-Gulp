import $ from "jquery";

function autoJeka () {

  
  //--Меню(data-target) клик или is-open--is-active--//
  document.querySelectorAll(".header__center-item-btn_js").forEach(item => {
    item.addEventListener("click", function () {
      let btn = this;
      let dropdown = this.parentElement.querySelector(".header__center-dropdown_js");

      document.querySelectorAll(".header__center-item-btn_js").forEach(el => {
        if (el != btn) {
          el.classList.remove("active--btn");
        }
      });

      document.querySelectorAll(".header__center-dropdown_js").forEach(el => {
        if (el != dropdown) {
          el.classList.remove("active-list--item");
        }
      })
      dropdown.classList.toggle("active-list--item");
      btn.classList.toggle("active--btn")
    })
  })

  document.addEventListener("click", function (e) {
    let target = e.target;
    if (!target.closest(".header__center-list_js")) {
      document.querySelectorAll(".header__center-dropdown_js").forEach(el => {
        el.classList.remove("active-list--item");
      })
      document.querySelectorAll(".header__center-item-btn_js").forEach(el => {
        el.classList.remove("active--btn");
      });
    }
  });



  //--burger--//
  window.addEventListener('DOMContentLoaded', function () {
    document.querySelector('#burger').addEventListener('click', function () {
      document.querySelector('#menu').classList.toggle('is-active')
    })
  })

  $(document).ready(function () {
    $('#burger').click(function () {
      $(this).toggleClass('open');
    });
  });



  



  //--inputmask - Телефон--//
  const form = document.querySelector('.form');
  const telSelector = form.querySelector('input[type="tel"]');
  const inputMask = new Inputmask('+7 (999) 999-99-99');
  inputMask.mask(telSelector);

  new window.JustValidate('.form', {
    rules: {
      tel: {
        required: true,
        function: () => {
          const phone = telSelector.inputmask.unmaskedvalue();
          return Number(phone) && phone.length === 10;
        }
      }
    },
    colorWrong: '#ff0f0f',
    messages: {
      name: {
        required: 'Введите имя',
        minLength: 'Введите 3 и более символов',
        maxLength: 'Запрещено вводить более 15 символов'
      },
      email: {
        email: 'Введите корректный email',
        required: 'Введите email'
      },
      tel: {
        required: 'Введите телефон',
        function: 'Здесь должно быть 10 символов без +7'
      },
      text: {
        required: 'Введите Select Service',
        minLength: 'Введите 15 и более символов',
        maxLength: 'Запрещено вводить более 25 символов'
      }
    },
    submitHandler: function (thisForm) {
      let formData = new FormData(thisForm);

      let xhr = new XMLHttpRequest();

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            console.log('Отправлено');
          }
        }
      }


      xhr.open('POST', 'mail.php', true);
      xhr.send(formData);

      thisForm.reset();
    }
  });



  //--Меню(Флаги) клик или is-open--is-active--//
  const params = {
    btnClassName: "header__bottom-item-btn",
    activeClassName: "is-active",
    disabledClassName: "is-disabled"
  }

  function onDisable(evt) {
    if (evt.target.classList.contains(params.disabledClassName)) {
      evt.target.classList.remove(params.disabledClassName, params.activeClassName);
      evt.target.removeEventListener("animationend", onDisable);
    }
  }

  function setMenuListener() {
    document.body.addEventListener("click", (evt) => {
      const activeElements = document.querySelectorAll(`.${params.activeClassName}`);

      if (activeElements.length && !evt.target.closest(`.${params.activeClassName}`)) {
        activeElements.forEach((current) => {
          if (current.classList.contains(params.btnClassName)) {
            current.classList.remove(params.activeClassName);
          } else {
            current.classList.add(params.disabledClassName);
          }
        });
      }

      if (evt.target.closest(`.${params.btnClassName}`)) {
        const btn = evt.target.closest(`.${params.btnClassName}`);
        const path = btn.dataset.path;
        const drop = document.querySelector(`[data-target="${path}"]`);

        btn.classList.toggle(params.activeClassName);

        if (!drop.classList.contains(params.activeClassName)) {
          drop.classList.add(params.activeClassName);
          drop.addEventListener("animationend", onDisable);
        } else {
          drop.classList.add(params.disabledClassName);
        }
      }
    });
  }

  setMenuListener();



  //--Табы (gallery__bay Каталог-фото ремонт авто)--//
  const allTabBtns = document.querySelectorAll('.js-tabs-btn');

  allTabBtns.forEach(function (tabsBtn) {
    tabsBtn.addEventListener('click', function (event) {

      // event.preventDefault();//Отменяем клик ссылке

      const path = event.currentTarget.dataset.path

      document.querySelectorAll('.tab-content').forEach(function (tabContent) {
        tabContent.classList.remove('tab-content-active')
      })
      document.querySelector(`[data-target="${path}"]`).classList.add('tab-content-active')

      allTabBtns.forEach(function (el) {
        el.classList.remove('is-active');
      });

      this.classList.add('is-active');
    })
  });



  //--Скрываем часть услуг .gallery__bay-img--//
  const list = document.getElementById('list-js');
  const moreButton = document.getElementById('list-button-js');
  moreButton.addEventListener('click', function () {
    list.classList.toggle('full');
  });



  //--Яндекс карта--//
  ymaps.ready(function () {
    let myMap = new ymaps.Map('map', { //1 метка
        center: [47.60957850699349, -122.3417605],
        zoom: 16
      }, {
        searchControlProvider: 'yandex#search'
      }),

      // Создаём макет содержимого.
      MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
        '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
      ),

      myGeoObject = new ymaps.Placemark(myMap.getCenter(), {
        hintContent: 'logoipsum',
        balloonContent: 'Mon - Sat: 7:000 am - 6:00 pm'
      }, {
        // Опции.
        // Необходимо указать данный тип макета.
        iconLayout: 'default#image',
        // Своё изображение иконки метки.
        // iconImageHref: 'https://img2.freepng.ru/20180514/tpw/kisspng-middle-market-company-business-development-marketi-5af94049274d16.924943061526284361161.jpg',
        iconImageHref: 'img/ymaps.svg',
        // Размеры метки.
        iconImageSize: [20, 20],
        // Смещение левого верхнего угла иконки относительно
        // её "ножки" (точки привязки).
        iconImageOffset: [-5, -8],
        // Смещение слоя с содержимым относительно слоя с картинкой.
        iconContentOffset: [15, 15],
        // Макет содержимого.
        iconContentLayout: MyIconContentLayout
      });

    myMap.geoObjects
      .add(myGeoObject);
  });



  //--Кнопка для видео включатель/выключатель. зелённый круг--//
  let per = 0;
  $(document).ready(function () {
    // $("#tasetupo-kedgaben").css("height", $(document).height()).hide(); Вытянит на всю высоту
    // Клик на всю высоту
    // $(document).click(function(e) {
    // if(!$(e.target).hasClass('on-off') && per == 1) {
    //   $(".included-off").toggle();
    //   per = 0;
    // }
    // });

    $(".gallery__span_on-off-1js").click(function () {
      $(".gallery__off_1js").toggle();
      per += 1;
      if (per == 2) {
        per = 0;
      }
    });

    $(".gallery__span_on-off-2js").click(function () {
      $(".gallery__off_2js").toggle();
      per += 1;
      if (per == 2) {
        per = 0;
      }
    });

    $(".gallery__span_on-off-3js").click(function () {
      $(".gallery__off_3js").toggle();
      per += 1;
      if (per == 2) {
        per = 0;
      }
    });
  });




  //--Часы, они в модальном окне--// 
  window.onload = function () {
    window.setInterval(
      function () {
        let d = new Date();
        let month_num = d.getMonth();
        let day = d.getDate();
        let hours = d.getHours();
        let minutes = d.getMinutes();
        let seconds = d.getSeconds();
        let weekday_num = d.getDay();
        let year = d.getFullYear();
        //Создаем масив месяцев    
        let month = new Array(12);
        month[0] = "Января";
        month[1] = "Февраля";
        month[2] = "Марта";
        month[3] = "Апреля";
        month[4] = "Мая";
        month[5] = "Июня";
        month[6] = "Июля";
        month[7] = "Августа";
        month[8] = "Сентября";
        month[9] = "Октября";
        month[10] = "Ноября";
        month[11] = "Декабря";
        let month_full = month[d.getMonth()];

        //Создаем масив дней недели
        let weekday = new Array(7);
        weekday[0] = "Воскресенье";
        weekday[1] = "Понедельник";
        weekday[2] = "Вторник";
        weekday[3] = "Среда";
        weekday[4] = "Четверг";
        weekday[5] = "Пятница";
        weekday[6] = "Суббота";
        let weekday_full = weekday[d.getDay()];

        if (day <= 9) day = "0" + day;
        if (hours <= 9) hours = "0" + hours;
        if (minutes <= 9) minutes = "0" + minutes;
        if (seconds <= 9) seconds = "0" + seconds;

        //выводим на страице
        document.getElementById("weekly").innerHTML = weekday_full; //День недели
        document.getElementById("month").innerHTML = month_full; //Название месяца
        document.getElementById("hours").innerHTML = hours; //Часы
        document.getElementById("minutes").innerHTML = minutes; //Минуты
        //document.getElementById("seconds").innerHTML = seconds;//Секунды
        document.getElementById("date").innerHTML = day; //Дата
        document.getElementById("year").innerHTML = year; //Год    
      }, 1000);
  }

  //мирцание : между часами и минутами
  function Mig() {
    let label = document.getElementById('mig'); //находим : по id
    if (label.style.visibility == "visible") { //отображаем : с помощью стилей
      label.style.visibility = "hidden"; //скрываем : с помощью стилей
    } else {
      label.style.visibility = "visible"; //отображаем : с помощью стилей
    }
  } {
    setInterval(Mig, 1000); //задаем интервал мигания 1 сек.
  }




  //--Плавный скролл по якорям. В любое место можно кинуть.--//
  $(function () {
    $('a[href^="#"]').click(function () {
      let target = $(this).attr('href');
      $('html, body').animate({
        scrollTop: $(target).offset().top
      }, 800);
      return false;
    });
  });

};


export default autoJeka;