/* script by eu@israelguido.com.br 2018 */
$( document ).ready(function() {


  $('#video2')[0].play();
  $('#video3')[0].play();
  $('#video4')[0].play();

  //menu draggable
  $( "#menu" ).draggable();


  //menu
  $('#video1').click(function(){
    $('#video1')[0].play();
  });

  $('#video2').click(function(){
    $('#video2')[0].play();
  });

  $('#video3').click(function(){
    $('#video3')[0].play();
  });

  $('#video4').click(function(){
    $('#video4')[0].play();
  });

  $('#change').click(function(){
    window.location.href = "index.html";
  });
});
