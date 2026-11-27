const MENU_ITEMS = [
    {
        id: '001',
        name: 'Dimsum Goreng Keju',
        image: './assets/logo/fujisan.jpg',
        category: 'goreng',
        price: 10000,
        tag: 'Bestseller',
        tagType: 'bestseller',
        description: 'Dimsum goreng dengan keju lumer di dalam'
    },
    {
        id: '002',
        name: 'Dimsum Goreng Keju Mentai',
        image: './assets/logo/fujisan.jpg',
        category: 'mentai',
        price: 10000,
        tag: 'Saus',
        tagType: 'artisan',
        description: 'Dimsum goreng dengan keju lumer di dalam dan saus mentai'
    },
    {
        id: '003',
        name: 'Dimsum Kukus Ayam',
        image: './assets/logo/fujisan.jpg',
        category: 'kukus',
        price: 10000,
        tag: 'Original',
        tagType: 'artisan',
        description: 'Dimsum kukus original dengan isian daging ayam'
    },
    {
        id: '004',
        name: 'Dimsum Kukus Ayam isi Keju',
        category: 'kukus',
        image: './assets/logo/fujisan.jpg',
        price: 10000,
        tag: 'Original',
        tagType: 'artisan',
        description: 'Dimsum kukus original dengan isian daging ayam dengan keju'
    }
]

const state = {
    category: 'All',
    cart: {}
}

function formatPrice(amount){
    return `Rp ${amount.toLocaleString('id-ID')}`;
}

export function renderMenu(containerEl){
    if(!containerEl) return;

    const visibleItem = state.category === 'All' ? MENU_ITEMS : MENU_ITEMS.filter((item) => item.category === state.category);

    containerEl.innerHTML = visibleItem.map((item) => {
        const qty = state.cart[item.id] || 0;
        return `<article class="menu-card" data-id="${item.id}">
          <img src="${item.image}" alt="foto dimsum">
          <h3>${item.name}</h3>
          <p class="card-desk">${item.description}</p>
          <div class="card-num">
          <p class="price">${formatPrice(item.price)}</p>
          <div class="qty-controls">
            <button type="button" data-action="dec" data-id="${item.id}" aria-label="Kurangi ${item.name}">-</button>
            <span class="qty-value">${qty}</span>
            <button type="button" data-action="inc" data-id="${item.id}" aria-label="Tambah ${item.name}">+</button>
          </div>
          </div>
        </article>
        `;
    })
    .join('');
}

export function setCategory(category, containerEl){
    state.category = category;
    renderMenu(containerEl)
}

export function adjustQuantity(itemId, delta, containerEl){
    const current = state.cart[itemId] || 0;
    state.cart[itemId] = Math.max(0, current + delta);
    renderMenu(containerEl)
}