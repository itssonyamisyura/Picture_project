import modals from "./modules/modals";
import sliders from "./modules/sliders";

// скрипты начинают выполнятся когда готова dom структура(не включается загрузка стилей, изобр..)
window.addEventListener('DOMContentLoaded', () => {
    'use strict';
    
    modals();
    sliders('.feedback-slider-item', 'horizontal', '.main-prev-btn', '.main-next-btn');
    sliders('.main-slider-item', 'vertical');
});
