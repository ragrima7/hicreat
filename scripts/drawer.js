'use strict';

document.addEventListener('DOMContentLoaded', function() {
  const openNav = document.getElementById('open_nav');
  const nav = document.getElementById('nav');

  if (openNav && nav) {
    const closeNav = document.getElementById('batu');
    const close_nav = document.getElementsByClassName('close');

    openNav.addEventListener('click', function() {
      nav.classList.add('show');
      nav.classList.remove('show_reverse');
    });

    if (closeNav) {
      closeNav.addEventListener('click', function() {
        nav.classList.remove('show_reverse');
        nav.classList.add('show_reverse');
      });
    }

    Array.from(close_nav).forEach(function(el) {
      el.addEventListener('click', function() {
        nav.classList.remove('show');
        nav.classList.add('show_reverse');
      });
    });

    window.addEventListener('scroll', function() {
      if (nav.classList.contains('show')) {
        nav.classList.remove('show');
        nav.classList.add('show_reverse');
      }
    });
  }
});