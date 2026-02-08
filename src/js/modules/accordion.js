const accordion = (triggersSelector) => {
    const btns = document.querySelectorAll(triggersSelector);

    function removeActiveClass(clickedBtn) {
        btns.forEach(btn => {
            if (btn !== clickedBtn) {
                btn.classList.remove('active-style');
                btn.nextElementSibling.classList.remove('active-content');
                btn.nextElementSibling.style.maxHeight = '0px';
            }
        });
    };

    btns.forEach(btn => {
        btn.addEventListener('click', function() {
            removeActiveClass(this);
            this.classList.toggle('active-style');
            //toggle - if element doesnt have certain class-toggle adds it, if it has-toggle removes 
            this.nextElementSibling.classList.toggle('active-content');

            if (this.classList.contains('active-style')) {
                // this.nextElementSibling.style.maxHeight = this.nextElementSibling.scrollHeight + 80 + 'px';
                this.nextElementSibling.style.maxHeight = 'unset';
                //scrollHeight - высота контента в элементе
            } else {
                this.nextElementSibling.style.maxHeight = '0px';
            }
        });
    });


    //       blocks = document.querySelectorAll(itemsSelector);

    // blocks.forEach(block => {
    //     block.classList.add('animated', 'fadeInDown');
    // });

    // btns.forEach(btn => {
    //     btn.addEventListener('click', function() {
    //         //является ли элемент активным
    //         if (!this.classList.contains('active')) {
    //             btns.forEach(btn => {
    //                 btn.classList.remove('active', 'active-style');
    //             });
    //             this.classList.add('active', 'active-style');
    //         }
    //     });
    // });
};


// изначально контент скрыт .often-questions .accordion-block { display: none;
// как только .accordion-heading.active+.accordion-block --> след accordion-block будет показан
export default accordion;