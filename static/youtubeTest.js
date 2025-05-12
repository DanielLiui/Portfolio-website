
let player;

// This function is called automatically when the YouTube API is ready
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '200',
    width: '300',
    videoId: '40QKjOja9iY',  
    playerVars: {
      autoplay: 0,
      mute: 0
    }
  });
}

function playVideo() {
  log("Playing video...")

  if (player && player.playVideo) {
    player.playVideo();  // Starts the video with sound
  }
}


// Event listeners
document.addEventListener("DOMContentLoaded", ()=> {

  
})