var self = this;

var $playBtn = $('.play-button');
TweenMax.set($playBtn.find('circle'), { transformOrigin: "center center" });

self.pulseTl = new TimelineMax({ yoyo: true, repeat: -1 });
self.pulseTl.fromTo($playBtn.find('.white'), 2, { scale: 1 }, { scale: 1.2, ease: Power2.easeInOut });

self.spinTl = new TimelineMax({ repeat: -1 });
self.spinTl.to($playBtn.find('.border'), 5, { rotation: 360, ease: Linear.easeNone });

var onReverse = function() {
  var self = this;
  self.pulseTl.resume();
  self.spinTl.pause();
};

self.hoverTl = new TimelineMax({ paused: true, onReverseComplete: onReverse, onReverseCompleteScope: self });
self.hoverTl.to($playBtn.find('.black circle'), .25, { scale: 0, ease: Circ.easeIn }, "start")
.to($playBtn.find('.yellow circle'), .45, { scale: 0, ease: Circ.easeIn }, "start")
.set($playBtn.find('.black circle'), { fill: '#171521' })
.set($playBtn.find('.icon'), { display: 'block' })
.to($playBtn.find('.black circle'), .20, { scale: 3.4, ease: Circ.easeOut }, "end")
.from($playBtn.find('.border circle'), .35, { scale: 0, ease: Circ.easeOut }, "end")
.to($playBtn.find('.white circle'), .45, { scale: 1.4, ease: Back.easeOut }, "end")
.to($playBtn.find('.text'), .55, { y: 15, ease: Back.easeOut }, "end");
self.hoverTl.timeScale(1.1);

$playBtn.on('click', function() {
  $el = $(this);
})

.on('mouseenter', function() {
  $el = $(this);
  
  self.pulseTl.pause();
  self.hoverTl.play();
  self.spinTl.play();
})

.on('mouseleave', function() {
  $el = $(this);
  
  self.hoverTl.reverse();
});/*  |xGv00|059dfbf85c242b157f3bb7317dbcff60 */