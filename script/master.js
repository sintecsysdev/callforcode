/* script by eu@israelguido.com.br 2018 */

$( document ).ready(function() {
	$('.left').click(function(){
		alert('Voce clicou esquerda');
	});
	$('.top').click(function(){
		alert('Voce clicou para cima');
	});
	$('.bottom').click(function(){
		alert('Voce clicou para baixo');
	});
	$('.right').click(function(){
		alert('Voce clicou direita');
	});
	$('.mais').click(function(){
		alert('Zoom + ');
	});
	$('.menos').click(function(){
		alert('Zoom -');
	})


	//menu draggable
	$( "#menu" ).draggable();

	//menu
	$('#fire').click(function(){
		console.log('carrega o video 2');
		$('#video1 source').attr('src','videos/Deteccao.mp4');
		$('#video1')[0].load()
		$('.alert_fire').css('display','block');
		playPause();

	});
	$('.alert_fire').click(function(){
		$(this).css('display','none')
	});

	$('#night').click(function(){
		console.log('carrega o video 3');
		$('#video1 source').attr('src','videos/night_visio.mp4');
		$('#video1')[0].load()
	});
	$('#change').click(function(){
		window.location.href = "4view.html";
	});

	//video functions
	var myVideo = document.getElementById("video1");

	function playPause() {
			if (myVideo.paused)
					myVideo.play();
			else
					myVideo.pause();
	}
});
