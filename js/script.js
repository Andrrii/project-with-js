document.addEventListener("DOMContentLoaded",() => { /* js чекає загрузки DOM дерева */ 

    // tabs | Выберите стиль питания |
    const tabs = document.querySelectorAll('.tabheader__item'),
    tabsContent =document.querySelectorAll('.tabcontent'),
    tabsParent = document.querySelector('.tabheader__items')

    function hideTabContent() {
        tabsContent.forEach(item =>{
            item.classList.remove('show' , 'fade')
            item.classList.add('hide')
            
        })

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active')
        })
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.remove('hide')
        tabsContent[i].classList.add('show' , 'fade')
        tabs[i].classList.add('tabheader__item_active')
    }
    hideTabContent()
    showTabContent()

    tabsParent.addEventListener('click',(event) => { // перебираєм |стиль питания|
        const target = event.target

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach( (item,i) => {
                if (target === item) {
                    hideTabContent()
                    showTabContent(i)
                }
            })
        }
    })

    // ------------------------------------------------------------

    // Timer  |Осталось до конца акции: |

    const deadline = '2021-01-12'
    function getTimeRemaining (endtime) { /* Отримує різницю між датами */
        const t = Date.parse(deadline) - new Date(),
              days = Math.floor(t/(1000 * 60 *60 *24)),  /* floor - округлює до найближчого цілого */
              hours = Math.floor((t/( 1000 * 60 * 60 )% 24 )),
              minutes = Math.floor((t/ 1000 / 60 ) % 60 ),
              seconds = Math.floor((t / 1000 ) % 60 );

        return {
            'total' : t,
            'days' : days,
            'hours' : hours,
            'minutes' : minutes,
            'seconds' : seconds
        };
    }

    function setClock (selector, endtime) { /* встановлюєм таймер на нашу сторінку */
        const timer =document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds');
        
              updateClock() /* викликаєм функцію,щоб значення зразу запсувались на сторінку */ 

        function getZero(num) {
            if (num >= 0 && num <= 9) {
                return `0${num}`
            }else {return num;}
        }

        function updateClock () { /* перезапис значень годинника */ 
            const t = getTimeRemaining(endtime) 
                
            days.innerHTML = getZero(t.days)
            hours.innerHTML = getZero(t.hours)
            minutes.innerHTML = getZero(t.minutes)
            seconds.innerHTML = getZero(t.seconds)

            if (t.total <= 0) {
                clearInterval(timeInterval)
            }
            
        } 

        const timeInterval = setInterval(updateClock,1000) /* Годинник працює */ 
    } 

    setClock('.timer',deadline)
    // ------------------------------------------------------------


    // При натисненні на кнопку "Зв'язатись з нами" викликаєм модальне вікно

    const modalTriggers = document.querySelectorAll("[data-modal]"),
            modal = document.querySelector('.modal');
            

    function openModal () {
        modal.classList.add('show')
        modal.classList.remove('hide')
        document.body.style.overflow = 'hidden' // забираєм прокрутку сторінки
        clearInterval(modalTimerId) // Якщо юзер сам відкрив вікно то воне вже не покажеться
        window.removeEventListener('scroll',showModalByScroll)
    }
       
    
    modalTriggers.forEach(btn => {      
        btn.addEventListener('click' , openModal)
    })

    function closeModal() {
        modal.classList.remove('show')
        modal.classList.add('hide')
        document.body.style.overflow = '' // вертаєм прокрутку сторінки
    }

    

    modal.addEventListener('click', (event) => { /* Коли клікаєм за межі всплаючого вікна , 
        то воно теж закривається  */
        if (event.target === modal || event.target.getAttribute('data-close') == '' /*  Якщо клікнули на хрестик */)  {
            closeModal()
        }
    })

    document.addEventListener('keydown', (event) => {
        if (event.code === 'Escape' && modal.classList.contains('show')) {
            closeModal()
        }
    })

    const modalTimerId = setTimeout(openModal,150000) // 2.5 hv
    

    function showModalByScroll () {
         /* Коли користувач долистав до кінця сторінки ,
            то відкриється модальне вікно */ 
            if (  /* подивитись урок 42 */
                window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) 
            {
               const bottomModalTimerId = setTimeout(openModal,2500)
                //    console.log(bottomModalTimerId)
                //    clearInterval(bottomModalTimerId)
                
                   
            }
    }

    window.addEventListener('scroll', showModalByScroll)

