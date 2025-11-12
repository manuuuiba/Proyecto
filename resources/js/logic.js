// ÁMBITO DE FUNCIONALIDAD GLOBAL (IIFE)
(function () {
    const STORAGE_KEY = 'manutoys_cart';

    // Base de datos de productos (reemplaza el contenido estático de productos.html)
    const allProducts = [
        {
            id: 'hw-porsche-911',
            name: 'Porsche 911 GT3',
            brand: 'hotwheels',
            description: 'Edición premium: chasis metálico, llantas de goma y detalles realistas.',
            price: 250.00,
            image: 'resources/images/hw-modal-1.jpg',
            stock: 'stock'
        },
        {
            id: 'hw-skyline',
            name: 'Nissan Skyline GT-R LBWK',
            brand: 'hotwheels',
            description: 'Réplica con acabados especiales y pintura edición limitada.',
            price: 400.00,
            image: 'resources/images/hw-modal-2.jpg',
            stock: 'none'
        },
        {
            id: 'hw-aston-v8',
            name: 'Aston Martin V8',
            brand: 'hotwheels',
            description: 'Detalle de faros y calcas, ideal para coleccionistas.',
            price: 190.00,
            image: 'resources/images/hw-modal-3.jpg',
            stock: 'stock'
        },
        {
            id: 'mgt-porsche-911',
            name: 'Porsche 911 GT3',
            brand: 'minigt',
            description: 'Modelado con altos niveles de detalle y acabados realistas.',
            price: 300.00,
            image: 'resources/images/mgt-modal-1.jpg',
            stock: 'stock'
        },
        {
            id: 'mgt-rx7',
            name: 'Mazda RX-7 REAmemiya',
            brand: 'minigt',
            description: 'Incluye espejos, alerón y detalles de carrocería fieles al original.',
            price: 280.00,
            image: 'resources/images/mgt-modal-3.jpg',
            stock: 'last'
        },
        {
            id: 'mgt-porsche-911-rexy',
            name: 'Porsche 911 GT3 R',
            brand: 'minigt',
            description: 'El iconico Porsche 911 GT3 R de imsa en 1/64.',
            price: 1200.00,
            image: 'resources/images/mgt-modal-4.jpg',
            stock: 'last'
        },
        {
            id: 'mgt-redbull-rb16b',
            name: 'Red Bull RB16B',
            brand: 'minigt',
            description: 'Réplica oficial del monoplaza de Fórmula 1 de la temporada 2021.',
            price: 250.00,
            image: 'resources/images/mgt-modal-5.jpg',
            stock: 'none'
        },
        {
            id: 'mgt-mclaren-artura',
            name: 'McLaren Artura',
            brand: 'minigt',
            description: 'Modelo detallado con acabados realistas.',
            price: 250.00,
            image: 'resources/images/mgt-modal-6.jpg',
            stock: 'stock'
        },
        {
            id: 'mgt-zonda',
            name: 'Pagani Zonda F',
            brand: 'minigt',
            description: 'Pintura y detalles de motor replicados con precisión.',
            price: 190.00,
            image: 'resources/images/mgt-modal-2.jpg',
            stock: 'none'
        },
        {
            id: 'gl-dodge-charger',
            name: 'Dodge Charger Guardia Nacional',
            brand: 'greenlight',
            description: 'Edición temática con base y detalles de policía.',
            price: 380.00,
            image: 'resources/images/gl-modal-1.jpg',
            stock: 'stock'
        },
        {
            id: 'gl-dallara',
            name: 'Dallara DW12 Honda',
            brand: 'greenlight',
            description: 'Réplica de competición con decoración oficial.',
            price: 150.00,
            image: 'resources/images/gl-modal-2.jpg',
            stock: 'last'
        },
        {
            id: 'gl-silverado',
            name: 'Chevrolet Silverado',
            brand: 'greenlight',
            description: 'Pickup con accesorios y pintura especial.',
            price: 400.00,
            image: 'resources/images/gl-modal-3.jpg',
            stock: 'none'
        }
    ];

    /**
     * Obtiene todos los productos.
     * @returns {Array} Lista de productos.
     */
    function getProducts() {
        return allProducts;
    }

    /**
     * Renderiza los productos en la cuadrícula de productos.
     * @param {object} filters - Opciones de filtrado (searchTerm, brand, priceSort).
     */
    function renderProducts(filters = {}) {
        const grid = document.getElementById('productGrid');
        if (!grid) return; // Salir si no estamos en la página de productos

        const products = getProducts();
        
        // CORRECCIÓN: Añadido contenedor de mensaje "No resultados"
        const noResults = document.getElementById('noResultsMessage');

        let filtered = products;

        // 1. Filtrar por búsqueda
        if (filters.searchTerm) {
            const term = filters.searchTerm.toLowerCase();
            filtered = filtered.filter(p => 
                p.name.toLowerCase().includes(term) || 
                p.description.toLowerCase().includes(term)
            );
        }

        // 2. Filtrar por marca
        if (filters.brand) {
            filtered = filtered.filter(p => p.brand === filters.brand);
        }

        // 3. Ordenar por precio
        if (filters.priceSort) {
            if (filters.priceSort === 'low') {
                filtered.sort((a, b) => a.price - b.price);
            } else if (filters.priceSort === 'high') {
                filtered.sort((a, b) => b.price - a.price);
            }
        }

        grid.innerHTML = ''; // Limpiar grid

        // CORRECCIÓN: Mostrar u ocultar el mensaje de "No resultados"
        if (filtered.length === 0) {
            if(noResults) noResults.style.display = 'block';
        } else {
            if(noResults) noResults.style.display = 'none';
        }

        // Renderizar productos filtrados
        filtered.forEach(product => {
            const col = document.createElement('div');
            col.className = 'col';
            
            let stockBadge = '';
            let buttonHtml = '';

            if (product.stock === 'stock') {
                stockBadge = '<span class="badge bg-success">En stock</span>';
                buttonHtml = `<button class="btn btn-primary add-to-cart" data-id="${product.id}">Comprar</button>`;
            } else if (product.stock === 'last') {
                stockBadge = '<span class="badge bg-warning text-dark">Últimas unidades</span>';
                buttonHtml = `<button class="btn btn-primary add-to-cart" data-id="${product.id}">Comprar</button>`;
            } else {
                stockBadge = '<span class="badge bg-danger">Agotado</span>';
                buttonHtml = `<button class="btn btn-secondary" disabled>Agotado</button>`;
            }

            // REVERSIÓN: Quitados los enlaces <a> de la imagen y el título
            col.innerHTML = `
                <div class="card h-100 product-card">
                    <img src="${product.image}" class="card-img-top" alt="${product.name}" loading="lazy">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text small text-muted">${product.description}</p>
                        <div class="mt-auto">
                            <div class="d-flex justify-content-between align-items-center mb-2">
                                <strong class="product-price">${formatCurrency(product.price)}</strong>
                                <div class="stock-indicator">
                                    ${stockBadge}
                                </div>
                            </div>
                            ${buttonHtml}
                        </div>
                    </div>
                </div>
            `;
            grid.appendChild(col);
        });
    }

    /**
     * Configura los listeners para los filtros de productos.
     */
    function setupProductListeners() {
        const searchInput = document.getElementById('searchProducts');
        const searchButton = document.getElementById('searchButton');
        const brandFilter = document.getElementById('brandFilter');
        const priceFilter = document.getElementById('priceFilter');

        const filters = {
            searchTerm: '',
            brand: '',
            priceSort: ''
        };

        function applyFilters() {
            renderProducts(filters);
        }

        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                filters.searchTerm = e.target.value;
                applyFilters();
            });
        }
        if (searchButton) {
            searchButton.addEventListener('click', () => {
                filters.searchTerm = searchInput.value;
                applyFilters();
            });
        }
        if (brandFilter) {
            brandFilter.addEventListener('change', (e) => {
                filters.brand = e.target.value;
                applyFilters();
            });
        }
        if (priceFilter) {
            priceFilter.addEventListener('change', (e) => {
                filters.priceSort = e.target.value;
                applyFilters();
            });
        }

        // Renderizado inicial
        renderProducts(filters);
    }


    // -----------------------------------------------------------------
    // FUNCIONALIDAD DE TOAST (NOTIFICACIONES)
    // -----------------------------------------------------------------

    /**
     * Muestra una notificación toast.
     * @param {string} message - El mensaje a mostrar.
     * @param {string} type - El tipo de toast ('success', 'info', 'danger').
     */
    function showToast(message, type = 'danger') {
        const toastContainer = document.getElementById('toastContainer');
        if (!toastContainer) return;

        const toastId = 'toast-' + Math.random().toString(36).substring(2, 9);
        const toast = document.createElement('div');
        toast.className = `toast align-items-center text-white bg-${type} border-0`;
        toast.id = toastId;
        toast.role = 'alert';
        toast.ariaLive = 'assertive';
        toast.ariaAtomic = 'true';

        toast.innerHTML = `
            <div class="toast-header">
                <strong class="me-auto">${type === 'success' ? 'Éxito' : (type === 'info' ? 'Información' : 'Error')}</strong>
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body">
                ${message}
            </div>
        `;

        toastContainer.appendChild(toast);
        
        const bsToast = new bootstrap.Toast(toast);
        bsToast.show();

        // Limpiar el toast del DOM después de que se oculte
        toast.addEventListener('hidden.bs.toast', () => {
            toast.remove();
        });
    }

    // -----------------------------------------------------------------
    // FUNCIONALIDAD DEL CARRITO
    // -----------------------------------------------------------------

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
        // Re-renderizar el carrito si el modal está abierto
        const cartModal = document.getElementById('cartModal');
        if (cartModal.classList.contains('show')) {
            renderCart();
        }
    }

    function updateCartCount() {
        const cart = getCart();
        const count = cart.reduce((s, it) => s + (it.qty || 0), 0);
        const countElement = document.getElementById('cartCount');
        if (countElement) {
            countElement.textContent = count;
            countElement.style.display = count > 0 ? 'inline-block' : 'none';
        }
    }

    function formatCurrency(n) {
        if (typeof n !== 'number') {
            n = parseFloat(n) || 0;
        }
        return '$' + n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    // Funciones principales del carrito
    function addToCart(productId) {
        const product = getProducts().find(p => p.id === productId);
        if (!product) {
            showToast('Error: Producto no encontrado.', 'danger');
            return;
        }

        const cart = getCart();
        const idx = cart.findIndex(i => i.id === product.id);

        if (idx > -1) {
            cart[idx].qty += 1;
        } else {
            cart.push({ 
                id: product.id, 
                name: product.name, 
                price: product.price, 
                image: product.image,
                qty: 1 
            });
        }
        
        saveCart(cart);
        showToast(`'${product.name}' fue añadido al carrito.`, 'success');
    }

    function removeFromCart(id) {
        let cart = getCart();
        cart = cart.filter(i => i.id !== id);
        saveCart(cart);
        showToast('Producto eliminado del carrito.', 'info');
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
        
        const emptyEl = document.getElementById('cartEmpty');
        const totalEl = document.getElementById('cartTotal');

        if (!cart.length) {
            if(emptyEl) emptyEl.style.display = 'block';
            if(totalEl) totalEl.textContent = formatCurrency(0);
            return;
        }
        
        if(emptyEl) emptyEl.style.display = 'none';

        const list = document.createElement('div');
        list.className = 'list-group list-group-flush';

        let total = 0;
        cart.forEach(item => {
            const itemTotal = item.price * item.qty;
            total += itemTotal;

            const el = document.createElement('div');
            el.className = 'list-group-item d-flex align-items-center cart-item';
            el.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="cart-item-image me-3">
                <div class="flex-fill">
                    <div class="d-flex justify-content-between">
                        <div>
                            <strong>${item.name}</strong>
                            <div class="small text-muted">${formatCurrency(item.price)} c/u</div>
                        </div>
                        <div class="text-end">
                            <div class="input-group input-group-sm mb-1 cart-quantity-input">
                                <button class="btn btn-outline-secondary btn-decrease" data-id="${item.id}" type="button">-</button>
                                <input type="text" class="form-control text-center qty-input" data-id="${item.id}" value="${item.qty}" aria-label="Cantidad" inputmode="numeric">
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
        if(totalEl) totalEl.textContent = formatCurrency(total);

        // Event listeners para elementos dinámicos
        setupCartListeners(container);
    }

    function setupCartListeners(container) {
        // Eliminar items
        container.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', () => {
                removeFromCart(btn.dataset.id);
            });
        });

        // Aumentar cantidad
        container.querySelectorAll('.btn-increase').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.dataset.id;
                const inp = container.querySelector('.qty-input[data-id="' + id + '"]');
                changeQty(id, parseInt(inp.value || '1', 10) + 1);
            });
        });

        // Disminuir cantidad
        container.querySelectorAll('.btn-decrease').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.dataset.id;
                const inp = container.querySelector('.qty-input[data-id="' + id + '"]');
                const newQty = Math.max(1, parseInt(inp.value || '1', 10) - 1);
                changeQty(id, newQty);
            });
        });

        // Input de cantidad
        container.querySelectorAll('.qty-input').forEach(inp => {
            inp.addEventListener('change', () => {
                const id = inp.dataset.id;
                const val = parseInt(inp.value || '1', 10);
                changeQty(id, Math.max(1, isNaN(val) ? 1 : val));
            });
        });
    }

    // -----------------------------------------------------------------
    // MANEJO DE FORMULARIOS
    // -----------------------------------------------------------------
    
    function setupFormListeners() {
        const forms = [
            { id: 'formContacto', successMessage: '¡Mensaje enviado con éxito!' },
            { id: 'formRegistroModal', successMessage: '¡Gracias por registrarte!' },
            { id: 'formSuscripcion', successMessage: '¡Te has suscrito a las novedades!' },
            { id: 'formSuscripcionAcerca', successMessage: '¡Te has suscrito a las novedades!' }
        ];

        forms.forEach(formInfo => {
            const formElement = document.getElementById(formInfo.id);
            if (formElement) {
                formElement.addEventListener('submit', (e) => {
                    e.preventDefault(); // Prevenir el envío real del formulario
                    
                    // Mostrar toast de éxito
                    showToast(formInfo.successMessage, 'success');
                    
                    // Resetear el formulario
                    formElement.reset();

                    // Si es un modal, cerrarlo
                    const modal = formElement.closest('.modal');
                    if (modal) {
                        const modalInstance = bootstrap.Modal.getInstance(modal);
                        if (modalInstance) {
                            modalInstance.hide();
                        }
                    }
                });
            }
        });
    }


    // -----------------------------------------------------------------
    // EVENT LISTENERS GLOBALES
    // -----------------------------------------------------------------
    document.addEventListener('DOMContentLoaded', function() {
        
        // Configurar listeners de formularios
        setupFormListeners();

        // Configurar listeners de productos (si estamos en la página de productos)
        if (document.getElementById('productGrid')) {
            setupProductListeners();
        }

        // REVERSIÓN: Quitada la lógica de la página de detalle
        // if (document.getElementById('productDetailContainer')) { ... }

        // Botón añadir al carrito (listener global en el documento)
        document.addEventListener('click', function (e) {
            const target = e.target;
            if (target.classList.contains('add-to-cart')) {
                const id = target.dataset.id;
                addToCart(id);
                
                // Feedback visual
                target.textContent = '¡Añadido!';
                target.classList.add('btn-success');
                target.classList.remove('btn-primary');
                
                setTimeout(() => {
                    target.textContent = 'Comprar';
                    target.classList.remove('btn-success');
                    target.classList.add('btn-primary');
                }, 1000);
            }
        });

        // Botón vaciar carrito
        const clearCartBtn = document.getElementById('clearCartBtn');
        if (clearCartBtn) {
            clearCartBtn.addEventListener('click', () => {
                // CORRECCIÓN: Reemplazado confirm() por un modal de Bootstrap
                const cart = getCart();
                if (cart.length === 0) {
                    showToast('El carrito ya está vacío.', 'info');
                    return;
                }
                
                const modalElement = document.getElementById('confirmClearCartModal');
                if (modalElement) {
                    const modalInstance = new bootstrap.Modal(modalElement);
                    modalInstance.show();
                }
            });
        }

        // CORRECCIÓN: Añadido listener para el botón de confirmación en el nuevo modal
        const confirmClearBtn = document.getElementById('confirmClearCartBtn');
        if (confirmClearBtn) {
            confirmClearBtn.addEventListener('click', () => {
                saveCart([]); // Vaciar el carrito
                
                // Ocultar el modal de confirmación
                const modalElement = document.getElementById('confirmClearCartModal');
                const modalInstance = bootstrap.Modal.getInstance(modalElement);
                if (modalInstance) {
                    modalInstance.hide();
                }

                // Opcional: Mostrar un toast de éxito
                showToast('El carrito se ha vaciado.', 'info');
            });
        }

        // Botón checkout
        const checkoutBtn = document.getElementById('checkoutBtn');
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', () => {
                const cart = getCart();
                if (!cart.length) {
                    showToast('El carrito está vacío.');
                    return;
                }
                // CORRECCIÓN: Reemplazado enlace roto por un toast
                showToast('¡Proceso de pago aún no implementado!', 'info');
                // window.location.href = 'checkout.html'; // Descomentar cuando exista
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