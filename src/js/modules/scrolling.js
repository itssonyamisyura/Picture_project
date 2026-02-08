import { setInterval } from "core-js";

const scrolling = (upSelector) => {
    const upElem = document.querySelector(upSelector);

    window.addEventListener('scroll', () => {
        if (document.documentElement.scrollTop > 1650) {
            upElem.classList.add('animated', 'fadeIn');
            upElem.classList.remove('fadeOut');
        } else {
            upElem.classList.add('fadeOut'); //скрываем
            upElem.classList.remove('fadeIn')
        }
    });

    // Scrolling with Request Animation Frame

    let links = document.querySelectorAll('[href^="#"]'),
        speed = 0.1;

    links.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();

            let widthTop = document.documentElement.scrollTop,
                hash = this.hash,
                toBlock = document.querySelector(hash).getBoundingClientRect().top,
                start = null;

            requestAnimationFrame(step);

            function step(time) {
                if (start === null) {
                    start = time;
                }

                let progress = time - start,
                    r = (toBlock < 0 ? Math.max(widthTop - progress/speed, widthTop + toBlock) : Math.min(widthTop + progress/speed, widthTop + toBlock)); 
                    // кол-во px, которое нужно пролистать в течение анимации

                    document.documentElement.scrollTo(0, r);

                if (r != widthTop + toBlock) {
                    requestAnimationFrame(step);
                } else {
                    location.hash = hash;
                }
            }
        });
    });




    // Pure JS scrolling

    //плавный скролл - в разных браузерах scroll хранится либо тут, либо тут.
    // const element = document.documentElement,
    //       body = document.body;
        
    // const calcScroll = () => {
    //     upElem.addEventListener('click', function(event) {
    //         let scrollTop = Math.round(body.scrollTop || element.scrollTop);
            
    //         if (this.hash !== '') {
    //             event.preventDefault();
    //             let hashElement = document.querySelector(this.hash), //получаем элемент, к которому нужно проскроллить
    //             // or document.getElementById(this.hash.substring(1)), //получаем строчку без #
    //                 hashElementTop = 0;

    //             while (hashElement.offsetParent){ 
    //                 //Сколько пикселей от верха страницы до элемента
    //                 //offsetParent-элемент, относительно которого будет hashElement
    //                 //offsetTop-сколько px до верхней границы родительского элемента
    //                 hashElementTop += hashElement.offsetTop;
    //                 hashElement = hashElement.offsetParent;
    //             }

    //             hashElementTop = Math.round(hashElementTop);

    //             smoothScroll(scrollTop, hashElementTop, this.hash);
    //         }
    //     });
    // };

    // const smoothScroll = (from, to, hash) => {
    //     let timeInterval = 1, //каждые 1мс двигаем страницу
    //         prevScrollTop,
    //         speed;
        
    //     if (to > from) {
    //         speed = 30; //сверху вниз
    //     } else {
    //         speed = -30;
    //     }

    //     let move = setInterval(function() {
    //         let scrollTop = Math.round(body.scrollTop || element.scrollTop);

    //         if (
    //             prevScrollTop === scrollTop || 
    //             (to > from && scrollTop >= to) ||
    //             (to < from && scrollTop <= to)
    //         ) {
    //             clearInterval(move);
    //             history.replaceState(history.state, document.title, location.href.replace(/#.*$/g, '') + hash); //Добавляет #top в адресную строку, но без перезагрузки страницы
    //         } else {
    //             body.scrollTop += speed;
    //             element.scrollTop += speed;
    //             prevScrollTop = scrollTop;
    //         }
    //     }, timeInterval);
    // };

    // calcScroll();
};

export default scrolling;