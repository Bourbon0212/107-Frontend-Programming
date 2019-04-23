$(function(){
  // Name Fade in
  document.getElementById("loadingTxt").style.opacity = 1;
  document.getElementById("loadingTxt").style.marginTop = "40vh";

  var img = new Image();
  img.src = './img/PH03.png'; // find load longest Img
  img.onload = function() {

    setTimeout(function(){
      // Name Fade Out
     document.getElementById("loadingTxt").style.opacity = 0;
     document.getElementById("loadingTxt").style.marginTop = "39vh";

      // BGDiv
      document.getElementById("loadingBg").style.transition = '1s';
      document.getElementById("loadingBg").style.backgroundColor = 'rgba(38, 84, 96, 0)';
      $('#mdl_progress').hide();

      setTimeout(function(){
        $('#loadingTxt').css('display','none');
        $('#loadingTxt').hide();
      }, 600);

    }, 1000);

  }
})

$(document).ready(function () {

    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
    });
    $('#sidebar').on('click', function () {
        $('#sidebar').toggleClass('active');
    });

});

$(document).on('click', 'a[href^="#"]', function (event) {
    event.preventDefault();

    $('html, body').animate({
        scrollTop: $($.attr(this, 'href')).offset().top
    }, 500);
});
