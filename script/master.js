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

	var current = null;

	//menu draggable
	$( "#menu" ).draggable();

	//menu
	$('#fire').click(function(){
		if (current == 'fire') {
			$('#video1 source').attr('src', 'videos/1.mp4');
			$('#video1')[0].load()
			playPause();
			current = null;
			$('.alert_fire').css('display', 'none');
			return false;
		}

		current = 'fire';

		console.log('carrega o video 2');
		$('#video1 source').attr('src','videos/2_alarm.mp4');
		$('#video1')[0].load()
		setTimeout(function(){
			$('.alert_fire').css('display', 'block');
		}, 1000);
		playPause();

	});
	$('.alert_fire').click(function(){
		$(this).css('display','none');

		$('#video1 source').attr('src', 'videos/1.mp4');
		$('#video1')[0].load()
		playPause();
	});

	$('#night').click(function(){
		if (current == 'night') {
			$('#video1 source').attr('src', 'videos/1.mp4');
			$('#video1')[0].load()
			playPause();
			current = null;
			return false;
		}
	
		$('.alert_fire').css('display', 'none');

		current = 'night';
		$('#video1 source').attr('src','videos/3_night.mp4');
		$('#video1')[0].load()
	});

	$('#change').click(function(){
		window.location.href = "4view.html";
	});

	//video functions
	var myVideo = document.getElementById("video1");

	function playPause() {
			if (myVideo.paused){
					myVideo.play();
			}else{
					myVideo.pause();
			}
		}
});
