/**
 * Created by Lillian on 2016/12/29.
 */
'use strict';

var Danmu = function ($obj) {
	this.constructor = Danmu;
	this.$box = $obj;
	this.unitBox = '.unitbox';
	this.unit = '.unit';

};

Danmu.prototype.init = function (data) {

	this.arrN = 0;
	this.listJson = data;
	this.hN = 1;
	this.heartSetting = {
		k: 10 + Math.random()*20,
		v: 30 + Math.random()*20,
		w: 2*Math.PI/(70 + Math.random()*10) // 欧米伽 周期T=2π/w，w= 2π/T
	};
	var This = this;

	// 循环
	if(this.listJson.length <= 0) { return false;}
	this.upBullet();
	this.bulletTimer = window.setInterval(function () {
		This.upBullet();
	}, 1500);

	this.$box.on('touchend click', this.unit, function(){
		var obj = $(this);
		// 伸缩效果
		obj.addClass('active');
		if(!obj.hasClass('on')){
			obj.addClass('on');
		}
		window.setTimeout(function () {
			obj.removeClass('active');
		}, 300);

		// 桃心轨迹
		This.moveHeart(this);
		return false;
	});

};

// 弹幕刷新
Danmu.prototype.upBullet = function () {
	var This = this;
	var maxN = 5+1; // 5条
	var marginT = 16;
	var op = ['0', '0.4', '0.7', '1', '1', '1'];
	var aBox = this.$box.find(this.unitBox);
	var l = aBox.length;
	if(l > maxN){ aBox.eq(0).remove();}
	var step = aBox[l-1] ? (aBox[l-1].clientHeight + marginT): 50;
	aBox.each(function(i){
		var obj = $(this);
		obj.show().attr('top',obj.attr('top') - step);
		var opp = op[i];
		if(l<maxN){ opp = op[i+(maxN-l)];}
		// else {var opp = op[i];}
		if(obj.find(This.unit).hasClass('on')){ opp = 0.4;}

		obj.attr('style','-webkit-transition: -webkit-transform 0.5s ease-in, opacity 0.5s ease; transition: transform 0.5s ease-in, opacity 0.5s ease;-webkit-transform:translate3d(0, '+obj.attr('top')+'px, 0); transform:translate3d(0, '+obj.attr('top')+'px, 0); opacity:'+ opp +';');
	});

	var curDanmu = this.listJson[this.arrN % this.listJson.length];
	// var tureText = this.listJson[this.arrN % this.listJson.length].text;
	var $unitBox = $('<section class="unitbox" top="0" style="-webkit-transform:translate3d(0, 0, 0); transform:translate3d(0, 0, 0); opacity: 0;">' +
		'<div class="unit" data-id="'+ curDanmu.keyId +'">' +
		'<img class="face" src="'+ curDanmu.headUrl +'" alt="">' +
		'<p class="text">'+ curDanmu.text + '</p>' +
		'</div></section>');
	this.$box.append($unitBox);

	this.arrN ++;
};

// 生成桃心
Danmu.prototype.moveHeart = function (obj) {
	var heart = $('<i class="heart"></i>');
	var This = this;

	heart.attr({
		left: parseFloat(obj.parentNode.offsetLeft),
		top: parseFloat(obj.parentNode.offsetTop + Number(obj.parentNode.getAttribute('top')))
	}).css({
		left: heart.attr('left') + 'px',
		top: heart.attr('top') + 'px'
	});
	this.$box.append(heart);
	heart.t0 = new Date().getTime();
	heart.top = Number(heart.attr('top')) + 10;

	if(this.hN == 1)
		this.hN = -1;
	else this.hN = 1;
	heart.dir = this.hN;

	heart.timer = window.setInterval(function () {
		var t1 = new Date().getTime();

		var x = (t1 - heart.t0)/1000 * This.heartSetting.v;
		if(x > heart.top) {
			clearInterval(heart.timer);
			heart.remove();
		}

		var y = heart.dir * This.heartSetting.k*Math.sin(This.heartSetting.w*x);

		heart.attr('style',
			'left:'+heart.attr('left')+'px; ' +
			'top:'+heart.attr('top')+'px; ' +
			'-webkit-transform:translate3d('+y+'px,-'+x+'px,0); ' +
			'transform:translate3d('+y+'px,-'+x+'px,0); ' +
			'opacity:'+parseFloat((heart.top-x)/heart.top)+';'
		);

	}, 100);
};

$(function () {
	// 拉取弹幕
	var data = {
		"list":[
			{
				"keyId": 88880,
				"text": "1留言留言留言<img class=\"emoji\" draggable=\"false\" alt=\"❤\" src=\"https://twemoji.maxcdn.com/2/72x72/2764.png\">留言留言留言",
				"praiseNum": 78,
				"headUrl": "images/img01.jpg"
			},
			{
				"keyId": 88881,
				"text": "2留言留言留言留言留言留言留言留言留言留言留言留言 😂",
				"praiseNum": 78,
				"headUrl": "images/img01.jpg"
			},
			{
				"keyId": 88882,
				"text": "3留言留言留言",
				"praiseNum": 78,
				"headUrl": "images/img01.jpg"
			},
			{
				"keyId": 88883,
				"text": "4留言留言留言😂😂😂😂",
				"praiseNum": 78,
				"headUrl": "images/img01.jpg"
			},
			{
				"keyId": 88884,
				"text": "5留言留言留言 ~\\(≧▽≦)/~啦啦啦",
				"praiseNum": 78,
				"headUrl": "images/img01.jpg"
			},
			{
				"keyId": 88884,
				"text": "6留言留言留言 ~\\(≧▽≦)/~啦啦啦",
				"praiseNum": 78,
				"headUrl": "images/img01.jpg"
			},
			{
				"keyId": 88884,
				"text": "7留言留言留言 ~\\(≧▽≦)/~啦啦啦",
				"praiseNum": 78,
				"headUrl": "images/img01.jpg"
			},
			{
				"keyId": 88884,
				"text": "8留言留言留言 ~\\(≧▽≦)/~啦啦啦",
				"praiseNum": 78,
				"headUrl": "images/img01.jpg"
			}
		]
	};

	// 弹幕
	var danmu1 = new Danmu( $('.danmu1') );
	danmu1.init(data.list);

	var danmu2 = new Danmu( $('.danmu2') );
	danmu2.init(data.list);

});

