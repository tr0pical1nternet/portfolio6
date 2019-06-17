/* eslint-disable no-console */
/* eslint-disable no-undef */

// Initialize portfolio gallery slider
$(document).ready(function(){
	$('.portfolio-gallery__slides').slick({
		'arrows': false
		// 'variableWidth': true,
		// 'centerMode': true,
		// 'mobileFirst': true
	});
});

// Initialize portfolio info slider
$(document).ready(function(){
	$('.portfolio-info__slides').slick({
		'arrows': false
	});
});

/// Handle image swapping and loading on portfolio item change

// Select all website screenshots 
var galleryImages = $('.portfolio-gallery__device-content');

$('.portfolio-info__slides').on('beforeChange', function() {
	galleryImages.css('opacity', 0);

	galleryImages.each(function(index) {
		var img = $(this);
		
		// Each "device" is labled with a two digit index
		var deviceNum = ('0' + index).slice(-2);

		img.attr('title', img.attr('data-title-' + deviceNum));
		img.attr('alt', img.attr('data-alt-' + deviceNum));
		img.attr('src', img.attr('data-src-' + deviceNum));
		img.attr('srcset', img.attr('data-srcset-' + deviceNum));
	});
});

$('.portfolio-info__slides').on('afterChange', function() {
	galleryImages.css('opacity', 1);
});