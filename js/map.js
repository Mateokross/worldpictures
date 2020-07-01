/* ==========================================================================
	JQVMaps
	========================================================================== */
//countries visited and photographed
var photographed = {
	"us": "yellow",
	"mx": "yellow",
	"ar": "yellow",
	"pt": "yellow",

	"gb": "yellow",
	"fr": "yellow",
	"it": "yellow",
	"be": "yellow",
	"nl": "yellow",
	"de": "yellow",
	"hu": "yellow",
	"at": "yellow",
	"cz": "yellow",
	"ma": "yellow"
};
var visited = {
	"bs": "grey",
	"br": "grey",
	"cl": "grey",
	"uy": "grey",
	"sk": "grey",
	"es": "grey",
	"jm": "grey",
	"ht": "grey"
};

jQuery('#vmap').vectorMap({
	map: 'world_en',
	backgroundColor: '#050505',
	borderColor: '#131313',
	borderOpacity: 0.25,
	borderWidth: 0.1,
	color: '#303030', //not visited ccountries
	colors: Object.assign({}, photographed, visited), //joins both visited and photographed
	enableZoom: true,
	hoverColor: '#b0b0b0', //hover
	selectedColor: '', //removes color when clicked
	enableZoom: true, //enables zooming
	multiSelectRegion: false, //disables multiple selection
	showTooltip: false, //disable tootltip
	zoomOnScroll: true,
	onRegionClick: function (element, code, region) {
		if (code in photographed) { //check if country is in visited
			region = region.toLowerCase().split(' ').join('-');
			togglePictures(region);
		}

	}
});


/* ==========================================================================
	Toggle pictures
	========================================================================== */
//toggles the pictures
function togglePictures(region) {

	//togle map and legend
	$("#vmap").fadeToggle();
	$("#legend").fadeToggle();
	$("main").toggleClass('map');
	//toggle picture container
	$("#pictures").fadeToggle();
	//toggle pictures
	window.region = region; //save region
	region = '.' + region; //turn region string into a class
	console.log(region);
	$(region).fadeToggle(); //toggle the elements from the region selected
};
//exit on click
$('#pictures').click(function (evt) {
	if (evt.target.nodeName == 'IMG' || evt.target.nodeName == 'P' || evt.target.id == 'materialbox-overlay') { //only exit when clicking outside
		return;
	} else {
		togglePictures(window.region)
	}
});

/* ==========================================================================
	Enables scroll zoom
	========================================================================== */

var scroll_zoom = new ScrollZoom($('.slide'), 4, 0.5);

function ScrollZoom(container, max_scale, factor) {
	var target = container.children().first()
	var scale = 1
	target.css('transform-origin', '0 0')
	target.on("mousewheel DOMMouseScroll", scrolled)

	function scrolled(e) {
		e.preventDefault();
		var delta = e.delta || e.originalEvent.wheelDelta;
		if (delta === undefined) {
			//we are on firefox
			delta = e.originalEvent.detail;
		}
		delta = Math.max(-1, Math.min(1, delta)) // cap the delta to [-1,1] for cross browser consistency
		// apply zoom
		scale += delta * factor * scale
		scale = Math.max(1, Math.min(max_scale, scale))
		if (scale > 1) {
			jQuery('#vmap').vectorMap('zoomIn');
		} else {
			jQuery('#vmap').vectorMap('zoomOut');
		}
	}

}


/* ==========================================================================
	Mobile settings
	========================================================================== */
if ($(window).width() < 820) {
	const pos = {
		"scale": 1.2,
		'x': 0,
		'y': 0
	};
	jQuery('#vmap').vectorMap('positionMap', pos);
}
if ($(window).width() < 600) {
	const pos = {
		"scale": 0.8557473684210525,
		'x': -90.4,
		'y': 77.3
	};
	jQuery('#vmap').vectorMap('positionMap', pos);
}