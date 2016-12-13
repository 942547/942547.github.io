$(function() {

	// Инициализация SF-MENU
	$(".sf-menu").superfish({
		delay: 200,
		speed: "fast",
		cssArrows: false
	})
	.after("<div id='mobile-menu'>").clone().appendTo("#mobile-menu");
	$("#mobile-menu").find("*").attr("style", "");
	$("#mobile-menu").children("menu").removeClass("sf-menu").removeClass("menu_theme")
	.parent().mmenu({
		counters: true,
		navbars: [
		{
			"position": "bottom",
			"content": [
			"<a class='fa fa-phone' aria-hidden='true' href='tel:+74722569991'></a>",
			// "<a class='fa fa-envelope' aria-hidden='true' href='mailto:info@trofey31.ru'></a>",
			"<a class='fa fa-vk' target='_blank' aria-hidden='true' href='https://vk.com/club40894945'></a>",
			]
		}
		],
		extensions : [ 'widescreen', 'theme-white', 'effect-menu-slide', 'pagedim-black' ],
		navbar: {
			title: "Меню"
		},
		dragOpen: true
	});

	$(".toggle-mnu").click(function() {
		$(this).toggleClass("on");
	});
	var api = $("#mobile-menu").data("mmenu");
	api.bind("closed", function () {
		$(".toggle-mnu").removeClass("on");
	});


	//initialize swiper when document ready  
	var mySwiper = new Swiper ('.swiper-container', {
		pagination: '.swiper-pagination',
		// nextButton: '.swiper-button-next',
		// prevButton: '.swiper-button-prev',
		paginationClickable: true,
		// spaceBetween: 50,
		centeredSlides: true,
		autoplay: 7000,
		loop: true,
		keyboardControl: true,
		autoplayDisableOnInteraction: false,
		// paginationType: 'progress',
	});

	// Плавная прокрутка
	$(".menu").on("click","a[href^='#']", function (event) {

		// исключаем стандартную реакцию браузера
		event.preventDefault();

		// получем идентификатор блока из атрибута href
		var id  = $(this).attr('href'),

		// находим высоту, на которой расположен блок
		top = $(id).offset().top-67;

		// анимируем переход к блоку, время: 800 мс
		$('body,html').animate({scrollTop: top}, 800);
	});

	
	// TO TOP BUTTON
	$("#back-top").hide();

	// fade in #back-top
	$(function () {
		$(window).scroll(function () {
			if ($(this).scrollTop() > 600) {
				$('#back-top').fadeIn();
			} else {
				$('#back-top').fadeOut();
			}
		});

		// scroll body to 0px on click
		$('#back-top a').click(function () {
			$('body,html').animate({scrollTop: 0}, 800);
			return false;
		});
	});

	// popup
	$('.popup-with-move-anim').magnificPopup({
		type: 'inline',

		fixedContentPos: false,
		fixedBgPos: true,

		overflowY: 'auto',

		closeBtnInside: true,
		preloader: false,
		
		midClick: true,
		removalDelay: 300,
		mainClass: 'my-mfp-slide-bottom'
	});

	// Выделение активного меню
	jQuery(window).scroll(function(){
		var $sections = $('.section, .header, .camp__section ');
		$sections.each(function(i,el){
			var top  = $(el).offset().top-100;
			var bottom = top +$(el).height();
			var scroll = $(window).scrollTop();
			var id = $(el).attr('id');
			if( scroll > top && scroll < bottom){
				$('li.active').removeClass('active').removeClass('sfHover');
				$('a[href="#'+id+'"]').parent('li').addClass('active');

			}
		})
	});

	// Isotope
		// init Isotope
		var $grid = $('.grid').isotope({
			itemSelector: '.item',
			layoutMode: 'fitRows',
			getSortData: {
				item__name: '.item__name',
				// symbol: '.symbol',
				item__price: '.item__price parseInt',
				category: '[data-category]',
				weight: function( itemElem ) {
					var weight = $( itemElem ).find('.weight').text();
					return parseFloat( weight.replace( /[\(\)]/g, '') );
				}
			}
		});

		// filter functions
		var filterFns = {/*
			// show if number is greater than 70
			numberGreaterThan70: function() {
				var item__price = $(this).find('.item__price').text();
				return parseInt( item__price, 10 ) > 70;
			},
			// show if item__name ends with -ium
			ium: function() {
				var item__name = $(this).find('.item__name').text();
				return item__name.match( /ium$/ );
			}
		*/};

		// bind filter button click
		$('.filters-button-group').on( 'click', 'button', function() {
			var filterValue = $( this ).attr('data-filter');
			// use filterFn if matches value
			filterValue = filterFns[ filterValue ] || filterValue;
			$grid.isotope({ filter: filterValue });
		});
		// change is-checked class on buttons
		$('.button-group').each( function( i, buttonGroup ) {
			var $buttonGroup = $( buttonGroup );
			$buttonGroup.on( 'click', 'button', function() {
				$buttonGroup.find('.is-checked').removeClass('is-checked');
				$( this ).addClass('is-checked');
			});
		});

	// bind sort button click
	$('.sort-by-button-group').on( 'click', 'button', function() {
		var sortValue = $(this).attr('data-sort-value');
		$grid.isotope({ sortBy: sortValue });
	});

	// change is-checked class on buttons
	$('.button-group').each( function( i, buttonGroup ) {
		var $buttonGroup = $( buttonGroup );
		$buttonGroup.on( 'click', 'button', function() {
			$buttonGroup.find('.is-checked').removeClass('is-checked');
			$( this ).addClass('is-checked');
		});
	});
	// The End Isotope



});