//----------------------------------------------------------------------

//----------    Перероблюєм карточки меню

    class OurMenu {
        constructor(src,alt,title,descr,price,parentSelector, ...classes) {
            this.src = src
            this.alt =alt
            this.title = title
            this.descr = descr
            this.price = price
            this.parent = document.querySelector(parentSelector)
            this.transfer = 27
            this.classes = classes
            this.defaultClass = "menu__item"
            this.changeToUAH()

        }

        changeToUAH() {
            this.price = this.price * this.transfer
        }

        render() {
           const element = document.createElement('div')
           element.className = this.defaultClass
           this.classes.forEach(className => element.classList.add(className)) // Якщо ми хочемо додати ще класи
           element.innerHTML = `   
           
                <img src="${this.src}" alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__i tem-total"><span>${this.price}</span> грн/день</div>
                </div>
       `
       this.parent.append(element)
        }

    }   
    const getCards = async(url) => { // async and await роблять з асинхронной функції - синхронну
        const res = await fetch(url) // await - почекати
           
        if(!res.ok) /* Якщо помилка(наприклад 404 ) то викидаєм помилкм */ {
            throw new Error(`Could not fetch ${url} , status: ${res.status}`)
        }

        return await res.json()
    }

    // First variant
    // getCards('http://localhost:3000/menu') 
    // .then(data => {
    //     data.forEach(obj => {
    //         new OurMenu(obj.img,obj.altimg,obj.title,obj.descr,obj.price,'.menu .container').render()
    //     })
    // })

    // Second variant з використанням бібліотеки axios
    axios.get('http://localhost:3000/menu')
    .then(data => {
             data.data.forEach(obj => {
                 new OurMenu(obj.img,obj.altimg,obj.title,obj.descr,obj.price,'.menu .container').render()
             })
            })
    // getCards замінила це
    //#region 
    // const card1 = new OurMenu(
    //     'vegy.jpg',
    //     'vegy',
    //     'Меню "Фитнес"',
    //     'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    //     11,
    //     '.menu .container',
    //     'big'
    // )
    // card1.render()
//#endregion
 

//----------------------------------------------------------------------

