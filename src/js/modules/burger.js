const burger = (menuSelector, burgerSelector) => { 
    const menuElement = document.querySelector(menuSelector),
          burgerElem = document.querySelector(burgerSelector);

    menuElement.style.display = 'none';

    // при клике на бургер
    burgerElem.addEventListener('click', () => {
        if (menuElement.style.display == 'none' && window.screen.availWidth < 993) {
            menuElement.style.display = 'block';
        } else {
            menuElement.style.display = 'none';
        }
    });

    window.addEventListener('resize', () => {
        if (window.screen.availWidth > 992) {
            menuElement.style.display = 'none';
        }
    });

    // закрытие при клике вне меню и бургера
    document.addEventListener('click', (e) => {
        //e — это объект события (event), в нём есть инфа: куда кликнули, чем, когда и т.д.
        if (menuElement.style.display = 'block' && !menuElement.contains(e.target) && !burgerElem.contains(e.target)) { //меню открыто, И клик вне меню, И клик не по бургеру
            menuElement.style.display = 'none';
        }
    });

    burgerElem.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    menuElement.addEventListener('click', (e) => {
        e.stopPropagation();
    });
};

export default burger;