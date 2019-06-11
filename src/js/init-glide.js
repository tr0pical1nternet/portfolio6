/* eslint-disable no-undef */
/* eslint-disable indent */
// eslint-disable-next-line no-undef

var portfolioGallerySlider = new Glide('.portfolio-gallery', {
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
    bullets: 'portfolio-gallery__bullets',
    bullet: 'portfolio-gallery__bullet',
  }
});

var portfolioInfoSlider = new Glide('.portfolio-info', {
  type: 'slider',
  touchAngle: 30,
  gap: 0,
  touchRatio: 1
}).mount();

var content = document.querySelector('.device__content--00');

function swapContent() {
  content.setAttribute('title', content.dataset.raventitle);
  content.setAttribute('alt', content.dataset.ravenalt);
  content.setAttribute('src', content.dataset.ravensrc);
  content.setAttribute('srcset', content.dataset.ravensrcset);
}

portfolioGallerySlider.mount();

portfolioInfoSlider.mount();

// portfolioInfoSlider.on('move.after', function() {
//   if (portfolioInfoSlider.index === 1) {
//     swapContent();
//   }
// });