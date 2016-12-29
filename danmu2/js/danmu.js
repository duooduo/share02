/**
 * Created by Lillian on 2016/12/29.
 */
'use strict';
var arrN = 0;
var listJson;
var bulletTimer = null;
var box = $('.p-bullet-box');
var hN = 1;

$(function () {
	// 拉取弹幕
	$.ajax({
		url: './js/data/list_data.json',
		type: 'POST',
		dataType: 'json',
		contentType: 'application/json;charset=UTF-8',
		success: function(d) {
			console.log(d);
			// 弹幕
			if (d.code == 0) {
				listJson = d.data.list;

				// 弹幕点击
				var hN = 1;
				$('.unit').live('touchend', function(){

					// 伸缩效果
					var obj = $(this);
					var unitId = this.dataset.id;
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

				// 弹幕
				if(listJson.length <= 0) { return false;}
				// box.step = 50;
				upBullet(box);
				bulletTimer = window.setInterval(function () {
					upBullet(box);
				}, 1500);

			}

		}
	});


});

// 弹幕刷新
function upBullet(box) {
	var maxN = 5+1; // 5条
	var marginT = 16;
	var op = ['0', '0.4', '0.7', '1', '1', '1'];
	var aBox = box.find('.unitbox');
	var l = aBox.length;
	if(l > maxN){ aBox.eq(0).remove();}
	var step = aBox[l-1] ? (aBox[l-1].clientHeight + marginT): 50;
	box.find('.unitbox').each(function(i){
		var obj = $(this);
		obj.show().attr('top',obj.attr('top') - step);
		if(l<maxN){ var opp = op[i+(maxN-l)];}
		else {var opp = op[i];}
		if($(this).find('.unit').hasClass('on')){ opp = 0.4;}

		obj.attr('style','-webkit-transition: -webkit-transform 0.5s ease-in, opacity 0.5s ease; transition: transform 0.5s ease-in, opacity 0.5s ease;-webkit-transform:translate3d(0, '+obj.attr('top')+'px, 0); transform:translate3d(0, '+obj.attr('top')+'px, 0); opacity:'+ opp +';');
	});
	var tureText = listJson[arrN%listJson.length].text;
	var $unit = $('<section class="unitbox" top="0" style="-webkit-transform:translate3d(0, 0, 0); transform:translate3d(0, 0, 0); opacity: 0;">' +
		'<div class="unit" data-id="'+ listJson[arrN%listJson.length].keyId +'">' +
		'<img class="face" src="'+ listJson[arrN%listJson.length].headUrl +'" alt="">' +
		'<p class="text">'+ tureText + '</p>' +
		'</div></section>');
	box.append($unit);
	arrN ++;
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
	heart.t0 = new Date().getTime();
	heart.top = Number(heart.attr('top')) + 10;

	if(hN == 1) hN = -1;
	else hN = 1;
	heart.dir = hN;
	heart.k = 10 + Math.random()*20; // 幅度 20
	heart.v = 30 + Math.random()*20; // 速度 20
	heart.w = 2*Math.PI/(70 + Math.random()*10); // 周期T=2π/w，w= 2π/T
	heart.timer = window.setInterval(function () {
		var t1 = new Date().getTime();
		var x = (t1 - heart.t0)/1000*heart.v;
		if(x > heart.top) {
			clearInterval(heart.timer);
			heart.remove();
		}
		var y = heart.dir * heart.k*Math.sin(heart.w*x);
		heart.attr('style','left:'+heart.attr('left')+'px; top:'+heart.attr('top')+'px; -webkit-transform:translate3d('+y+'px,-'+x+'px,0); transform:translate3d('+y+'px,-'+x+'px,0); opacity:'+parseFloat((heart.top-x)/heart.top)+';');
	}, 100);
}
