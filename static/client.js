
let surpriseBtn = qSel("#surprise-btn")
let nyanCat = qSel("#nyan-cat")
let nyanCatAudio =  qSel("#nyan-cat-audio")

let vids = [
  "https://www.youtube.com/watch?v=40QKjOja9iY",  //guy drops from roof and starts shuffling
  "https://www.youtube.com/watch?v=W7qIup-qbhw"  //bear tree scratch rave
]


function sendJSON() {
  let jsonObj = {name: "Dan"} 
  xr = new XMLHttpRequest()
  xr.open("POST", "/test")
  xr.setRequestHeader("Content-Type", "application/json")
  xr.send(JSON.stringify(jsonObj))

  xr.onreadystatechange = () => {
    if (xr.readyState == 4 && xr.status == 200) {
      ret = JSON.parse(xr.responseText)
      console.log("Resp from server: " + ret)
    }
  }
}


let nTimesSurpriseButtonClicked = 0

// Function gets a random gif path from the server then displays it
function surpriseButtonClicked() {
  nTimesSurpriseButtonClicked += 1

  // Show nyan cat animation the 3rd and 4th time th surprise button is clicked
  if (nTimesSurpriseButtonClicked == 3 || nTimesSurpriseButtonClicked == 4) {
    launchNyanCatRandomDirection()
    return
  }

  // Display gif
  xr = new XMLHttpRequest()
  xr.open("GET", "/randomGif")
  xr.setRequestHeader("Content-Type", "application/json")
  xr.send()

  xr.onreadystatechange = () => {
    if (xr.readyState == 4 && xr.status == 200) {
      retObj = JSON.parse(xr.responseText) 
      let gifPath = retObj.gifPath
      log(`gifPath: ${gifPath}`)

      let gif = qSel('.gif')
      gif.src = gifPath
      let gifDiv = qSel('#gif-div')
      gifDiv.style.display = 'block'

      // set time based on gif
      let displayDuration = 3000
      setTimeout(() => {
        gifDiv.style.display = 'none'
      }, displayDuration)
    }
  }

}


let prevDirection = ""

function launchNyanCatRandomDirection() {

  // Randomly choose a new direction to slide nyan cat
  let directions = ["left-to-right", "right-to-left", "top-to-bottom", "bottom-to-top"]
  let chosenDirection = directions[Math.floor(Math.random() * directions.length)]
  
  while (chosenDirection == prevDirection) {
    chosenDirection = directions[Math.floor(Math.random() * directions.length)]
  }
  prevDirection = chosenDirection
  log(`direction: ${chosenDirection}`)


  // Reset position and orientation
  nyanCat.style.display = "inline"
  nyanCat.style.transform = "" 
  nyanCat.style.rotate = ""
  nyanCat.style.animation = "" 


  // Set random starting position based on direction
  nyanCatWidth = 150;  //px

  if (chosenDirection == "left-to-right") {
    nyanCat.style.top = `${Math.random() * 80}vh` // Random height
    nyanCat.style.left = `${-nyanCatWidth - 50}px` // Start off-screen on the left
    nyanCat.style.animation = "nyan-slide-left-to-right 4s linear forwards"
  } 
  else if (chosenDirection == "right-to-left") {
    nyanCat.style.transform = "scaleX(-1)"  //flip horizontally
    nyanCat.style.top = `${Math.random() * 80}vh` // Random height
    nyanCat.style.left = "100vw" // Start off-screen on the right
    nyanCat.style.animation = "nyan-slide-right-to-left 4s linear forwards"
  } 
  else if (chosenDirection == "top-to-bottom") {
    nyanCat.style.rotate = "90deg"  //rotate so nyan cat faces down
    nyanCat.style.left = `${Math.random() * 80}vw` // Random width
    nyanCat.style.top = `${-nyanCatWidth - 50}px` // Start off-screen at the top
    nyanCat.style.animation = "nyan-slide-top-to-bottom 4s linear forwards"
  } 
  else if (chosenDirection == "bottom-to-top") {
    nyanCat.style.rotate = "270deg"  //rotate so nyan cat faces up
    nyanCat.style.left = `${Math.random() * 80}vw` // Random width
    nyanCat.style.top = "100vh" // Start off-screen at the bottom
    nyanCat.style.animation = "nyan-slide-bottom-to-top 4s linear forwards"
  }

  //play nyan cat music
  nyanCatAudio.volume = 0.5  
  nyanCatAudio.currentTime = 4  //start at 4 seconds
  nyanCatAudio.play()
}


// Nyan cat test functions
function launchNyanCat() {

  // Slide nyan cat from left to right
  nyanCat.display = "inline"
  nyanCat.style.animation = "nyan-slide-left-to-right 4s linear forwards"
}


function launchNyanCatVertically() {
  nyanCat.display = "inline"
  nyanCat.style.transform = "" 
  nyanCat.style.rotate = ""
  nyanCat.style.animation = "" 

  nyanCatWidth = 150;  //px
  nyanCat.style.rotate = "90deg"  //rotate so nyan cat faces down
  nyanCat.style.left = `${Math.random() * 80}vw` // Random width
  nyanCat.style.top = `${-nyanCatWidth - 50}px` // Start off-screen at the top
  nyanCat.style.animation = "nyan-slide-top-to-bottom 4s linear forwards"
}


// Event listeners
document.addEventListener("DOMContentLoaded", ()=> {
  surpriseBtn.addEventListener("click", surpriseButtonClicked)

  nyanCat.addEventListener("animationend", () => {
    nyanCat.style.display = "none"

    // Fade out the music
    let timeInterval = 200  //0.2 secs

    let fadeOutInterval = setInterval(() => {
      if (nyanCatAudio.volume > 0.1) {
        // decrease volume gradually
        nyanCatAudio.volume -= 0.1 
      } 
      else {
        nyanCatAudio.pause() 
        nyanCatAudio.currentTime = 0 
        clearInterval(fadeOutInterval)  //stop the interval
      }
    }, 200) 
  })
  

})