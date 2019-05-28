/* eslint-disable semi */

const fs = require('fs');
const sizeOf = require('image-size');
const gulp = require('gulp');
const imageResize = require('gulp-image-resize');
const imagemin = require('gulp-imagemin');
const rename = require('gulp-rename');
const svgo = require('gulp-svgo');
const pug = require('gulp-pug');
const stylus = require('gulp-stylus');
const browserSync = require('browser-sync').create();

// Locations
const sitePath = 'dist/';
const imagePath = sitePath + 'images/';
const imageAddr = 'images/';

// Global functions
// Concatenates image file name from slug, device, and size strings
function imageFile(slug, device, size) {
  let name = slug + '_' + device + '_' + size + '.jpg';
  return name;
}

// Retrieve site data
var siteData = JSON.parse(fs.readFileSync('./src/json/site-data.json', 'utf8'));

// PUTTING THIS ON HOLD UNTIL I CHANGE IMAGE DATA TO FIT
// NEW FILE STRUCTURE

// // Loop through each gallery in portfolio
// for (let i = 0; i < siteData.portfolioItems.length; i++) {
//   siteData.portfolioItems[i].images = [];
//   let item = siteData.portfolioItems[i];

//   // Loop through each image in gallery
//   for (let j = 0; j < item.devices.length; j++) {
//     let device = item.devices[j];
    
//     // Begin create srcset tags
//     let srcsets = [];
//     let defaultWidth = 72;

//     // Loop through all sizes of each image
//     for (let k = 0; k < siteData.imageSizes.length; k++) {
//       let size = siteData.imageSizes[k][0];
//       let file = imageFile(item.slug, device, size);

//       // If file exists, create srcset entry
//       if (fs.existsSync(imagePath + file)) {
//         let width = sizeOf(imagePath + file).width;

//         // Get the width of the smallest size to use for default image size
//         if (size === 'xxs') {
//           defaultWidth = width;
//         };

//         // Add srcset entry to srcsets array
//         srcsets.push(imageAddr + file + ' ' + width + 'w');
//       }
//     }

//     // Push image data to portfolio item
//     siteData.portfolioItems[i].images.push({
//       src:      imageAddr + imageFile(item.slug, device, 'xxl'),
//       alt:      'Screenshot of the ' + item.title + ' website on a ' + device + ' device',
//       srcset:   srcsets.join(', '),
//       class:    'gallery-image ' + device,
//       width:    defaultWidth
//     });
//   }
//   // console.log(siteData.portfolioItems[i]);
// }

// gulp.task('images', function (cb) {
//   siteData.imageSizes.forEach(function (size) {
//     gulp.src('src/images/jpg/*.jpg')
//       .pipe(imageResize( { width: size[1] }))
//       .pipe(rename(function (path) { path.basename += '_' + size[0]; }))
//       .pipe(imagemin())
//       .pipe(gulp.dest(sitePath + 'images'))
//   });
//   cb();
// });

// Compile Pug files into HTML
gulp.task('pug', function () {
  return gulp.src('src/pug/index.pug')
    .pipe(pug({data: siteData}))
    .pipe(gulp.dest(sitePath));
});

// Compile Stylus files into CSS
gulp.task('stylus', function () {
  return gulp.src('src/stylus/style.styl')
    .pipe(stylus({
      'include css': true
    }))
    .pipe(gulp.dest(sitePath))
    .pipe(browserSync.stream());
});

// Clean SVGs for inline inclusion
gulp.task('svgo', () => {
  return gulp.src('src/images/svg/*.svg')
    .pipe(svgo(
      {
        plugins: [{
          removeTitle: false
        }, {
          removeDesc: false
        }, {
          removeXMLNS: true
        }, {
          removeUnknownsAndDefaults: {
            keepRoleAttr: true
          }
        }, {
          removeViewBox: false
        }, {
          // removeDimensions: true
        }, {
          removeAttrs: {
            attrs: 'fill'
          }
        }]
      }
    ))
    .pipe(gulp.dest('src/images/svg/optimized'));
});

// Copy fonts to sitedir
gulp.task('fonts', function() {
  return gulp.src('src/fonts/*.{ttf,otf,svg,eot,woff,woff2}')
    .pipe(gulp.dest(sitePath + 'fonts'))
    .pipe(browserSync.stream());
});

// browserSync and file watching
gulp.task('serve', function () {
  browserSync.init({
    server: sitePath,
    browser: 'FireFox Developer Edition'
  });

  gulp.watch('src/stylus/*.styl', gulp.series('stylus'));
  gulp.watch('src/pug/*.pug', gulp.series('pug'));
  gulp.watch('src/images/svg/*.svg', gulp.series('svgo', 'pug'));
  gulp.watch('src/fonts/*.{ttf,otf,svg,eot,woff,woff2}', gulp.series('fonts'));
  gulp.watch(sitePath + '*.html').on('change', browserSync.reload);
});

gulp.task('default', gulp.series('serve'));
