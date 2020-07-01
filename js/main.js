$(window).load(function () {
  /* ==========================================================================
   Preloader
   ========================================================================== */
  $(".preloader-circle").css("display", "none");
  $(".preloader").fadeOut(400);
  $("body").removeClass("loading");

  /* ==========================================================================
    Auto-updating year (footer)
    ========================================================================== */
  $("span.year").text(new Date().getFullYear());

  /* ==========================================================================
   Materialize
   ========================================================================== */
  if ($(window).width() > 480) { //not on mobile
    $('.materialboxed').materialbox();
  }
  $('.fixed-action-btn').floatingActionButton();


  /* ==========================================================================
    Lozad - laxy loading
    ========================================================================== */
  const observer = lozad(); // lazy loads elements with default selector as '.lozad'
  observer.observe();
});