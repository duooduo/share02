/**
 * Created by Ly on 2016/3/29.
 */
// 'use strict';

define(['jquery'], function($){
	// constructor
	function Bullet(el, opts) {
		this.opts = $.extend({}, Bullet.defaults, opts);
		this.$el = $(el);

		// this.init();
		// this.born();
	}
	Bullet.defaults = {
		face : '',
		text : '弹幕~~弹幕~~弹幕~~'
	};
	Bullet.prototype.init = function () {
		console.log('init');
		
	};
	Bullet.prototype.born = function () {
		console.log('born');
	};

	// 插件写法
	$.fn.extend({
		bullet: function(opts){
			return this.each(function(){
				new Bullet(this, opts);
			});
		}
	});
	// return {Bullet: Bullet};
});