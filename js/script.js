import tabs from './modules/tabs'; // WEBPACK
import timer  from './modules/timer'; // WEBPACK
import feedback  from './modules/feedback'; // WEBPACK
import cards from './modules/cards'; // WEBPACK
import forms from './modules/forms'; // WEBPACK
import slider from './modules/slider';
import calc  from './modules/calc' ;// WEBPACK
import {openModal} from './modules/feedback'

document.addEventListener("DOMContentLoaded",() => { /* js чекає загрузки DOM дерева */ 
    const modalTimerId = setTimeout( () => openModal('.modal',modalTimerId,showModalByScroll),150000) // 2.5 hv
    const showModalByScroll = function  () {
        /* Коли користувач долистав до кінця сторінки ,
            то відкриється модальне вікно */ 
            if (  /* подивитись урок 42 */
                window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) 
            {
            const bottomModalTimerId = setTimeout( () => openModal('.modal',modalTimerId,showModalByScroll),2500)
                //    console.log(bottomModalTimerId)
                //    clearInterval(bottomModalTimerId)
            }
        }
// WEBPACK
    // tabs | Выберите стиль питания |

        
        tabs('.tabheader__item','.tabcontent','.tabheader__items' ,'tabheader__item_active')
    // ------------------------------------------------------------

    // Timer  |Осталось до конца акции: |

        
        timer('.timer','2021-01-21')
    // ------------------------------------------------------------


    // При натисненні на кнопку "Зв'язатись з нами" викликаєм модальне вікно

    
    feedback("[data-modal]",'.modal',modalTimerId,showModalByScroll)
//----------------------------------------------------------------------

//----------    Перероблюєм карточки меню

    
    cards()
//----------------------------------------------------------------------

// Отримуєм дані з форми  без перезагрузки сторінки
    
    forms('form',modalTimerId,showModalByScroll)
// -----------------------------------------------------------

// json-server -- емуляція backend + встановив npm packet
// see documentation on git

    fetch('http://localhost:3000/menu')
    .then(data => data.json())
    //.then(res => console.log(res))

//-------------------------------------------------------



// Slider
      
        slider({
            btnPrevD: '.offer__slider-prev',
            btnNextD: '.offer__slider-next',
            currentPositionD: "#current",
            imagesSliderD: '.offer__slide',
            sliderD: '.offer__slider',
            slidesFieldD: '.offer__slider-inner',
            slidesWrapperD:'.offer__slider-wrapper'
            
        })
// ------------------------------------------------



//  CALCULATOR | Рассчитаем вашу потребность в калориях? |

    
    calc()
//------------------------------------------------------------

})