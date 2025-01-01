

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


//main
sendJSON()


//Event listeners
document.addEventListener("DOMContentLoaded", ()=> {
  //document.querySelector(".blueB").addEventListener("click", bClicked)
  
})