// Отримуєм дані з форми  без перезагрузки сторінки

  const forms = document.querySelectorAll('form'),
        message ={
            loading : 'img/form/spinner.svg',
            success: "Дякуємо ! Найбижчим часом  ми   зателефонуємо вам",
            fail:"Ой! Щось не так :( "
        };

    forms.forEach(item => {
        bindPostData(item)
    })

    const postData = async(url,data) => { // async and await роблять з асинхронной функції - синхронну
        const res = await fetch(url,{ // await - почекати
            method: 'POST',
            headers: {
                'Content-type':'application/json'
            },
            body: data
        })
        return await res.json()
    }

    function bindPostData(form) { // Зв'язує дані
        form.addEventListener('submit' , (event) => {
            event.preventDefault()
            
            const statusMessage = document.createElement('img')
            statusMessage.src=message.loading
            statusMessage.style.cssText =`
                display: block;
                margin: 0 auto;
            `
            form.insertAdjacentElement('afterend',statusMessage) // ставим після форми
            
            // XMLHttpRequest
            //#region 
            /*const request = new XMLHttpRequest()   

            request.open('POST', 'server.php')*/

            /* якщо ми юзаєм клас XMLHttpRequest то  |request.setRequestHeader('Content-type','multipart/form-data')| не потрібний!!!!!!!! */
            // request.setRequestHeader('Content-type','multipart/form-data')
            //-----------------------------------
            //const formData = new FormData(form) // Отримуєм дані з форми з допомогою класу  FormData 
            // in HTML завжди повинен бути тег name
            //request.send(formData) // Відправляєм дані на сервер
            //#endregion
            
            // Для JSON відправки
            //#region 
            /*const request = new XMLHttpRequest()   

            request.open('POST', 'server.php')

            request.setRequestHeader('Content-type','application/json')
            const formData = new FormData(form)
            const object = {} // для перетворення formData в JSON
            formData.forEach(function(key,value){
                object[key] = value // для перетворення formData в JSON
            })
            request.send(JSON.stringify(object)) */  // Відправляєм дані на сервер
            //-----------------------------------------------
            //#endregion

            const formData = new FormData(form) // Отримуєм дані з форми з допомогою класу  FormData 

            // Fetch API // Використовує проміси // Для роботи із сервером
            //  зручніший ніж XMLHttpRequest

            const json = JSON.stringify(Object.fromEntries(formData.entries())) // для перетворення formData в JSON
            

            postData('http://localhost:3000/requests',json)
            .then(data => {
                console.log(data)
                showThanksModal(message.success)
                statusMessage.remove()
            }).catch( () => {
                showThanksModal(message.fail)
            }).finally(() => {
                form.reset()
             })

            // EventListener('load') для JSON and XMLHttpRequest
            //#region 
            // request.addEventListener('load', (event) => {
            //     if (request.status === 200) {
            //         console.log(request.response)
            //         showThanksModal(message.success)
            //         form.reset()
            //         statusMessage.remove()
                  
            //     }else{showThanksModal(message.fail)
            //     }
            // })
            //#endregion

        })

        function showThanksModal(message) {
            const prevModalDialog = document.querySelector('.modal__dialog')

            prevModalDialog.classList.add('hide')
            openModal()

            const thanksModal = document.createElement('div')
            thanksModal.classList.add('modal__dialog')
            thanksModal.innerHTML = `
                <div class="modal__content">
                    <div class="modal__close" data-close>×</div>
                    <div class="modal__title">${message}</div>
                </div>
            `
            document.querySelector('.modal').append(thanksModal)
            setTimeout(() => {
                thanksModal.remove()
                prevModalDialog.classList.add('show')
                prevModalDialog.classList.remove('hide')
                
                closeModal()
                prevModalDialog.classList.remove('show')
            },3000)
            
        }
    }
 
// -----------------------------------------------------------

// json-server -- емуляція backend + встановив npm packet
// see documentation on git

    fetch('http://localhost:3000/menu')
    .then(data => data.json())
    //.then(res => console.log(res))

//-------------------------------------------------------



// Slider

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

    const btnPrev = document.querySelector('.offer__slider-prev'),
        btnNext = document.querySelector('.offer__slider-next'),
        currentPosition = document.querySelector("#current"),
        imagesSlider = document.querySelectorAll('.offer__slide'),
        slider = document.querySelector('.offer__slider'),
        totalSlides = document.querySelector('#total'),
        slidesField = document.querySelector('.offer__slider-inner'),
        slidesWrapper = document.querySelector('.offer__slider-wrapper'),
        width = window.getComputedStyle(slidesWrapper).width;

    let slideIndex = 1;
    currentPosition.innerHTML = getZero(slideIndex)
    let offset = 0 // Відступ

    function getZero(num) {
            if (num >= 0 && num <= 9) {
                return `0${num}`
                }else {return num;}
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
        currentPosition.innerHTML = getZero(slideIndex)
        dots.forEach(dot => dot.style.opacity = '.5')
        dots[slideIndex-1].style.opacity = '0.8'
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
        currentPosition.innerHTML = getZero(slideIndex)
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
            slideIndex = slideTO
            offset = +width.slice(0,width.length-2) * (slideTO-1)
            slidesField.style.transform = `translateX(-${offset}px)` // Сдвиг вліво

            if (imagesSlider.length < 10) {
                currentPosition.innerHTML = `0${slideIndex}`
            }else{currentPosition.innerHTML = `${slideIndex}`}

            dots.forEach(dot => dot.style.opacity = '.5')
        dots[slideIndex-1].style.opacity = '0.8'
        interval =  setInterval(nextSlide,5000)
        })
    })
