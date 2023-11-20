var playbackConst = 500; // Adjust this to fine-tune the playback rate
var vid = document.getElementById('v0');
var setHeight = document.getElementById("set-height");

vid.addEventListener('loadedmetadata', function() {
  setHeight.style.height = Math.floor(vid.duration) * playbackConst + "px";
});

let lastScrollTop = 0;
function scrollPlay() {
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  
  // Throttle updates
  if (Math.abs(scrollTop - lastScrollTop) > 10) {
    var frameNumber = scrollTop / playbackConst;
    vid.currentTime = frameNumber;
    lastScrollTop = scrollTop;
  }

  window.requestAnimationFrame(scrollPlay);
}

window.requestAnimationFrame(scrollPlay);
