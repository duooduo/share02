/**
 * Created by Ly on 2016/3/29.
 */
'use strict';
requirejs.config({
	paths:{
		jquery: 'jquery-1.11.3.min'
		// zepto:  'zepto.min'
	}
});

requirejs(['jquery', 'bullet'],function($, bullet){

	// $('.ruby').bullet({
	// 	face : '',
	// 	text : '弹幕~~弹幕~~弹幕~~'
	// });

	$(function () {
		Log('start');
		var box = $('.bullet-box');
		box.find('section').each(function(i){
			this.top = 0;
			$(this).attr('style','transform:translate3d(0, '+this.top+'px, 0);');
		});
		window.setInterval(function () {

			box.find('.unit').each(function(){
				$(this).attr('top',$(this).attr('top') - 50);
				if($(this).attr('top') <= -340) {
					this.remove();
				}
				$(this).attr('style','-webkit-transform:translate3d(0, '+$(this).attr('top')+'px, 0);');
			});

			var $unit = $('<section class="unit" top="-50" style="-webkit-transform:translate3d(0, 30%, 0);">' +
				'<img class="face" src="img/1.jpg" alt="">' +
				'<p class="text">new</p>' +
				'</section>');

			box.append($unit);
		}, 2000);
	});
});

function Log(str) {
	$('.log-box').append('<li>'+ str +'</li>')
}