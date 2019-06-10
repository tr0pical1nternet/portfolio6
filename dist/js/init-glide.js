/* eslint-disable no-undef */
/* eslint-disable indent */
// eslint-disable-next-line no-undef

new Glide('.portfolio-gallery', {
  type: 'carousel',
  touchAngle: 30,
  gap: 0,
  touchRatio: 1,
  classes: {
    base: 'portfolio-gallery',
    wrapper: 'portfolio-gallery__wrapper',
    track: 'portfolio-gallery__track',
    slide: 'portfolio-gallery__slide',
    arrows: 'portfolio-gallery__arrows',
    arrow: 'portfolio-gallery__arrow',
    arrowNext: 'next',
    arrowPrev: 'prev',
    bullets: 'portfolio-gallery__bullets',
    bullet: 'portfolio-gallery__bullet',
    clone: 'clone',
    active: 'active',
    dragging: 'dragging',
    disabled: 'disabled'
  }
}).mount();

new Glide('.portfolio-info', {
  type: 'slider',
  touchAngle: 30,
  gap: 0,
  touchRatio: 1
}).mount();
