function cards() {
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
    async function getResource(url)  { // async and await роблять з асинхронной функції - синхронну
        const res = await fetch(url) // await - почекати
           
        if(!res.ok) /* Якщо помилка(наприклад 404 ) то викидаєм помилкм */ {
            throw new Error(`Could not fetch ${url} , status: ${res.status}`)
        }

        return await res.json()
    }

    // First variant
    // getResource('http://localhost:3000/menu') 
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
 

}

export default  cards