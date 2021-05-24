
@@include('forms.js');
@@include('slick.min.js');
var isMobile = { Android: function () { return navigator.userAgent.match(/Android/i); }, BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); }, iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); }, Opera: function () { return navigator.userAgent.match(/Opera Mini/i); }, Windows: function () { return navigator.userAgent.match(/IEMobile/i); }, any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); } };
if (isMobile.any()) { }
$(function () {
	if (location.hash) {
		var hsh = location.hash.replace('#', '');
		if ($('.popup-' + hsh).length > 0) {
			popupOpen(hsh);
		} else if ($('div.' + hsh).length > 0) {
			$('body,html').animate({ scrollTop: $('div.' + hsh).offset().top, }, 500, function () { });
		}
	}
	window.onload = function () {
		document.body.classList.add('loaded_hiding');
		window.setTimeout(function () {
			document.body.classList.add('loaded');
			document.body.classList.remove('loaded_hiding');
		}, 500);
	}
	$('.wrapper').addClass('loaded');
	$('.main-slider').slick({
		autoplay: true,
		autoplaySpeed: 10000,
		arrows: false,
		dots: false,
		infinite: true,
	})
	

	// $('.main-slider__item.slick-current').addClass('active');
	let sqx = $('.main-slider__item')
	$('.main-slider__item.slick-current').addClass('active')
	$('.main-slider').on('afterChange', function (event, slick, currentSlide, nextSlide) {
		$(sqx).removeClass('active')
		$(sqx[currentSlide + 1]).addClass('active')
	});

	$('.bg-road,.bg-road1').addClass('active')
	// $(document).ready(function () {
	// 	var $element = $('.section-main');
	// 	let counter = 0;
	// 	$(window).scroll(function () {
	// 		var scroll = $(window).scrollTop() + $(window).height();
	// 		//Если скролл до конца елемента
	// 		var offset = $element.offset().top + $element.height();
	// 		//Если скролл до начала елемента
	// 		//  var offset = $element.offset().top

	// 		if (scroll > offset && counter == 0) {
	// 			$('.bg-road,.bg-road1').addClass('active')
	// 		}
	// 	});
	// });
	$('.about-partners__inner').slick({
		arrows: false,
		infinite: true,
		slidesToShow: 3,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 7000,
	})


	$('.item-tab__title').on('click', function () {
		$('.item-tab__text').removeClass('active')
		$(this).siblings().addClass('active');
		$('.item-tab__text').not('.item-tab__text.active').slideUp();
		$('.item-tab').removeClass('active')
		$(this).parent().addClass('active')
		$(this).siblings().slideDown();
	})

	var act = "click";
	if (isMobile.iOS()) {
		var act = "touchstart";
	}

	// let iconMenu = document.querySelector(".icon-menu");
	// // let body = document.querySelector("body");
	// // let menuBody = document.querySelector(".menu__body");
	// if (iconMenu) {
	// 	iconMenu.addEventListener("click", function () {
	// 		iconMenu.classList.toggle("active");
	// 		// body.classList.toggle("lock");
	// 		// menuBody.classList.toggle("active");
	// 	});
	// }

	//ZOOM
	if ($('.gallery').length > 0) {
		baguetteBox.run('.gallery', {
			// Custom options
		});
	}
	/*
	CLOUD-ZOOM
	<a rel="position:'right',adjustX:25,adjustY:0,Width: 432" href="img/product/zoom.jpg" class="cloud-zoom product-main-mainimage__item">
		<img class="cloudzoom-gallery" src="img/product/zoom.jpg" alt="" />
	</a>
	*/


	//POPUP
	$('.pl').click(function (event) {
		var pl = $(this).attr('href').replace('#', '');
		var v = $(this).data('vid');
		popupOpen(pl, v);
		return false;
	});
	function popupOpen(pl, v) {
		$('.popup').removeClass('active').hide();
		if (!$('.menu__body').hasClass('active')) {
			//$('body').data('scroll',$(window).scrollTop());
		}
		// if (!isMobile.any()) {
		// 	$('body').css({ paddingRight: $(window).outerWidth() - $('.wrapper').outerWidth() }).addClass('lock');
		// 	$('.pdb').css({ paddingRight: $(window).outerWidth() - $('.wrapper').outerWidth() });
		// } else {
		// 	setTimeout(function () {
		// 		$('body').addClass('lock');
		// 	}, 300);
		// }
		history.pushState('', '', '#' + pl);
		if (v != '' && v != null) {
			$('.popup-' + pl + ' .popup-video__value').html('<iframe src="https://www.youtube.com/embed/' + v + '?autoplay=1"  allow="autoplay; encrypted-media" allowfullscreen></iframe>');
		}
		$('.popup-' + pl).fadeIn(300).delay(300).addClass('active');

		if ($('.popup-' + pl).find('.slick-slider').length > 0) {
			$('.popup-' + pl).find('.slick-slider').slick('setPosition');
		}
	}
	function openPopupById(popup_id) {
		$('#' + popup_id).fadeIn(300).delay(300).addClass('active');
	}
	function popupClose() {
		$('.popup').removeClass('active').fadeOut(300);
		if (!$('.menu__body').hasClass('active')) {
			if (!isMobile.any()) {
				setTimeout(function () {
					$('body').css({ paddingRight: 0 });
					$('.pdb').css({ paddingRight: 0 });
				}, 200);
				setTimeout(function () {
					$('body').removeClass('lock');
					//$('body,html').scrollTop(parseInt($('body').data('scroll')));
				}, 200);
			} else {
				$('body').removeClass('lock');
				//$('body,html').scrollTop(parseInt($('body').data('scroll')));
			}
		}
		$('.popup-video__value').html('');

		history.pushState('', '', window.location.href.split('#')[0]);
	}
	$('.popup-close,.popup__close').click(function (event) {
		popupClose();
		return false;
	});
	$('.popup').click(function (e) {
		if (!$(e.target).is(".popup>.popup-table>.cell *") || $(e.target).is(".popup-close") || $(e.target).is(".popup__close")) {
			popupClose();
			return false;
		}
	});
	$(document).on('keydown', function (e) {
		if (e.which == 27) {
			popupClose();
		}
	});

	$('.goto').click(function () {
		var el = $(this).attr('href').replace('#', '');
		var offset = 0;
		$('body,html').animate({ scrollTop: $('.' + el).offset().top + offset }, 500, function () { });

		if ($('.menu__body').hasClass('active')) {
			$('.menu__body,.icon-menu').removeClass('active');
			$('body').removeClass('lock');
		}
		return false;
	});


	// function ibg() {
	// 	if (isIE()) {
	// 		let ibg = document.querySelectorAll(".ibg");
	// 		for (var i = 0; i < ibg.length; i++) {
	// 			if (ibg[i].querySelector('img') && ibg[i].querySelector('img').getAttribute('src') != null) {
	// 				ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
	// 			}
	// 		}
	// 	}
	// }
	// ibg();


	//Клик вне области
	$(document).on('click touchstart', function (e) {
		if (!$(e.target).is(".select *")) {
			$('.select').removeClass('active');
		};
	});

	//UP
	$(window).scroll(function () {
		var w = $(window).width();
		if ($(window).scrollTop() > 50) {
			$('#up').fadeIn(300);
		} else {
			$('#up').fadeOut(300);
		}
	});
	$('#up').click(function (event) {
		$('body,html').animate({ scrollTop: 0 }, 300);
	});

	// $('body').on('click', '.services-inner__box-list li', function (event) {
	// 	$('.services-inner__box-list li').removeClass('active')
	// 	$('.text-services__box').removeClass('active')
	// 	$(this).addClass('active')

	// 	a = $(this).attr("data")
	// 	$("#" + a).addClass('active')
	// })



	// $('body').on('click', '.tab__navitem', function (event) {
	// 	var eq = $(this).index();
	// 	if ($(this).hasClass('parent')) {
	// 		var eq = $(this).parent().index();
	// 	}
	// 	if (!$(this).hasClass('active')) {
	// 		$(this).closest('.tabs').find('.tab__navitem').removeClass('active');
	// 		$(this).addClass('active');
	// 		$(this).closest('.tabs').find('.tab__item').removeClass('active').eq(eq).addClass('active');
	// 		if ($(this).closest('.tabs').find('.slick-slider').length > 0) {
	// 			$(this).closest('.tabs').find('.slick-slider').slick('setPosition');
	// 		}
	// 	}
	// });
	// $.each($('.spoller.active'), function (index, val) {
	// 	$(this).next().show();
	// });
	// $('body').on('click', '.spoller', function (event) {
	// 	if ($(this).hasClass('mob') && !isMobile.any()) {
	// 		return false;
	// 	}

	// 	if ($(this).parents('.one').length > 0) {
	// 		$(this).parents('.one').find('.spoller').not($(this)).removeClass('active').next().slideUp(300);
	// 		$(this).parents('.one').find('.spoller').not($(this)).parent().removeClass('active');
	// 	}

	// 	if ($(this).hasClass('closeall') && !$(this).hasClass('active')) {
	// 		$.each($(this).closest('.spollers').find('.spoller'), function (index, val) {
	// 			$(this).removeClass('active');
	// 			$(this).next().slideUp(300);
	// 		});
	// 	}
	// 	$(this).toggleClass('active').next().slideToggle(300, function (index, val) {
	// 		if ($(this).parent().find('.slick-slider').length > 0) {
	// 			$(this).parent().find('.slick-slider').slick('setPosition');
	// 		}
	// 	});
	// 	return false;
	// });



	function scrolloptions() {
		var scs = 100;
		var mss = 50;
		var bns = false;
		if (isMobile.any()) {
			scs = 10;
			mss = 1;
			bns = true;
		}
		var opt = {
			cursorcolor: "#fff",
			cursorwidth: "4px",
			background: "",
			autohidemode: true,
			cursoropacitymax: 0.4,
			bouncescroll: bns,
			cursorborderradius: "0px",
			scrollspeed: scs,
			mousescrollstep: mss,
			directionlockdeadzone: 0,
			cursorborder: "0px solid #fff",
		};
		return opt;
	}
	function scroll() {
		$('.scroll-body').niceScroll('.scroll-list', scrolloptions());
	}
	if (navigator.appVersion.indexOf("Mac") != -1) {
	} else {
		if ($('.scroll-body').length > 0) { scroll(); }
	}


	// function scrollwhouse() {
	// 	var scs = 100;
	// 	var mss = 50;
	// 	var bns = false;
	// 	if (isMobile.any()) {
	// 		scs = 10;
	// 		mss = 1;
	// 		bns = true;
	// 	}
	// 	var opt = {
	// 		cursorcolor: "#afafaf",
	// 		cursorwidth: "5px",
	// 		background: "",
	// 		autohidemode: false,
	// 		railalign: 'left',
	// 		cursoropacitymax: 1,
	// 		bouncescroll: bns,
	// 		cursorborderradius: "0px",
	// 		scrollspeed: scs,
	// 		mousescrollstep: mss,
	// 		directionlockdeadzone: 0,
	// 		cursorborder: "0px solid #fff",
	// 	};
	// 	return opt;
	// }
	// $('.whouse-content-body').niceScroll('.whouse-content-scroll', scrollwhouse());
	// $('.whouse-content-body').scroll(function (event) {
	// 	var s = $(this).scrollTop();
	// 	var r = Math.abs($(this).outerHeight() - $('.whouse-content-scroll').outerHeight());
	// 	var p = s / r * 100;
	// 	$('.whouse-content__shadow').css({ opacity: 1 - 1 / 100 * p });
	// });



	if ($('.t,.tip').length > 0) {
		tip();
	}
	function tip() {
		$('.t,.tip').webuiPopover({
			placement: 'top',
			trigger: 'hover',
			backdrop: false,
			//selector:true,
			animation: 'fade',
			dismissible: true,
			padding: false,
			//hideEmpty: true
			onShow: function ($element) { },
			onHide: function ($element) { },
		}).on('show.webui.popover hide.webui.popover', function (e) {
			$(this).toggleClass('active');
		});
	}





	$(window).resize(function (event) {
		adaptive_function();
	});
	function adaptive_header(w, h) {
		let headerMenu = $('.header-main__mobile');
		let headerLang = $('.header-main__menu');
		let headerLang1 = $('.header__btn');

		if (w < 951) {
			if (!headerLang.hasClass('done')) {
				headerLang.addClass('done').appendTo(headerMenu);
			}
		} else {
			if (headerLang.hasClass('done')) {
				headerLang.removeClass('done').prependTo($('.header-main__menu-wrapper'));
			}
		}

		if (w < 951) {
			if (!headerLang1.hasClass('done')) {
				headerLang1.addClass('done').appendTo(headerMenu);
			}
		} else {
			if (headerLang1.hasClass('done')) {
				headerLang1.removeClass('done').prependTo($('.header__btn-wrapper'));
			}
		}
	}
	function adaptive_function() {
		var w = $(window).outerWidth();
		var h = $(window).outerHeight();
		adaptive_header(w, h);
	}
	adaptive_function();

});


