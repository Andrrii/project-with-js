const exports = require("webpack");

function calc() {
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
}

export default calc