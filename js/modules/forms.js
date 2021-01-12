import {closeModal,openModal} from './feedback';
import {postData} from '../services/services'

function forms(formSelector,modalTimerId,showModalByScroll) {
    
  const forms = document.querySelectorAll(formSelector),
  message ={
      loading : 'img/form/spinner.svg',
      success: "Дякуємо ! Найбижчим часом  ми   зателефонуємо вам",
      fail:"Ой! Щось не так :( "
  };

    forms.forEach(item => {
    bindPostData(item)
    })

   

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
      openModal('.modal',modalTimerId,showModalByScroll)

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
          
          closeModal('.modal')
          prevModalDialog.classList.remove('show')
      },3000)
      
  }
}
}

export default forms