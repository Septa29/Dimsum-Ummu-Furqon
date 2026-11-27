import { renderMenu, setCategory, adjustQuantity } from "./menu.js";

document.addEventListener('DOMContentLoaded', () => {



    // menu
    const menuContainer = document.querySelector('[data-menu-filter]');
    renderMenu(menuContainer);

    document.querySelectorAll('[data-filter-menu]').forEach((btn) => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('[data-filter-menu]').forEach((el) => el.classList.remove('active'));
            btn.classList.add('active');
            setCategory(btn.dataset.category, menuContainer);
        })
    });

    menuContainer?.addEventListener('click', (event) => {
        const actionBtn = event.target.closest('button[data-action]');

        if(!actionBtn) return;

        const {id, action} = actionBtn.dataset;
        adjustQuantity(id, action === 'inc' ? 1 : -1, menuContainer)
    })
})