// ------------------------------------------------



//  CALCULATOR | Рассчитаем вашу потребность в калориях? |

    const result = document.querySelector('.calculating__result span')
    let sex,height,weight , age , ratio,ratios;

    // використовуєм вибрані юзером дані
    if (localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex')
        initLocalSettings('#gender div','calculating__choose-item_active')
    } else{
        sex = 'male'
        localStorage.setItem('sex','male')
    }
    if (localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio')
        initLocalSettings('.calculating__choose_big div','calculating__choose-item_active')

    }else {
        ratios = document.querySelectorAll('.calculating__choose_big div');
    ratios.forEach(arr =>{ 
         if ( arr.classList.contains('calculating__choose-item_active')) {
            ratio = arr.getAttribute('data-ratio')
            localStorage.setItem('ratio',arr.getAttribute('data-ratio'))
         }
        })
    }

    // Функія провіряє чи юзер вводив якісь дані,якщо так ,то вставляє їх при перезагрузці сторінки

    function initLocalSettings(selector,activeClass){
        const elements = document.querySelectorAll(selector)

        elements.forEach(elem => {
            elem.classList.remove(activeClass)
            if(elem.getAttribute('id') === localStorage.getItem('sex')){
                elem.classList.add(activeClass)
            }
            if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                elem.classList.add(activeClass)
            }
        })
    }
    
    //------------------------------
    calcTotal()

    function calcTotal() {
        if (!sex || !height || !weight || !age || !ratio ) {
            result.textContent = "____"
            return // Перериваєм виконання
        }

        if(sex === 'female') {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) *ratio)
        }else{
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) *ratio)
            }
    }

    

    function getStaticInformation(selector,activeClass) {
        const elements = document.querySelectorAll(`${selector}`)

        elements.forEach(elem => {
        elem.addEventListener('click' , (event) => {
            if(event.target.getAttribute('data-ratio')) { // вибираєм блок  | Выберите вашу физическая активность |
                ratio = +event.target.getAttribute('data-ratio') // в кожної типи активності є своє  значення
                localStorage.setItem('ratio',+event.target.getAttribute('data-ratio')) // Запам'ятовуєм вибрані юзером дані
            }else /* вибираєм стать */{
                sex = event.target.getAttribute('id')
                localStorage.setItem('sex',event.target.getAttribute('id'))
            }
            
            elements.forEach(elem => {
                elem.classList.remove(activeClass)
            })

            event.target.classList.add(activeClass)
            calcTotal()
            })
        })
    }

    getStaticInformation('#gender div','calculating__choose-item_active') // для статі
    getStaticInformation('.calculating__choose_big div','calculating__choose-item_active')

    function getDynamicInformation(selector) {
        const input = document.querySelector(selector)

        input.addEventListener('input',(event) => {

            if (input.value.match(/\D/g)) {  // Якщо введено не число
                input.style.border = '1px solid red'
            }else{
                input.style.border = 'none'
            }

            switch(input.getAttribute('id')){
                case "height":
                    height =+input.value
                    break
                case "weight":
                    weight =+input.value
                    break
                case "age":
                    age = +input.value
            }
            calcTotal()
        })
    }

    getDynamicInformation('#height')
    getDynamicInformation('#weight')
    getDynamicInformation('#age')
//------------------------------------------------------------

})