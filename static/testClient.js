


document.addEventListener("DOMContentLoaded", ()=> {
  const popup = qSel('#popup')
  const openBtn = qSel('#openBtn')
  const closeBtn = qSel('#closeBtn')
  const prevBtn = qSel('.carousel-control-prev')  
  const nextBtn = qSel('.carousel-control-next')
  carousalItems = qSelAll('.carousal-item')

  openBtn.onclick = () => {
    popup.style.display = 'flex'
    currentIndex = 0
    updateImage()
  }

  closeBtn.onclick = () => {
    popup.style.display = 'none'
  }

  prevBtn.onclick = () => {
    log('prev button pressed')
    // carousalItems[0].className = 'carousel-item active'
    // carousalItems[1].className = 'carousel-item'
    carousalItems[0].classList.add('active')
    carousalItems[1].classList.remove('active')
  }

  nextBtn.onclick = () => {
    log('next button pressed')
    carousalItems[0].className = 'carousel-item'
    carousalItems[1].className = 'carousel-item active'
  }
})

