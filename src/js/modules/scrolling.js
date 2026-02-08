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

    //плавный скролл
    const element = document.documentElement,
          body = document.body;
        
    const calcScroll = () => {
        upElem.addEventListener('click', function(event) {
            let scrollTop = Math.round(body.scrollTop || element.scrollTop);
            
            if (this.hash !== '') {
                event.preventDefault();
                let hashElement = document.querySelector(this.hash),
                // or document.getElementById(this.hash.substring(1)), //получаем строчку без #
                    hashElementTop = 0;

                while (hashElement.offsetParent){ 
                    //offsetParent-элемент, относительно которого будет hashElement
                    //offsetTop-сколько px до верхней границы родительского элемента
                    hashElementTop += hashElement.offsetTop;
                    hashElement = hashElement.offsetParent;
                }

                hashElementTop = Math.round(hashElementTop);

                smoothScroll(scrollTop, hashElementTop, this.hash);
            }
        });
    };

    const smoothScroll = (from, to, hash) => {
        let timeInterval = 1,
            prevScrollTop,
            speed;
        
        if (to > from) {
            speed = 30; //сверху вниз
        } else {
            speed = -30;
        }

        let move = setInterval(function() {
            let scrollTop = Math.round(body.scrollTop || element.scrollTop);

            if (
                prevScrollTop === scrollTop || 
                (to > from && scrollTop >= to) ||
                (to < from && scrollTop <= to)
            ) {
                clearInterval(move);
                history.replaceState(history.state, document.title, location.href.replace(/#.*$/g, '') + hash);
            } else {
                body.scrollTop += speed;
                element.scrollTop += speed;
                prevScrollTop = scrollTop;
            }
        }, timeInterval);
    };
    
    calcScroll();
};

export default scrolling;