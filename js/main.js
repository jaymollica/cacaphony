(function ($, root, undefined) {
	
	$(function () {
		
		$(document).ready(function() {

			
		});

	});
	
})(jQuery, this);

let waves;
let waves2;
let track;
let level;
let fiveMinutes;
let possibleWaves = ['waves1_1.mov','waves1_2.mov','waves1_3.mov'];
let vidOpacity = 0;
let flipped = false;
let newOpacity;
let newOpacityMapped;
let wavesLooped = false;
let waves2Looped = false;
let cypressLooped = false;
let trackPlayed = false;

function preload() {
	track = createAudio('../audio/real_wave.mp3');

	waves = createVideo(['../video/'+random(possibleWaves)]);
	waves.hide();

	waves2 = createVideo(['../video/blue_natural_video.mp4']);
	waves2.hide();

	cypress = createVideo(['../video/cypress1.mp4']);
	cypress.hide();

	newOpacity = random(10,30);
	newOpacityMapped = map(newOpacity,0,100,0,255);
	vidOpacity = newOpacityMapped;

}

function setup() {
	
	createCanvas(windowWidth,windowHeight);
	background('darkgray');

	level = 0;

	textSize(48);
	fill('white');
	text('Loading...', 50, 100);

	frameRate(24);

	fiveMinutes = 7200;

}

function draw() {
	tint(255);
	image(waves, 0, 0, width, height); // draw the video frame to canvas

	tint(255, vidOpacity);
	if(frameCount >= fiveMinutes) {
		console.log("cypress time");
		image(cypress, 0, 0, width, height); // draw a second copy to canvas
	}
	else {
		image(waves2, 0, 0, width, height); // draw a second copy to canvas
		
	}

	startVideos();

}

function startVideos() {

	if(wavesLooped == false) {
		waves.loop();
		wavesLooped = true;
	}

	if(frameCount >= fiveMinutes && cypressLooped == false) {
		cypress.loop();
		cypressLooped = true;
	}
	else if(waves2Looped == false) {

		waves2.loop();
		waves2Looped = true;

	}

	if(trackPlayed == false) {
		track.volume(.2);
		track.play();
		trackPlayed = true;
	}
	
}

function mousePressed() {

	if(level >= 4) {
		level = 0;
	}
	else {
		level = level + 1;
	}

	// .isPlaying() returns a boolean
	track.volume(.2 + (.2 * level));
	track.play();

	flipped = !flipped;

	if(flipped == true) {
		newOpacity = random(10,30);
		newOpacityMapped = map(newOpacity,0,100,0,255);
	}
	else {
		newOpacity = random(31,50);
		newOpacityMapped = map(newOpacity,0,100,0,255);
	}

	vidOpacity = newOpacityMapped;

	

}
