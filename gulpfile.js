/* eslint-disable semi */

const fs = require('fs');
const path = require('path');
const sizeOf = require('image-size');
const gulp = require('gulp');
// const gm = require('gm');
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

// Retrieve site data
var siteData = JSON.parse(fs.readFileSync('./src/json/site-data.json', 'utf8'));

// Generate srcset attributes for images
function createSrcsets() {

	// Loop through each image in the image list
	for (let i = 0; i < siteData.images.length; i++) {
		let srcsets = [];
		let defaultWidth = 72;
		let imageFilename = siteData.images[i].filename;

		// Loop through all sizes of each image
		Object.keys(siteData.imageSizes).map(function (objectKey) {
			var srcsetFilename = path.basename(imageFilename, path.extname(imageFilename)) + '_' + objectKey + path.extname(imageFilename);

			if (fs.existsSync(imagePath + srcsetFilename)) {
				let srcsetWidth = sizeOf(imagePath + srcsetFilename).width;
        
				if (objectKey === 'xxs') {
					defaultWidth = siteData.imageSizes[objectKey];
				}

				srcsets.push(imageAddr + srcsetFilename + ' ' + srcsetWidth + 'w');
			}

			siteData.images[i]['src'] = imageAddr + imageFilename;
			siteData.images[i]['srcset'] = srcsets.join(' ');
			siteData.images[i]['width'] = defaultWidth;
		});
	}
}
createSrcsets();

gulp.task('images', function (cb) {
	Object.keys(siteData.imageSizes).map(function (objectKey) {
		gulp.src('src/images/img/*.{jpg,png}')
			.pipe(imageResize( { width: siteData.imageSizes[objectKey] }))
			.pipe(rename(function (path) { path.basename += '_' + objectKey; }))
			.pipe(imagemin([
				imagemin.jpegtran({ progressive: true })
			]))
			.pipe(gulp.dest(sitePath + 'images'))
	});
	cb();
});

// Compile Pug files into HTML
gulp.task('pug', function () {
	return gulp.src('src/pug/index.pug')
		.pipe(pug({data: siteData, pretty: true}))
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
						attrs: ('fill|stroke.*|data-name')
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

// Copy glide files to sitePath
gulp.task('glide', function() {
	return gulp.src('src/glide/{glide.js,css/glide.core.css}')
		.pipe(gulp.dest(sitePath + 'glide'))
});

// Copy js files to sitePath
gulp.task('js', function() {
	return gulp.src('src/js/*.js')
		.pipe(gulp.dest(sitePath + 'js'))
});

// browserSync and file watching
gulp.task('serve', function () {
	browserSync.init({
		server: sitePath,
		browser: 'FireFox'
	});

	gulp.watch('src/stylus/*.styl', gulp.series('stylus'));
	gulp.watch('src/pug/*.pug', gulp.series('pug'));
	gulp.watch('src/images/svg/*.svg', gulp.series('svgo', 'pug'));
	gulp.watch('src/js/*.js', gulp.series('js', 'pug'));
	gulp.watch('src/fonts/*.{ttf,otf,svg,eot,woff,woff2}', gulp.series('fonts'));
	gulp.watch(sitePath + '*.html').on('change', browserSync.reload);
});

gulp.task('default', gulp.series('serve'));
