function tabs(tabsSelector,tabsContentSelector,tabsParentSelector,activeClass) {
    const tabs = document.querySelectorAll(tabsSelector),
    tabsContent =document.querySelectorAll(tabsContentSelector),
    tabsParent = document.querySelector(tabsParentSelector)

    function hideTabContent() {
        tabsContent.forEach(item =>{
            item.classList.remove('show' , 'fade')
            item.classList.add('hide')
            
        })

        tabs.forEach(item => {
            item.classList.remove(activeClass)
        })
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.remove('hide')
        tabsContent[i].classList.add('show' , 'fade')
        tabs[i].classList.add(activeClass)
    }
    hideTabContent()
    showTabContent()

    tabsParent.addEventListener('click',(event) => { // перебираєм |стиль питания|
        const target = event.target

        if (target && target.classList.contains(tabsSelector.slice(1)/* видаляєм точку спереді */)) {
            tabs.forEach( (item,i) => {
                if (target === item) {
                    hideTabContent()
                    showTabContent(i)
                }
            })
        }
    })
}

export default tabs

