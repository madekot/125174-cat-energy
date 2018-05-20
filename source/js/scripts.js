var navToggle = document.querySelector('.page-header__toggle');
var navMain = document.querySelector('.page-header__nav');
var pageHeader = document.querySelector('.page-header');

pageHeader.classList.remove('page-header--no-js');

navToggle.addEventListener('click', function() {
  if (navMain.classList.contains('page-header__nav--close')) {
    navMain.classList.remove('page-header__nav--close');
    navMain.classList.add('page-header__nav--open');

    if (navToggle.classList.contains('page-header__toggle--open')) {
      navToggle.classList.remove('page-header__toggle--open');
      navToggle.classList.add('page-header__toggle--close');
    }

  } else {
    navMain.classList.add('page-header__nav--close');
    navMain.classList.remove('page-header__nav--open');

    if (navToggle.classList.contains('page-header__toggle--close')) {
      navToggle.classList.remove('page-header__toggle--close');
      navToggle.classList.add('page-header__toggle--open');
    }
  }
});
