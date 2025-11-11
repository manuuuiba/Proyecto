// Funcionalidad del carrito
(function () {
    const STORAGE_KEY = 'manutoys_cart';

    // Funciones de utilidad para el carrito
    function getCart() {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
        } catch {
            return [];
        }
    }

    function saveCart(cart) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
        updateCartCount();
    }

    function updateCartCount() {
        const cart = getCart();
        const count = cart.reduce((s, it) => s + (it.qty || 0), 0);
        const countElement = document.getElementById('cartCount');
        if (countElement) {
            countElement.textContent = count;
            countElement.style.display = count ? 'inline-block' : 'none';
        }
    }

    function formatCurrency(n) {
        return '$' + n.toFixed(2);
    }

    // Funciones principales del carrito
    function addToCart(item) {
        const cart = getCart();
        const idx = cart.findIndex(i => i.id === item.id);
        if (idx > -1) {
            cart[idx].qty += 1;
        } else {
            cart.push({ ...item, qty: 1 });
        }
        saveCart(cart);
    }

    function removeFromCart(id) {
        let cart = getCart();
        cart = cart.filter(i => i.id !== id);
        saveCart(cart);
    }

    function changeQty(id, qty) {
        const cart = getCart();
        const idx = cart.findIndex(i => i.id === id);
        if (idx > -1) {
            cart[idx].qty = Math.max(1, qty);
            saveCart(cart);
        }
    }

    // Renderizado del carrito
    function renderCart() {
        const container = document.getElementById('cartItemsContainer');
        const cart = getCart();
        
        if (!container) return;
        
        container.innerHTML = '';
        
        if (!cart.length) {
            document.getElementById('cartEmpty').style.display = 'block';
            document.getElementById('cartTotal').textContent = formatCurrency(0);
            return;
        }
        
        document.getElementById('cartEmpty').style.display = 'none';

        const list = document.createElement('div');
        list.className = 'list-group';

        let total = 0;
        cart.forEach(item => {
            const itemTotal = item.price * item.qty;
            total += itemTotal;

            const el = document.createElement('div');
            el.className = 'list-group-item d-flex align-items-center';
            el.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="me-3" style="width:56px;height:40px;object-fit:cover;border-radius:4px;">
                <div class="flex-fill">
                    <div class="d-flex justify-content-between">
                        <div>
                            <strong>${item.name}</strong>
                            <div class="small text-muted">${formatCurrency(item.price)} c/u</div>
                        </div>
                        <div class="text-end">
                            <div class="input-group input-group-sm mb-1" style="width:110px;">
                                <button class="btn btn-outline-secondary btn-decrease" data-id="${item.id}" type="button">-</button>
                                <input type="text" class="form-control text-center qty-input" data-id="${item.id}" value="${item.qty}" aria-label="Cantidad">
                                <button class="btn btn-outline-secondary btn-increase" data-id="${item.id}" type="button">+</button>
                            </div>
                            <div class="small">Subtotal: <strong>${formatCurrency(itemTotal)}</strong></div>
                            <button class="btn btn-sm btn-link text-danger mt-1 remove-item" data-id="${item.id}">Eliminar</button>
                        </div>
                    </div>
                </div>
            `;
            list.appendChild(el);
        });
        
        container.appendChild(list);
        document.getElementById('cartTotal').textContent = formatCurrency(total);

        // Event listeners para elementos dinámicos
        setupCartListeners(container);
    }

    function setupCartListeners(container) {
        // Eliminar items
        container.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', () => {
                removeFromCart(btn.dataset.id);
                renderCart();
            });
        });

        // Aumentar cantidad
        container.querySelectorAll('.btn-increase').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.dataset.id;
                const inp = container.querySelector('.qty-input[data-id="' + id + '"]');
                changeQty(id, parseInt(inp.value || '1', 10) + 1);
                renderCart();
            });
        });

        // Disminuir cantidad
        container.querySelectorAll('.btn-decrease').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.dataset.id;
                const inp = container.querySelector('.qty-input[data-id="' + id + '"]');
                const newQty = Math.max(1, parseInt(inp.value || '1', 10) - 1);
                changeQty(id, newQty);
                renderCart();
            });
        });

        // Input de cantidad
        container.querySelectorAll('.qty-input').forEach(inp => {
            inp.addEventListener('change', () => {
                const id = inp.dataset.id;
                const val = parseInt(inp.value || '1', 10);
                changeQty(id, Math.max(1, isNaN(val) ? 1 : val));
                renderCart();
            });
        });
    }

    // Event Listeners Globales
    document.addEventListener('DOMContentLoaded', function() {
        // Botón añadir al carrito
        document.addEventListener('click', function (e) {
            const target = e.target;
            if (target.classList.contains('add-to-cart')) {
                const id = target.dataset.id;
                const name = target.dataset.name;
                const price = parseFloat(target.dataset.price) || 0;
                const image = target.dataset.image || '';
                addToCart({ id, name, price, image });
                
                // Feedback visual
                target.classList.remove('btn-success');
                target.classList.add('btn-outline-success');
                setTimeout(() => {
                    target.classList.remove('btn-outline-success');
                    target.classList.add('btn-success');
                }, 300);
            }
        });

        // Botón vaciar carrito
        const clearCartBtn = document.getElementById('clearCartBtn');
        if (clearCartBtn) {
            clearCartBtn.addEventListener('click', () => {
                localStorage.removeItem(STORAGE_KEY);
                renderCart();
            });
        }

        // Botón checkout
        const checkoutBtn = document.getElementById('checkoutBtn');
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', () => {
                const cart = getCart();
                if (!cart.length) {
                    alert('El carrito está vacío.');
                    return;
                }
                window.location.href = 'checkout.html';
            });
        }

        // Renderizar carrito al abrir el modal
        const cartModal = document.getElementById('cartModal');
        if (cartModal) {
            cartModal.addEventListener('show.bs.modal', renderCart);
        }

        // Inicializar contador del carrito
        updateCartCount();
    });
})();

