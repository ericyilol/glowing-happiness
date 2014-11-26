/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
// Put event listeners into place
window.addEventListener("DOMContentLoaded", function() {
	// Grab elements, create settings, etc.
	var canvas = document.getElementById("canvas"),
		context = canvas.getContext("2d"),
		video = document.getElementById("video"),
		snap = document.getElementById("snap"),
		resnap = document.getElementById("resnap"),
		confirm = document.getElementById("confirm"),
		videoObj = { "video": true },
		errBack = function(error) {
			console.log("Video capture error: ", error.code); 
		};

	// Put video listeners into place
	if(navigator.getUserMedia) { // Standard
		navigator.getUserMedia(videoObj, function(stream) {
			video.src = stream;
			video.play();
		}, errBack);
	} else if(navigator.webkitGetUserMedia) { // WebKit-prefixed
		navigator.webkitGetUserMedia(videoObj, function(stream){
			video.src = window.webkitURL.createObjectURL(stream);
			video.play();
		}, errBack);
	}
	else if(navigator.mozGetUserMedia) { // Firefox-prefixed
		navigator.mozGetUserMedia(videoObj, function(stream){
			video.src = window.URL.createObjectURL(stream);
			video.play();
		}, errBack);
	}
        // Trigger photo take
        snap.addEventListener("click", function() {
                video.style.display="none";
                context.drawImage(video, 0, 0, 640, 480);
                resnap.style.display="block";
                confirm.style.display="block";
        });
        
        resnap.addEventListener("click", function() {
                context.clearRect(0, 0, 640, 480);
                video.style.display="block";
                
                
        });
        
        // click the confirm button
        confirm.addEventListener("click", function() {
//                context.clearRect(0, 0, 640, 480);
                video.style.display="block";
                var dataurl = canvas.toDataURL("image/png", ""); 
//                console.log(dataurl);
//                window.open(dataurl, "toDataURL() image", "width=600, height=200");
                
                var ajax = new XMLHttpRequest();
                ajax.open("POST","testsave.php",false);
                ajax.setRequestHeader("Content-Type", "application/upload");
                ajax.send(dataurl);
                
            
        });
        
        
        
}, false);


