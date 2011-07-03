$(window).load(function(){
	
	// We are listening to the window.load event, so we can be sure
	// that the images in the slideshow are loaded properly.


	// Testing wether the current browser supports the canvas element:
	var supportCanvas = 'getContext' in document.createElement('canvas');

	// The canvas manipulations of the images are CPU intensive,
	// this is why we are using setTimeout to make them asynchronous
	// and improve the responsiveness of the page.

	var slides = $('#slideshow li'),
		current = 0,
		slideshow = {width:0,height:0};

	setTimeout(function(){
		
		window.console && window.console.time && console.time('Generated In');
		
		if(supportCanvas){
			$('#slideshow img').each(function(){

				if(!slideshow.width){
					// Taking the dimensions of the first image:
					slideshow.width = this.width;
					slideshow.height = this.height;
				}
				
				// Rendering the modified versions of the images:
				createCanvasOverlay(this);
			});
		}
		
		window.console && window.console.timeEnd && console.timeEnd('Generated In');
		
		$('#slideshow .arrow').click(function(){
			var li			= slides.eq(current),
				canvas		= li.find('canvas'),
				nextIndex	= 0;

			// Depending on whether this is the next or previous
			// arrow, calculate the index of the next slide accordingly.
			
			if($(this).hasClass('next')){
				nextIndex = current >= slides.length-1 ? 0 : current+1;
			}
			else {
				nextIndex = current <= 0 ? slides.length-1 : current-1;
			}

			var next = slides.eq(nextIndex);
			
			if(supportCanvas){

				// This browser supports canvas, fade it into view:

				canvas.fadeIn(function(){
					
					// Show the next slide below the current one:
					next.show();
					current = nextIndex;
					
					// Fade the current slide out of view:
					li.fadeOut(function(){
						li.removeClass('slideActive');
						canvas.hide();
						next.addClass('slideActive');
					});
				});
			}
			else {
				
				// This browser does not support canvas.
				// Use the plain version of the slideshow.
				
				current=nextIndex;
				next.addClass('slideActive').show();
				li.removeClass('slideActive').hide();
			}
		});
		
	},100);

	// This function takes an image and renders
	// a version of it similar to the Overlay blending
	// mode in Photoshop.
	
	function createCanvasOverlay(image){

		var canvas			= document.createElement('canvas'),
			canvasContext	= canvas.getContext("2d");
		
		// Make it the same size as the image
		canvas.width = slideshow.width;
		canvas.height = slideshow.height;
		
		// Drawing the default version of the image on the canvas:
		canvasContext.drawImage(image,0,0);
		

		// Taking the image data and storing it in the imageData array:
		var imageData	= canvasContext.getImageData(0,0,canvas.width,canvas.height),
			data		= imageData.data;
		
		// Loop through all the pixels in the imageData array, and modify
		// the red, green, and blue color values.
		
		for(var i = 0,z=data.length;i<z;i++){
			
			// The values for red, green and blue are consecutive elements
			// in the imageData array. We modify the three of them at once:
			
			data[i] = ((data[i] < 128) ? (2*data[i]*data[i] / 255) : (255 - 2 * (255 - data[i]) * (255 - data[i]) / 255));
			data[++i] = ((data[i] < 128) ? (2*data[i]*data[i] / 255) : (255 - 2 * (255 - data[i]) * (255 - data[i]) / 255));
			data[++i] = ((data[i] < 128) ? (2*data[i]*data[i] / 255) : (255 - 2 * (255 - data[i]) * (255 - data[i]) / 255));
			
			// After the RGB elements is the alpha value, but we leave it the same.
			++i;
		}
		
		// Putting the modified imageData back to the canvas.
		canvasContext.putImageData(imageData,0,0);
		
		// Inserting the canvas in the DOM, before the image:
		image.parentNode.insertBefore(canvas,image);
	}
	
	
	/* Replacing all the paragraphs */
	$('.slideout p').replaceWith(function(){
	
		/* The style, class and title attributes of the p are copied to the slideout: */
		
		return '\
		<div class="slideOutTip '+$(this).attr('class')+'" style="'+$(this).attr('style')+'">\
			\
			<div class="tipVisible">\
				<div class="tipIcon"><div class="plusIcon"></div></div>\
				<p class="tipTitle">'+$(this).attr('title')+'</p>\
			</div>\
			\
			<div class="slideOutContent">\
				<p>'+$(this).html()+'</p>\
			</div>\
		</div>';
	});

	$('.slideOutTip').each(function(){

		/*
			Implicitly defining the width of the slideouts according to the width of its title,
			because IE fails to calculate it on its own.
		*/
		
		$(this).width(40+$(this).find('.tipTitle').width());
	});
	
	/* Listening for the click event: */
	
	$('.tipVisible').bind('click',function(){
		var tip = $(this).parent();
		
		/* If a open/close animation is in progress, exit the function */
		if(tip.is(':animated'))
			return false;

		if(tip.find('.slideOutContent').css('display') == 'none')
		{
			tip.trigger('slideOut');
		}
		else tip.trigger('slideIn');

	});
	
	$('.slideOutTip').bind('slideOut',function(){

		var tip = $(this);
		var slideOut = tip.find('.slideOutContent');
		
		/* Closing all currently open slideouts: */
		$('.slideOutTip.isOpened').trigger('slideIn');
		
		/* Executed only the first time the slideout is clicked: */
		if(!tip.data('dataIsSet'))
		{
			tip	.data('origWidth',tip.width())
				.data('origHeight',tip.height())
				.data('dataIsSet',true);
			
			if(tip.hasClass('openTop'))
			{
				/*
					If this slideout opens to the top, instead of the bottom,
					calculate the distance to the bottom and fix the slideout to it.
				*/
				
				tip.css({
					bottom	: tip.parent().height()-(tip.position().top+tip.outerHeight()),
					top		: 'auto'
				});
				
				/* Fixing the title to the bottom of the slideout, so it is not slid to the top on open: */
				tip.find('.tipVisible').css({position:'absolute',bottom:3});
				
				/* Moving the content above the title, so it can slide open to the top: */
				tip.find('.slideOutContent').remove().prependTo(tip);
			}
			
			if(tip.hasClass('openLeft'))
			{
				/*
					If this slideout opens to the left, instead of right, fix it to the
					right so the left edge can expand without moving the entire div:
				*/
				tip.css({
					right	: Math.abs(tip.parent().outerWidth()-(tip.position().left+tip.outerWidth())),
					left	: 'auto'
				});
				
				tip.find('.tipVisible').css({position:'absolute',right:3});
			}
		}
		
		/* Resize the slideout to fit the content, which is then faded into view: */
		
		tip.addClass('isOpened').animate({
			width	: Math.max(slideOut.outerWidth(),tip.data('origWidth')),
			height	: slideOut.outerHeight()+tip.data('origHeight')
		},function(){
			slideOut.fadeIn();
		});

	}).bind('slideIn',function(){
		var tip = $(this);

		/* Hide the content and restore the original size of the slideout: */
		
		tip.find('.slideOutContent').fadeOut('fast',function(){
			tip.animate({
				width	: tip.data('origWidth'),
				height	: tip.data('origHeight')
			},function(){
				tip.removeClass('isOpened');
			});
		});

	});
});
