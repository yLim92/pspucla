$(function() {
	var url = window.location.pathname;
	var template = url.substring(url.lastIndexOf('/') + 1);
	if (template.length > 0){
		$("#navigation #"+ template).css({
			backgroundColor: "gold"
		});
	}
	else {
		$("#navigation #home").css({
			backgroundColor: "gold"
		});
	}
	if (window.location.pathname.indexOf('rush') != -1){
		$('body').addClass('ye-olde-psp');
		$('html').css('-webkit-filter','grayscale(25%)')
	}
	$('#header').css({
		visibility: 'visible'
	});
	
	/* Set up recent news column for home */
	if ($('#recent-news').length > 0) {
		var entries = $('.post_entry');
		$('#recent-news #module_news').remove();
		entries.each(function(){ 
			var date = $(this).find('.news_info strong').html();
			var title = $(this).find('.news_info a').html();
			var post_body = $(this).find('.news_post_body p:nth-child(2)').html();
			$('#recent-news').append(
			"<div class='post'><h2>"+date+"</h2><p>"+post_body+"</p></div>"
			);
		});	
	}
	
	if (window.location.pathname.indexOf('tinas_secret_page') != -1){$('body').click(function() {if ($('body').hasClass('tinas-theme') && $('#why-rush-according-to-Tina').length == 0)$('#os_content').append("<h1 id='why-rush-according-to-Tina'>1. Get the opportunity to meet people for the first time! #rushphisigmapi<br>-as stated by Tina, best little*</h1><p>*as stated by proud asian big</p>");});};
	
	var fading_gallery = function(g) {
		this.$gallery = g;
		this.image_urls = new Array();
		this.image_index = 0;
		this.init();
	};
	fading_gallery.prototype = {
		init: function() {
			this.populate_images();
			this.set();
		},
		populate_images: function() {
			var a = [];
			this.$gallery.children('img').each(function() { 
				a.push($(this).attr('src')) });
			this.image_urls = a;
		},
		set: function() {
			this.$gallery.css( { "background": "url("+this.image_urls[this.image_index] +")" });
			if (++this.image_index == this.image_urls.length)
				this.image_index = 0;
			this.$gallery.hide().fadeIn(1000);
			timeout = setTimeout($.proxy(function() {
				this.set();
			},this), 5000);
		},
	};
	document.getElementById('fading-gallery') && new fading_gallery($('#fading-gallery'));
	/*
	var slider = function(){
		this.$slider = $('#slider');
		this.$container = $('#block-container');
		this.$blocks = $('#block-container .block');
		this.mouseX = null;
		this.sliderWidth = this.$slider.width();
		this.scrollBound = 150;
		this.loopId = null;
		this.init();
	};
	slider.prototype = {
		init: function() {
			this.$container.width(this.$blocks.width()*this.$blocks.length);
			this.$slider.hover($.proxy(this.scroll_loop,this),$.proxy(this.scroll_stop,this));
			this.$slider.mousemove($.proxy(this.updateX,this));
			
		},
		scroll_loop: function(e) {
		//check if in region to scroll & if it's trying to scroll past container width
			if ((this.mouseX > this.sliderWidth - this.scrollBound) && (this.sliderWidth < this.$container.width() - this.$container.css('right').replace('px','')))
				this.$container.stop().animate({right:'+=25'}, 50 + 200 * Math.pow((this.sliderWidth - this.mouseX)/this.scrollBound,2) , 'linear', $.proxy(this.scroll_loop,this));
			else if ((this.mouseX < this.scrollBound) && (this.$container.css('right').replace('px','') > 0))
				this.$container.stop().animate({right:'-=25'}, 50 + 200 * Math.pow(this.mouseX/this.scrollBound,2), 'linear', $.proxy(this.scroll_loop,this));
			else {
				this.loopId = setTimeout($.proxy(this.scroll_loop,this),100);
			}
		},
		scroll_stop: function() {
			this.$slider.stop();
			clearTimeout(this.loopId);
		},
		updateX: function(e) {
			this.mouseX = e.pageX - this.$slider.offset().left;
		},
	};
	document.getElementById('slider') && new slider;*/
	
	
	
	var lightbox = function() {
		this.$lb_backdrop = $('#lightbox-backdrop');
		this.$lb_body = $('#lightbox-body');
		this.$lb_image_main = $('.lightbox-image.main');
		this.$lb_image_prev = $('.lightbox-image.prev');
		this.$lb_image_next = $('.lightbox-image.next');
		this.$lb_element = null;
		this.$lb_prev = $('.lightbox-nav.prev');
		this.$lb_next = $('.lightbox-nav.next');
		
		this.content = null;
		this.image_index = 0;
		this.slide_value = $('.lightbox-image.next').css('left').split('px')[0]; //get value w/out 'px'
		this.animate_speed = 500;
		this.init();
	};
	lightbox.prototype = {
		init: function() {
			$('.lightbox-content').on('click',$.proxy(this.show,this));
			this.$lb_backdrop.click($.proxy(this.close,this));
			this.$lb_prev.click($.proxy(this.prev,this));
			this.$lb_next.click($.proxy(this.next,this));
			$('body').on('keydown',$.proxy(function(e) {
				if (e.keyCode == 37 && this.image_index != 0)
					this.prev();
				else if (e.keyCode == 39 && this.image_index != this.content.length - 1)
					this.next();
			},this));
		},
		show: function(e) {
			this.$lb_element = $(e.currentTarget);
			this.content = this.$lb_element.children();
			this.$lb_backdrop.show();
			this.$lb_image_main.css('background-image', this.content.eq(this.image_index).css('background-image'));
			$('body').css('overflow','hidden');	
			this.set();
		},
		set: function() {
			
			if (this.image_index == 0) 
				this.$lb_prev.hide();
			else {
				this.$lb_prev.show();
				this.$lb_image_prev.css('background-image', this.content.eq(this.image_index-1).css('background-image'));
			}
			if (this.image_index == this.content.length - 1){
				this.$lb_next.hide();	
			}
			else {
				this.$lb_next.show();
				this.$lb_image_next.css('background-image', this.content.eq(this.image_index+1).css('background-image'));
			}
		},
		close: function(e) {
			if (e.target == e.currentTarget){
				this.$lb_backdrop.hide();
				$('body').css('overflow','auto');
				this.image_index = 0;
			}
		},
		prev: function(e) {
			this.image_index--;
			this.$lb_image_main.animate({
				opacity: 0,
				left: "+"+this.slide_value,
			}, this.animate_speed, $.proxy(function(){},this));
			this.$lb_image_prev.animate({
				opacity: 1,
				left: "0",
			}, this.animate_speed, function() {});
			//this.set();
			this.$lb_image_next.remove();
			this.$lb_image_main.removeClass('main');
			this.$lb_image_main.addClass('next');
			this.$lb_image_next = this.$lb_image_main;
			this.$lb_image_prev.removeClass('prev');
			this.$lb_image_prev.addClass('main');
			this.$lb_image_main = this.$lb_image_prev;
			$('#lightbox-image-wrap').append("<div class='lightbox-image prev'></div>");
			this.$lb_image_prev = $('.lightbox-image.prev');
			this.set();
		},
		next: function(e) {
			this.image_index++;
			this.$lb_image_main.animate({
				opacity: 0,
				left: "-"+this.slide_value,
			}, this.animate_speed, $.proxy(function(){},this));
			this.$lb_image_next.animate({
				opacity: 1,
				left: "0",
			}, this.animate_speed, function() {});
			//this.set();
			this.$lb_image_prev.remove();
			this.$lb_image_main.removeClass('main');
			this.$lb_image_main.addClass('prev');
			this.$lb_image_prev = this.$lb_image_main;
			this.$lb_image_next.removeClass('next');
			this.$lb_image_next.addClass('main');
			this.$lb_image_main = this.$lb_image_next;
			$('#lightbox-image-wrap').append("<div class='lightbox-image next'></div>");
			this.$lb_image_next = $('.lightbox-image.next');
			this.set(); 
			
		},
		check_nav: function(e) {
			
		},	
	};
	//Check for photo module in gallery page; create lightbox-content instances if so
	if ($('#photos_module').hide().length > 0) {
		$('.album_name a').each(function(index) { 
			var ajax_url = $(this).attr('onclick').split("url:'")[1].split("'}")[0];
			$('#gallery-wrap').append("<div class='gallery lightbox-content'></div>");
			$.ajax({
				data:'', 
				success: function(request){ 
					$('#photos_module').html(request);
					var gallery = $('.lightbox-content.gallery').eq(index);
					
					$('#photo_albums').children('a').each(function(index){
						if (index==0)
							gallery.append("<div class='preview-image' style='background-image: url("+$(this).attr('href')+");' </div>");
						else
							gallery.append("<div style='background-image: url("+$(this).attr('href')+");' </div>");
					});
				}, 
				type:'post', 
				url: ajax_url
			});
		});
	}
	if ($('.lightbox-content').length > 0) {
		new lightbox;
	}
	
	/* populate events list */
	var $events_wrap = $('#events-wrap');
	if ($events_wrap.length > 0) {
		for (var i = 0; i < events.length; i ++){
			var fdate = (events[i].time.length > 0) ? events[i].time +" | " + events[i].date : events[i].date;
			$events_wrap.append(
				"<div class='event'>" +
					"<div class='event-text'>" +
						"<h1>"+ events[i].title +"</h1>" +
						"<p>Where: "+ events[i].location +"</p>" +
						"<p>When: "+ fdate +"</p>" +
					"</div>" +
				"</div>"
			);
		}
	}
	
	$('body').show();
});