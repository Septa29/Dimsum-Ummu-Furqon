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

// cart

export function getCartSummary() {
    let totalCount = 0;
    let totalPrice = 0;

    const items = Object.entries(state.cart)
        .filter(([, qty]) => qty > 0)
        .map(([id, qty]) => {
            const menu = MENU_ITEMS.find(
                (item) => item.id === id
            );

            if (!menu) return null;

            const subtotal = menu.price * qty;

            totalCount += qty;
            totalPrice += subtotal;

            return {
                ...menu,
                qty,
                subtotal
            };
        })
        .filter(Boolean);

    return {
        items,
        totalCount,
        totalPrice
    };
}

export function cartRender(cartListEl, cartCountEl) {
    const { items, totalCount, totalPrice } = getCartSummary();

    // Update badge
    if (cartCountEl) {
        cartCountEl.textContent = totalCount;
    }

    // Update ringkasan cart
    if (!cartListEl) return;

    if (items.length === 0) {
        cartListEl.innerHTML = `
            <i class="fa-solid fa-bag-shopping"></i>
            <div>
                <h3 class="cart-desk">
                    Belum ada item yang dipilih
                </h3>
                <p class="cartAdd-info">
                    Tambahkan item untuk melakukan pemesanan
                    langsung ke WhatsApp
                </p>
            </div>
        `;

        return;
    }

    cartListEl.innerHTML = `
        <i class="fa-solid fa-bag-shopping"></i>
        <div>
            <h3 class="cart-desk">
                ${totalCount} Item dipilih
            </h3>

            <p class="cartAdd-info">
                Total: ${formatPrice(totalPrice)}
            </p>

            <ul class="cart-items">
                ${items.map(item => `
                    <li>
                        ${item.name} × ${item.qty}
                        — ${formatPrice(item.subtotal)}
                    </li>
                `).join('')}
            </ul>
        </div>
    `;
}

export function setCategory(category, containerEl){
    state.category = category;
    renderMenu(containerEl)
}

export function adjustQuantity(itemId, delta, containerEl){
    const current = state.cart[itemId] || 0;
    const next = Math.max(0, current + delta);
    if(next=== 0){
        delete state.cart[itemId]
    }else{
        state.cart[itemId] = next
    }
    renderMenu(containerEl)
    getCartSummary()
}

