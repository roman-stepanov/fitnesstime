$(document).ready(function() {
  var pageHeader = $('#page-header');
  var pageHeaderHeight = pageHeader.outerHeight();
  var navigation = pageHeader.find('.main-nav');
  var backToTop = $('.page-footer__back-to-top');

  var onClickNavigation = function(evt) {
    evt.preventDefault();
    var target = $(this.hash);

    $('body, html').animate(
      {'scrollTop': target.offset().top - pageHeaderHeight}, 600
    );
  };

  navigation.find('a').on('click', onClickNavigation);
  backToTop.on('click', onClickNavigation);
});
