function timer(id,deadline) {
    function getTimeRemaining (endtime) { /* Отримує різницю між датами */
        const t = Date.parse(endtime) - new Date(),
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

    setClock(id,deadline)
}

export default timer