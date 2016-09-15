var $text = $("#text"),
    $pause = $("#pause"),
    $reverse = $("#reverse"),
    $restart = $("#restart"),
    $speed = $("input[name='speed']"),
    $slider = $("#slider"),
    //"tl" is the timeline we'll add our tweens to. Then we can easily control the whole sequence as one object. 
    tl = new TimelineMax({onUpdate:updateSlider, onComplete:onComplete, onReverseComplete:onComplete, repeat:1, repeatDelay:4})

function updateSlider() {
  $slider.slider("value", tl.progress() * 100);
}
function onComplete() {
  tl.pause();
  $pause.html("play");
}

//var tl = new TimelineMax({repeat:1, repeatDelay:4})

//-Animation below--------rotation:-90--------------------------------------------------

tl
.set(".circ", {visibility:"visible"})
.set("#tick", {visibility:"visible"})
.set(".redtab", {visibility:"visible"})
.set(".plus", {visibility:"visible"})

//intro
.from(".redrect", .5, {autoAlpha:0, scaleY:"0%", transformOrigin:"50% 20%", ease: Back.easeOut.config(1)}) 
.from("#text1", .5, {autoAlpha:0, ease: Back.easeOut.config(2)})
.to("#text1", .5, {autoAlpha:0}, "+=3") //fade out
.from(".whiterect", .5, {autoAlpha:0, scaleY:"0%", transformOrigin:"50% 20%", ease: Back.easeOut.config(1)}) 

//1st reason:
    
.from(".text3", .3, {autoAlpha:0, scale:"0.5%", ease: Back.easeOut.config(1)})
.from(".text3b", .3, {autoAlpha:0})

.addLabel("fade1") //fade out
.to(".text3", .3, {autoAlpha:0}, "fade1+=4")
.to(".text3b", .3, {autoAlpha:0}, "fade1+=4")

//2nd reason

.from(".plus", .5, {scale:"0%", ease: Back.easeOut.config(2)})    

//tickclock
.from("#clockholder", .5, {autoAlpha:0, scale:"0%", ease: Back.easeOut.config(2)})
.from("circle", 1.5, {drawSVG:"0%"})
.to(".circ", 0.3, {autoAlpha:0})
.from("#tick", .5, {scale:"0%", ease: Back.easeOut.config(2)}, "-=0.3") 
.from(".redtab", .5, {scale:"0%", ease: Back.easeOut.config(2)})

.addLabel("fade2") //fade out
.to("#clockholder", .5, {autoAlpha:0, scale:"0%", ease: Back.easeOut.config(2)}, "fade2+=3")
.to(".redtab", .3, {autoAlpha:0}, "fade2+=3")
    
//3rd reason

.from(".text2a", .3, {autoAlpha:0, scale:"0.5%", ease: Back.easeOut.config(1)})
.from(".text2b", .3, {autoAlpha:0})


.addLabel("fade3") //fade out
.to(".text2a, .text2b, .plus", .3, {autoAlpha:0}, "fade3+=4")
.to(".redrect, .whiterect", .3, {autoAlpha:0}, "fade3+=4.2")

.from(".greybg", 0.3, {autoAlpha:0})
.from(".greenspeech", .3, {autoAlpha:0, scaleY:"0px", transformOrigin:"bottom", y:"20px", ease: Back.easeOut.config(0.5)}, "+=.5")
.from(".btntxt", .5, {y:"100px", ease: Back.easeOut.config(0.5)})
;



//tl.pause ("abs+=2");
//tl.play ("abs-=2");



//-Animation above----------------------------------------------------------
//slider and button controls below ------------------------------------------
$slider.slider({
		  range: false,
		  min: 0,
		  max: 100,
		  step:.1,
  		slide: function (event, ui) {
			    tl.progress( ui.value / 100 ).pause();
    $pause.html("play");
  		}
});
		
$pause.click(function() {
  if (tl.paused()) {
	    if (tl.progress() === 1 || (tl.progress() === 0 && tl.reversed())) {
      		tl.restart();
	    } else {
		      tl.resume();
	    }
    $pause.html("pause");
  } else {
    tl.pause();
    $pause.html("resume");
  }
});

$reverse.click(function() {
	  if (tl.progress() === 0) {
     if (tl.reversed()) {
       tl.play();
     } else {
		       tl.reverse(0);
     }
    $pause.html("pause");
	  } else {
		    tl.reversed(!tl.reversed()).resume();
    $pause.html("pause");
	  }
});

$restart.click(function(){
	  tl.restart();
  $pause.html("pause");
});

$speed.change(function(v, val) {
  tl.timeScale(parseFloat($(this).val()));
  if (tl.progress() === 1) {
    tl.restart();
    $pause.html("pause");
  } else if (tl.paused()) {
    tl.resume();
    $pause.html("pause");
  }
});

