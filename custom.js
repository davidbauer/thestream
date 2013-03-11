$(document).ready(function() {
	
	// timeslider stuff
	var startTime;
	var endTime;
	$("#slider-range").slider({
		range: true, min: 0, max: 1440, values: [0, 430], step:5, slide: slideTime, change: checkMax
	});
	function slideTime(event, ui){
		var val0 = $("#slider-range").slider("values", 0),
			val1 = $("#slider-range").slider("values", 1),
			minutes0 = parseInt(val0 % 60, 10),
			hours0 = parseInt(val0 / 60 % 24, 10),
			minutes1 = parseInt(val1 % 60, 10),
			hours1 = parseInt(val1 / 60 % 24, 10);
			
		startTime = getTime(hours0, minutes0);
		endTime = getTime(hours1, minutes1);
		$("#timespan").text(startTime + ' - ' + endTime);
	}
	function getTime(hours, minutes) {
		var time = null;
		minutes = minutes + "";
		if (hours < 12) {
			time = "AM";
		}
		else {
			time = "PM";
		}
		
		if (minutes.length == 1) {
			minutes = "0" + minutes;
		}
		
		if (hours == 0 && minutes == 0) {return "now"}
		
		else {return hours + " hours, " + minutes + " minutes";}
	}
	function checkMax() {
		var size = $("#slider-range").slider("values", 1) - $("#slider-range").slider("values", 0);
		if( size >= 3000) {
			$("#slider-range div")
				.addClass("ui-state-error")
				.removeClass("ui-widget-header");
			$("#scheduleSubmit")
				.attr("disabled","disabled")
				.addClass("ui-state-disabled")
				.removeClass("ui-state-default");
			$("#SlideMax").text("Cannot be more than 24 hours");
		}
		else {	
			$("#slider-range div")
				.addClass("ui-widget-header")
				.removeClass("ui-state-error");
			$("#scheduleSubmit")
				.removeAttr("disabled")
				.addClass("ui-state-default")
				.removeClass("ui-state-disabled");
			$("#SlideMax").text("");
		}
	}

	$("#scheduleSubmit").on('click', function(){
		console.log(startTime);
		console.log(endTime);
		$('#Schedule tbody').append(startTime + '-' + endTime);
	});
	slideTime();
	
	// initiate popover explainers
	$('.explainer').popover();
	
	// show item controls on hover
	$('.meta').append('<span class="toolbar"></span>');
	$('a.item').hover(function(){
		$(this).children().children().next('.toolbar').html("<i class='icon-chevron-down'></i> Read on <i class='icon-star-empty'></i> Star <i class='icon-share'></i> Share <i class='icon-comment'></i> Comment <i class='icon-pencil'></i> Suggest edit").removeClass('hide');
	$(this).find('.icon-fullscreen').removeClass('hide');
	});
	
	$('a.item').mouseleave(function() {
		$(this).children().children().next('.toolbar').addClass('hide');
		$(this).find('.icon-fullscreen').addClass('hide');
		
	});
	
	// expand article	
	$('a.item').toggle(function(){
		$(this).children().removeClass('hide');
		$(this).find('.teaserimg').addClass('hide');
	}, function() {
		$('.fullarticle').addClass('hide');
		$(this).find('.teaserimg').removeClass('hide');
	});
	
	//reload stories
	$('.alert-success').on('click',function(){
		$('.item').removeClass('hide');
		$('.alert-success').addClass('hide');
		document.title = "The Stream";
	});
	
	// initiate slideshow
	
	
	//actions based on checkboxes (DOESN'T WORK YET)
	
	if($('#activitiesCheck').prop('checked')) {
		$('.activity').addClass('hide');
	};
		
	// show new items after 8 seconds for demo
	setTimeout(function(){
      $('.alert-success').removeClass('hide');
      document.title = "(2) The Stream";
    }, 8000);
    
    

	
    	
});