$(document).scroll(function () {
	if ($(document).scrollTop() >= 50) {
		$(".header").addClass("greybg");
	}
	else {
		$(" .header").removeClass("greybg");
	}
}
);

// $(document).scroll(function () {
// 	if ($(document).scrollTop() >= 150) {
// 		$(".about-name__bg").addClass("active");
// 	}
// 	else {
// 		$(".about-name__bg").removeClass("active");
// 	}
// 	if ($(document).scrollTop() >= 1050) {
// 		$(".services-name__bg").addClass("active");
// 	}
// 	else {
// 		$(".services-name__bg").removeClass("active");
// 	}
// }

// );
var lastScrollTop = 0;
window.addEventListener("scroll", function () {
	var st = window.pageYOffset || document.documentElement.scrollTop;
	if (st > lastScrollTop && st > 100) {
		$("header").css({
			"top": "-80px",
		})
	}
	else if (st > lastScrollTop && st < 200) {
		$("header").css({
			"top": 0,
		})
	}
	else {
		$("header").css({
			"top": 0,
		})
	}
	lastScrollTop = st <= 0 ? 0 : st;
}, false);

$('.dots-article__item').on('click', function () {
	$('.dots-article__item').removeClass('active')
	$('.about-inner__article-text').removeClass('active')
	$(this).addClass('active')
	$('.svg-part').removeClass('active')
	let i = $(this).attr('data-id')
	$('#' + i).addClass('active')
	$('#' + i + '1').addClass('active')
}
)




