$(document).ready(function() {
  var mainSlider = $('#main-slider');
  var mainSlides = mainSlider.find('.slide');
  var countMainSlides = mainSlides.length;
  var animationMainSlider = null;
  var intervalMainSlider = 2500;

  var partnersSlider = $('#partners-slider');
  var widthPartnersSlider = partnersSlider.outerWidth();
  var partners = partnersSlider.find('.partners__item');
  var widthPartner = partners.outerWidth();
  var countPartners = partners.length;
  var wrapperPartners = partnersSlider.find('.partners__list');
  var widthWrapperPartners = wrapperPartners.outerWidth();
  var offsetPartners = parseInt(wrapperPartners.css('left'));

  var animationPartners = null;
  var directionAnimationPartners = 'left';
  var intervalPartners = 2500;
  var animateTimePartners = 1000;

  var btnPrevMainSlider = mainSlider.find('.main-slider__control--prev');
  var btnNextMainSlider = mainSlider.find('.main-slider__control--next');
  var btnPrevPartnersSlider = partnersSlider.find('.partners__control--prev');
  var btnNextPartnersSlider = partnersSlider.find('.partners__control--next');


  var scrollMainSlider = function(direction) {
    var currentActive = mainSlider.find('.slide--active').index();

    mainSlides.eq(currentActive).removeClass('slide--active');
    if (direction === 'left') {
      --currentActive;
      if (currentActive < 0) {
        currentActive = countMainSlides - 1;
      }
    } else {
      ++currentActive;
      if (currentActive > countMainSlides -1) {
        currentActive = 0;
      }
    }
    mainSlides.eq(currentActive).addClass('slide--active');
  };

  var getNewOffsetPartners = function(direction) {
    switch (direction) {
      case 'right':
        return (offsetPartners + widthPartner);
      default:
        return (offsetPartners - widthPartner);
    }
  };

  var canScrollPartners = function() {
    return (widthWrapperPartners > widthPartnersSlider);
  };

  var canScrollPartnersLeft = function() {
    var newOffset = getNewOffsetPartners('left');

    return (canScrollPartners() && (widthWrapperPartners - Math.abs(newOffset) >= widthPartnersSlider));
  };

  var canScrollPartnersRight = function() {
    var newOffset = getNewOffsetPartners('right');

    return (canScrollPartners() && (newOffset <= 0) && (widthWrapperPartners - Math.abs(newOffset) >= widthPartnersSlider));
  }

  var scrollPartnersSlider = function(direction) {
    offsetPartners = getNewOffsetPartners(direction);
    wrapperPartners.animate(
      {'left': offsetPartners}, animateTimePartners
    );
  };


  var startAnimationMainSlider = function() {
    animationMainSlider = window.setInterval(function() {scrollMainSlider('right')}, intervalMainSlider);
  };

  var stopAnimationMainSlider = function() {
    window.clearInterval(animationMainSlider);
  }

  var startAnimationPartners = function() {
    animationPartners = window.setInterval(function() {
      if ( ((directionAnimationPartners === 'left') && !canScrollPartnersLeft()) || ((directionAnimationPartners === 'right') && !canScrollPartnersRight())) {
        directionAnimationPartners === 'left' ? directionAnimationPartners = 'right' : directionAnimationPartners = 'left';
      }
      scrollPartnersSlider(directionAnimationPartners);
    },intervalPartners);
  };

  var stopAnimationPartners = function() {
    window.clearInterval(animationPartners);
  };


  startAnimationMainSlider();
  startAnimationPartners();
  mainSlider.hover(function() {
    stopAnimationMainSlider()
    }, startAnimationMainSlider
  );
  partnersSlider.hover(function() {
    stopAnimationPartners()
    }, startAnimationPartners
  );

  btnPrevMainSlider.on('click', function() {
    scrollMainSlider('left');
  });
  btnNextMainSlider.on('click', function() {
    scrollMainSlider('right');
  });

  btnPrevPartnersSlider.on('click', function() {
    if (canScrollPartnersLeft()) {
      scrollPartnersSlider('left');
    }
  });
  btnNextPartnersSlider.on('click', function() {
    if (canScrollPartnersRight()) {
      scrollPartnersSlider('right');
    }
  });
});
