function openModal (modalSelector,modalTimerId,showModalByScroll) {
    const  modal = document.querySelector(modalSelector);
    modal.classList.add('show')
    modal.classList.remove('hide')
    document.body.style.overflow = 'hidden' // забираєм прокрутку сторінки
    if (modalTimerId) {
    clearInterval(modalTimerId) // Якщо юзер сам відкрив вікно то воне вже не покажеться
    }
    if (showModalByScroll){
    window.removeEventListener('scroll',showModalByScroll)
    }
    }

function closeModal(modalSelector) {
    const  modal = document.querySelector(modalSelector);
        modal.classList.remove('show')
    modal.classList.add('hide')
    document.body.style.overflow = '' // вертаєм прокрутку сторінки
    }

function feedback(triggerSelector, modalSelector,modalTimerId,showModalByScroll) {
    const modalTriggers = document.querySelectorAll(triggerSelector),
    modal = document.querySelector(modalSelector);
    

   


    modalTriggers.forEach(btn => {      
    btn.addEventListener('click' ,() => openModal(modalSelector,modalTimerId,showModalByScroll))
    })




    modal.addEventListener('click', (event) => { /* Коли клікаєм за межі всплаючого вікна , 
    то воно теж закривається  */
    if (event.target === modal || event.target.getAttribute('data-close') == '' /*  Якщо  клікнули на хрестик */)  {
        closeModal(modalSelector)
    }
    })

    document.addEventListener('keydown', (event) => {
    if (event.code === 'Escape' && modal.classList.contains('show')) {
        closeModal(modalSelector)
    }
    })

    

 
    window.addEventListener('scroll', showModalByScroll)
}

export default feedback
export {closeModal}
export {openModal}