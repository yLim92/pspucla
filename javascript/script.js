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
	if (window.location.pathname.indexOf('rush') != -1)
		$('body').addClass('ye-olde-psp');
		$('html').css('-webkit-filter','grayscale(25%)')
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
	
	var lightbox = function(l) {
	
	};
	lightbox.prototype = {
	
	};
	$('.lightbox-content').each(function() {
		new lightbox(this);
	});
	
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