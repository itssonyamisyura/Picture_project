const modals = () => {
    // была ли нажата хоть одна кнопка
    let btnPressed = false;


    function bindModal(triggerSelector, modalSelector, closeSelector, destroy = false) {
        const trigger = document.querySelectorAll(triggerSelector),
              modal = document.querySelector(modalSelector),
              close = document.querySelector(closeSelector),
              windows = document.querySelectorAll('[data-modal]'),
              scroll = calcScroll();

        trigger.forEach(item => {
            item.addEventListener('click', (e) => {
                if (e.target) {
                    e.preventDefault(); 
    
                btnPressed = true;

                if (destroy) { // if = true
                    item.remove();
                }  

                if (triggerSelector === '.popup_calc_button') {
                    const widthInput  = document.querySelector('#width');
                    const heightInput = document.querySelector('#height');

                if (!widthInput.value.trim() || !heightInput.value.trim()) {
                        // не даём открыть следующее окно
                        item.classList.add('shake');
                        setTimeout(() => item.classList.remove('shake'), 600);
                        return;
                    }
                }

                if (triggerSelector === '.popup_calc_profile_button') {
                    // берём именно input'ы с чекбоксами
                    const profileCheckboxes = document.querySelectorAll('.checkbox');
                
                    // хотя бы один должен быть .checked === true
                    const isChecked = Array.from(profileCheckboxes).some(cb => cb.checked);
                
                    if (!isChecked) {
                        item.classList.add('shake');
                        setTimeout(() => item.classList.remove('shake'), 600);
                        return;
                    }
                }

                
                windows.forEach(item => {
                    item.style.display = 'none';
                    item.classList.add('animated', 'fadeIn');
                });

                modal.style.display = "block";
                document.body.style.overflow = 'hidden'; // отключаем скролл страницы, когда открыто модальное окно
                document.body.style.marginRight = `${scroll}px`; // добавили отступ
                }
            });
        });

        close.addEventListener('click', () => {
            windows.forEach(item => {
                item.style.display = 'none';
            });
            
            modal.style.display = "none";
            document.body.style.overflow = "";
            document.body.style.marginRight = `0px`;
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                windows.forEach(item => {
                item.style.display = 'none';
                });

                modal.style.display = "none";
                document.body.style.overflow = "";
                document.body.style.marginRight = `0px`;
            }
        });
    }

    function showModalByTime(selector, time) {
        setTimeout(function() {
            let display; //false=undefined

            document.querySelectorAll('[data-modal]').forEach(item => {
                if (getComputedStyle(item).display !== 'none') { // если каждое модальное окно будет показано пользователю
                    display = "block"; //true
                }
            });

            if (!display) { // если не одно окно не показывается, показываем то окно, что нужно
                document.querySelector(selector).style.display = "block";
                document.body.style.overflow = 'hidden';
                let scroll = calcScroll();
                document.body.style.marginRight = `${scroll}px`;
            }
        }, time);
    }


    function calcScroll() {
        let div = document.createElement('div');

        div.style.width = '50px';
        div.style.height = '50px';
        div.style.overflowY = 'scroll';
        div.style.visibility = 'hidden';

        document.body.appendChild(div);

        let scrollWidth = div.offsetWidth - div.clientWidth;
        div.remove();

        return scrollWidth;
    }
    
    function openByScroll(selector) {
        window.addEventListener('scroll', () => {
            // если пользователь долистал страницу до конца, но не нажал ни одну кнопку
            
            //оптимизация под старый браузер
            let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight)

            if (!btnPressed && (window.pageYOffset + document.documentElement.clientHeight >= scrollHeight)) { 
                document.querySelector(selector).click();
            }
        });
    }

    bindModal('.button-design', '.popup-design', '.popup-design .popup-close');
    bindModal('.button-consultation', '.popup-consultation', '.popup-consultation .popup-close');
    bindModal('.fixed-gift', '.popup-gift', '.popup-gift .popup-close', true);
    openByScroll('.fixed-gift');

    // showModalByTime('.popup-consultation', 6000); 
};

export default modals;


// closeClickOverlay = true --> необходимо ли нам закрывать модальное окно при клике на подложку(изначально закрываем)