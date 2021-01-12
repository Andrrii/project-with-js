function slider({btnPrevD,btnNextD,currentPositionD,imagesSliderD,sliderD,slidesFieldD,slidesWrapperD}) {
    
// first option
// <div class="offer__slider-wrapper"> --- видалити
//#region 
//  const btnPrev = document.querySelector('.offer__slider-prev'),
//        btnNext = document.querySelector('.offer__slider-next'),
//        currentPosition = document.querySelector("#current"),
//        imagesSlider =document.querySelectorAll('.offer__slide'),
//        totalSlides = document.querySelector('#total');

//     function hideSliderContent() {
//         imagesSlider.forEach(item =>{
//             item.classList.remove('show' , 'fade')
//             item.classList.add('hide')
            
//         })
//     }

//     function showSliderContent(i = 0) {
//         imagesSlider[i].classList.remove('hide')
//         imagesSlider[i].classList.add('show' , 'fade')
//     }
//     hideSliderContent()
//     showSliderContent()
//     function getZero(num) {
//         if (num >= 0 && num <= 9) {
//             return `0${num}`
//         }else {return num;}
//     }
//     function setSlider () {
      
//         currentPosition.innerHTML = getZero(1)
//         totalSlides.innerHTML = getZero(imagesSlider.length)
//     }
//     setSlider()
//     function changeSlide(next,current) {
//         imagesSlider[next].classList.remove('hide')
//         imagesSlider[next].classList.add('show' , 'fade')
//         imagesSlider[current].classList.remove('show' , 'fade')
//         imagesSlider[current].classList.add('hide')
//     }
  
//     btnNext.addEventListener('click',()=>{
//         let current = +currentPosition.innerHTML-1 
//         if (current === imagesSlider.length-1){
//             changeSlide(0,current)
//             currentPosition.innerHTML = getZero(1)
//             }else {
//                 changeSlide(current+1,current)
//          currentPosition.innerHTML = getZero(current+2)   }
//     })
//     btnPrev.addEventListener('click',() => {
//         let current = +currentPosition.innerHTML-1 
//         if (current === 0){
//             changeSlide(imagesSlider.length-1,current)
//             currentPosition.innerHTML = getZero(imagesSlider.length)}
//         else{    
//             changeSlide(current-1,current)
//         currentPosition.innerHTML = getZero(current)
//         }
//     })
//#endregion
// -------------------------------------------------

// Slider Second option
// Карусель

    const btnPrev = document.querySelector(btnPrevD),
    btnNext = document.querySelector(btnNextD),
    currentPosition = document.querySelector(currentPositionD),
    imagesSlider = document.querySelectorAll(imagesSliderD),
    slider = document.querySelector(sliderD),
    totalSlides = document.querySelector('#total'),
    slidesField = document.querySelector(slidesFieldD),
    slidesWrapper = document.querySelector(slidesWrapperD),
    width = window.getComputedStyle(slidesWrapper).width;

    let slideIndex = 1;
    currentPosition.innerHTML = getZero(slideIndex)
    let offset = 0 // Відступ

    function getZero(num) {
        if (+num >= 0 && +num <= 9) {
            return `0${+num}`
            }else {return +num;}
    }
    slidesField.style.width = 100 * imagesSlider.length + '%' // дивитись 62 урок
    slidesField.style.display = 'flex' // Щоб всі слайди були в рядок
    slidesField.style.transition = '0.5s all'
    slidesWrapper.style.overflow = 'hidden' // Щоб показувався тільки 1 слайд а не 4

    imagesSlider.forEach(slide => {
    slide.style.width = width // Встановлюємо всім слайдам однакову ширину
    })
    // Навігація для слайдера 

    slider.style.position = 'relative'
    const indicators = document.createElement('ol'),
        dots = [];
    indicators.classList.add('carousel-indicators')
    slider.append(indicators)
    for (let i = 0; i< imagesSlider.length;i++){
    const dot = document.createElement('li')
    dot.setAttribute('data-slide-to',i+1)
    dot.classList.add('dot')
    if(i==0) {
        dot.style.opacity = 0.8
    }
    indicators.append(dot)
    dots.push(dot)
    }


    //---------------------------------------------

    function nextSlide () {
    if (offset == +width.slice(0,width.length-2) * (imagesSlider.length-1))
    /* Якщо елемент останній то вертаєм imagesSlider в початкове положення */ 
    {offset = 0
        slideIndex = 1 }
    else{offset += +width.slice(0,width.length-2)
        slideIndex += 1}
    slidesField.style.transform = `translateX(-${offset}px)` // Сдвиг вліво
    currentPosition.innerHTML = getZero(+slideIndex)
    dots.forEach(dot => dot.style.opacity = '.5')
    dots[+slideIndex-1].style.opacity = '0.8'
    }
    function previousSlide() {
    if (offset == 0)
    /* Якщо елемент перший то перевертаєм imagesSlider */ 
    {offset = +width.slice(0,width.length-2) * (imagesSlider.length-1)
        slideIndex = imagesSlider.length
    }

    else{offset -= +width.slice(0,width.length-2)
    slideIndex -= 1}
    slidesField.style.transform = `translateX(-${offset}px)` // Сдвиг вліво
    currentPosition.innerHTML = getZero(+slideIndex)
    dots.forEach(dot => dot.style.opacity = '.5')
    dots[slideIndex-1].style.opacity = '0.8'
    }


    btnNext.addEventListener('click', () => {
    nextSlide()
    clearInterval(interval) 
    interval =  setInterval(nextSlide,5000)
    })

    
    btnPrev.addEventListener('click', () => {
    previousSlide()
    clearInterval(interval)
    interval =  setInterval(nextSlide,5000)
    })
    let interval =  setInterval(nextSlide,5000)



    dots.forEach(dot => { /* Коли клікаєм на dot то переходим на певний слайд */
    dot.addEventListener('click',(event) => {
        clearInterval(interval)
        const slideTO = event.target.getAttribute('data-slide-to')
        slideIndex = +slideTO
        offset = +width.slice(0,width.length-2) * (slideTO-1)
        slidesField.style.transform = `translateX(-${offset}px)` // Сдвиг вліво

        if (imagesSlider.length < 10) {
            currentPosition.innerHTML = `0${+slideIndex}`
        }else{currentPosition.innerHTML = `${+slideIndex}`}

        dots.forEach((dot) => dot.style.opacity = '.5')
   
        dots[slideIndex-1].style.opacity = '0.8'
        interval =  setInterval(nextSlide,5000)
        })
        })
}

export default slider