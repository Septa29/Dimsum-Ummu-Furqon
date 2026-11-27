import {
    renderMenu,
    setCategory,
    adjustQuantity,
    cartRender
} from "./menu.js";

document.addEventListener('DOMContentLoaded', () => {

    // Menu
    const menuContainer = document.querySelector(
        '[data-menu-filter]'
    );

    renderMenu(menuContainer);

    // Cart elements
    const cartSummary = document.querySelector(
        '[data-cart-list]'
    );

    const cartBadges = document.getElementById(
        'cart-badges'
    );

    // Initial cart render
    cartRender(cartSummary, cartBadges);

    // Filter menu
    document.querySelectorAll('[data-filter-menu]')
        .forEach((btn) => {
            btn.addEventListener('click', () => {

                document.querySelectorAll('[data-filter-menu]')
                    .forEach((el) => {
                        el.classList.remove('active');
                        el.setAttribute('aria-selected', 'false');
                    });

                btn.classList.add('active');
                btn.setAttribute('aria-selected', 'true');

                setCategory(btn.dataset.category, menuContainer);
            });
        });

    // Cart event delegation
    menuContainer?.addEventListener('click', (event) => {

        const actionBtn = event.target.closest(
            'button[data-action]'
        );

        if (!actionBtn) return;

        const { id, action } = actionBtn.dataset;

        adjustQuantity(
            id,
            action === 'inc' ? 1 : -1,
            menuContainer
        );

        cartRender(cartSummary, cartBadges);
    });

});