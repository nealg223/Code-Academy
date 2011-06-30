// Place your application-specific JavaScript functions and classes here
// This file is automatically included by javascript_include_tag :defaults
$(document).ready(function() {
	function filterPath(string) {
	  return string
	    .replace(/^\//,'')
	    .replace(/(index|default).[a-zA-Z]{3,4}$/,'')
	    .replace(/\/$/,'');
	  }
	  var locationPath = filterPath(location.pathname);
	  var scrollElem = scrollableElement('html', 'body');

	  $('a[href*=#]').each(function() {
	    var thisPath = filterPath(this.pathname) || locationPath;
	    if (  locationPath == thisPath
	    && (location.hostname == this.hostname || !this.hostname)
	    && this.hash.replace(/#/,'') ) {
	      var $target = $(this.hash), target = this.hash;
	      if (target) {
	        var targetOffset = $target.offset().top;
	        $(this).click(function(event) {
	          event.preventDefault();
	          $(scrollElem).animate({scrollTop: targetOffset}, 1000, function() {
	            location.hash = target;
	          });
	        });
	      }
	    }
	  });

	  // use the first element that is "scrollable"
	  function scrollableElement(els) {
	    for (var i = 0, argLength = arguments.length; i <argLength; i++) {
	      var el = arguments[i],
	          $scrollElement = $(el);
	      if ($scrollElement.scrollTop()> 0) {
	        return el;
	      } else {
	        $scrollElement.scrollTop(1);
	        var isScrollable = $scrollElement.scrollTop()> 0;
	        $scrollElement.scrollTop(0);
	        if (isScrollable) {
	          return el;
	        }
	      }
	    }
	    return [];
	  }

    function isScrolledIntoView(elem)
    {
        var docViewTop = $(window).scrollTop();
        var docViewBottom = docViewTop + $(window).height();

        var elemTop = $(elem).offset().top;
        var elemBottom = elemTop + $(elem).height();

        return ((elemBottom >= docViewTop) && (elemTop <= docViewBottom));
    }
    
    $(window).scroll(function () { 
          // $("span").css("display", "inline").fadeOut("slow");
		$('.nav_link').removeClass("current");
		if (isScrolledIntoView($('#home'))) {
			$('#first').addClass('current');
		} else if(isScrolledIntoView($('#what'))) {
			$('#second').addClass('current');
		} else if(isScrolledIntoView($('#why'))) {
			$('#third').addClass('current');
		} else if(isScrolledIntoView($('#chicago'))) {
			$('#fourth').addClass('current');
		} else if(isScrolledIntoView($('#who'))) {
			$('#fifth').addClass('current');
		} else if(isScrolledIntoView($('#	'))) {
			$('#sixth').addClass('current');
		} else if(isScrolledIntoView($('#contact'))) {
			$('#seventh').addClass('current');
		}
	});
    
});
	
	$(document).ready(function() {
		$("#cf_onclick").click(function() {
			$("#cf2 img.top").toggleClass("transparent");
		});
	});
	
	$(document).ready(function() {
		$("#choices-yes_onclick").click(function() {
			$("#choices-yes img.top").toggleClass("transparent");
		});
	});