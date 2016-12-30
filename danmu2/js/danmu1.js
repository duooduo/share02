'use strict';

var box = $('.p-bullet-box');
var listJson;
var arrN = 0;

$(function () {
	// 拉取弹幕
	$.ajax({
		url: './js/data/list_data.json',
		type: 'POST',
		dataType: 'json',
		contentType: 'application/json;charset=UTF-8',
		success: function(d) {
			console.log(d);
			if( d.code ==0 ){
				listJson = d.data.list;

				if(listJson.length <=0 ){ return false;}
				upbullet();
				var bulletTimer = window.setInterval(function () {
					upbullet();
				}, 1500);
				
				
				// 点击
				$('.p-bullet-box').on('touchend','.unit',function () {
					var obj = $(this);
					obj.addClass('active');
					if(!obj.hasClass('on')){
						obj.addClass('on');
						// 点赞调取后台接口
					}
					window.setTimeout(function () {
						obj.removeClass('active');
					}, 300);

					// 桃心轨迹
					moveHeart(this);
					return false;
				});
			}
		}
	});
});


function upbullet(){
	var maxN = 5+1; // 5条
	var marginT = 16;
	var op = ['0', '0.4', '0.7', '1', '1', '1'];

	var aBox = $('.unitbox');
	var l = aBox.length;

	if(l > maxN){ aBox.eq(0).remove();}

	var step;
	if(aBox[l-1]) {
		step = aBox[l-1].clientHeight + marginT;
	} else {
		step = 50;
	}

	// 现有弹幕
	aBox.each(function (i) {
		var obj = $(this);
		obj.attr('top', obj.attr('top') - step);

		var opp;
		if(l<maxN) {
			opp = op[i+(maxN-l)];
		} else {
			opp = op[i];
		}
		if($(this).find('.unit').hasClass('on')){ opp = 0.4;}

		obj.attr('style',
			'-webkit-transition: -webkit-transform 0.5s ease-in, opacity 0.5s ease; ' +
			'transition: transform 0.5s ease-in, opacity 0.5s ease;' +
			'-webkit-transform:translate3d(0, '+obj.attr('top')+'px, 0); ' +
			'transform:translate3d(0, '+obj.attr('top')+'px, 0); ' +
			'opacity:'+ opp +';'
		);

	});


	// 生成
	var cur = listJson[arrN%listJson.length];
	var curImg = cur.headUrl;
	var curText = cur.text;

	var $unit = $('<section class="unitbox" top="0" style="-webkit-transform:translate3d(0, 0, 0); transform:translate3d(0, 0, 0); opacity: 1;"><div class="unit"><img class="face" src="'+curImg+'" alt=""><p class="text">'+curText+'</p></div> </section>');

	box.append($unit);
	arrN++;


}

// 生成桃心
function moveHeart(obj) {
	var heart = $('<i class="heart"></i>');

	heart.attr({
		left: parseFloat(obj.parentNode.offsetLeft),
		top: parseFloat(obj.parentNode.offsetTop + Number(obj.parentNode.getAttribute('top')))
	}).css({
		left: heart.attr('left') + 'px',
		top: heart.attr('top') + 'px'
	});
	box.append(heart);
}
