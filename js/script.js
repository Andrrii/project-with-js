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
           
                <img src="img/tabs/${this.src}" alt=${this.alt}>
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

    const card1 = new OurMenu(
        'vegy.jpg',
        'vegy',
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        11,
        '.menu .container',
        'big'
    )
    card1.render()

    const card2 = new OurMenu(
        'elite.jpg',
        'elite',
        'Меню “Премиум”',
        'В меню “Премиум” мы используем  не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        21,
        '.menu .container'
    )
    card2.render()

    const card3 = new OurMenu(
        'post.jpg',
        'post',
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        18,
        '.menu .container'
    )
    card3.render()



//----------------------------------------------------------------------

// Отримуєм дані з форми  без перезагрузки сторінки

  const forms = document.querySelectorAll('form'),
        message ={
            loading : 'img/form/spinner.svg',
            success: "Дякуємо ! Найбижчим часом  ми   зателефонуємо вам",
            fail:"Ой! Щось не так :( "
        };

    forms.forEach(item => {
        postData(item)
    })

    function postData(form) {
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

            const object = {} // для перетворення formData в JSON
            formData.forEach(function(value,key){
                object[key] = value // для перетворення formData в JSON
            })
            fetch('server.php', {
                method: 'POST',
                 headers: {
                     'Content-type':'application/json'
                 },
                body: JSON.stringify(object)
            }).then(data => data.text())
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
    .then(res => console.log(res))

//-------------------------------------------------------


})