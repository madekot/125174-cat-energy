ymaps.ready(function() {
  var coordsMobile = [59.9386, 30.3231];
  var coordsDesktop = [59.9386, 30.3195];

  var coords;
  if (window.matchMedia("(min-width: 1300px)").matches) {
    coords = coordsDesktop;
  } else {
    coords = coordsMobile;
  }

  var myMap = new ymaps.Map('map', {
      center: coords,
      zoom: 17
    }, {
      searchControlProvider: 'yandex#search'
    });

    var myPlacemark = new ymaps.Placemark(coordsMobile, {
      hintContent: 'Кэт энерджи',
      balloonContent: 'Магазин кормов для животных'
    }, {
      // Опции.
      // Необходимо указать данный тип макета.
      iconLayout: 'default#image',
      // Своё изображение иконки метки.
      iconImageHref: 'img/map-pin.png',
      // Размеры метки.
      iconImageSize: [100, 85],
      // Смещение левого верхнего угла иконки относительно
      // её "ножки" (точки привязки).
      iconImageOffset: [-50, -85]
    });

  myMap.geoObjects
    .add(myPlacemark);
});
