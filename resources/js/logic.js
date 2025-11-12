// ÁMBITO DE FUNCIONALIDAD GLOBAL (IIFE)
(function () {
    const STORAGE_KEY = 'manutoys_cart';

    // Base de datos de productos
    // ¡NUEVO! 'image' se convierte en 'images' (un array) para la galería.
    // Usamos imágenes existentes para simular la galería.
    const allProducts = [
        {
            id: 'hw-porsche-911',
            name: 'Porsche 911 GT3',
            brand: 'hotwheels',
            description: 'La leyenda de Stuttgart con llantas de goma y acabados que cortan el viento. Una joya de metal/metal que no puede faltar en tu garaje.',
            price: 250.00,
            images: [
                'resources/images/hw-modal-1.jpg', 
          
            ],
            stock: 'stock'
        },
        {
            id: 'hw-skyline',
            name: 'Nissan Skyline GT-R LBWK',
            brand: 'hotwheels',
            description: 'El "Godzilla" de Liberty Walk. Una bestia JDM con pintura "chase" y un widebody agresivo. Pura actitud japonesa.',
            price: 400.00,
            images: [
                'resources/images/hw-modal-2.jpg',
       
            ],
            stock: 'none'
        },
        {
            id: 'hw-aston-v8',
            name: 'Aston Martin V8',
            brand: 'hotwheels',
            description: 'Elegancia y poder británico. Este clásico de Aston Martin brilla con detalles finos, listo para un viaje de lujo por tu colección.',
            price: 190.00,
            images: ['resources/images/hw-modal-3.jpg'], // Simulada
            stock: 'stock'
        },
        {
            id: 'mgt-porsche-911',
            name: 'Porsche 911 GT3',
            brand: 'minigt',
            description: 'El realismo de Mini GT en su máxima expresión. Espejos reales, llantas detalladas y la aerodinámica de un verdadero auto de carreras. Precisión de museo.',
            price: 300.00,
            images: ['resources/images/mgt-modal-1.jpg', 'resources/images/mgt-modal-1-2.jpg', 'resources/images/mgt-modal-1-3.jpg'], // Simulada
            stock: 'stock'
        },
        {
            id: 'mgt-rx7',
            name: 'Mazda RX-7 REAmemiya',
            brand: 'minigt',
            description: 'El demonio del JDM. La icónica máquina de REAmemiya con cada detalle aerodinámico replicado a la perfección. Una leyenda de la cultura "tuning".',
            price: 280.00,
            images: ['resources/images/mgt-modal-3.jpg', 'resources/images/mgt-modal-3-2.jpg', 'resources/images/mgt-modal-3-3.jpg'], // Simulada
            stock: 'last'
        },
        {
            id: 'mgt-porsche-911-rexy',
            name: 'Porsche 911 GT3 R "Rexy"',
            brand: 'minigt',
            description: '¡El T-Rex de la pista! El diseño más salvaje y querido de IMSA llega a 1:64. Un ícono instantáneo que se robará todas las miradas.',
            price: 1200.00,
            images: ['resources/images/mgt-modal-4.jpg', 'resources/images/mgt-modal-4-2.jpg', 'resources/images/mgt-modal-4-3.jpg'], // Simulada
            stock: 'last'
        },
        {
            id: 'mgt-redbull-rb16b',
            name: 'Red Bull RB16B',
            brand: 'minigt',
            description: 'El auto campeón del mundo de F1 en tus manos. La aerodinámica y los colores mate del equipo Red Bull Racing, replicados con una precisión asombrosa.',
            price: 250.00,
            images: ['resources/images/mgt-modal-5.jpg', 'resources/images/mgt-modal-5-2.jpg', 'resources/images/mgt-modal-5-3.jpg'], // Simulada
            stock: 'none'
        },
        {
            id: 'mgt-mclaren-artura',
            name: 'McLaren Artura',
            brand: 'minigt',
            description: 'El futuro de los superdeportivos. El Artura híbrido de McLaren, capturado por Mini GT con líneas afiladas y un acabado impecable.',
            price: 250.00,
            images: ['resources/images/mgt-modal-6.jpg', 'resources/images/mgt-modal-6-2.jpg', 'resources/images/mgt-modal-6-3.jpg'], // Simulada
            stock: 'stock'
        },
        {
            id: 'mgt-zonda',
            name: 'Pagani Zonda F',
            brand: 'minigt',
            description: 'La obra de arte de Horacio Pagani. Cada curva de este Zonda F es una sinfonía de diseño italiano y poder. Una pieza central para cualquier colección.',
            price: 190.00,
            images: ['resources/images/mgt-modal-2.jpg', 'resources/images/mgt-modal-2-2.jpg', 'resources/images/mgt-modal-2-3.jpg'], // Simulada
            stock: 'none'
        },
        {
            id: 'gl-dodge-charger',
            name: 'Dodge Charger Guardia Nacional',
            brand: 'greenlight',
            description: '¡Autoridad en la carretera! Esta réplica de la Guardia Nacional de Greenlight captura la presencia imponente del Charger, lista para la acción.',
            price: 380.00,
            images: ['resources/images/gl-modal-1.jpg', 'resources/images/gl-modal-1-2.jpg', 'resources/images/gl-modal-1-3.jpg'], // Simulada
            stock: 'stock'
        },
        {
            id: 'gl-dallara',
            name: 'Dallara DW12 Honda',
            brand: 'greenlight',
            description: 'Velocidad pura de Indy. Siente la adrenalina de las 500 millas con esta réplica de competición, con todos los patrocinadores y detalles aerodinámicos.',
            price: 150.00,
            images: ['resources/images/gl-modal-2.jpg', 'resources/images/gl-modal-2-2.jpg', 'resources/images/gl-modal-2-3.jpg'], // Simulada
            stock: 'last'
        },
        {
            id: 'gl-silverado',
            name: 'Chevrolet Silverado',
            brand: 'greenlight',
            description: 'Fuerza y deber. Esta Chevrolet Silverado de la Guardia Nacional por Greenlight es tan robusta como su contraparte real. Lista para cualquier terreno.',
            price: 400.00,
            images: ['resources/images/gl-modal-3.jpg', 'resources/images/gl-modal-2-2.jpg', 'resources/images/gl-modal-2-3.jpg'], // Simulada
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
     * Obtiene el badge de stock.
     * @param {string} stockStatus - 'stock', 'last', 'none'.
     */
    function getStockBadge(stockStatus) {
        if (stockStatus === 'stock') {
            return '<span class="badge bg-success">En stock</span>';
        } else if (stockStatus === 'last') {
            return '<span class="badge bg-warning text-dark">Últimas unidades</span>';
        } else {
            return '<span class="badge bg-danger">Agotado</span>';
        }
    }

    /**
     * Obtiene el botón de compra para la tarjeta de producto.
     * @param {object} product - El objeto del producto.
     */
    function getProductButton(product) {
        if (product.stock === 'stock' || product.stock === 'last') {
            return `<button class="btn btn-primary add-to-cart" data-id="${product.id}">Comprar</button>`;
        } else {
            return `<button class="btn btn-secondary" disabled>Agotado</button>`;
        }
    }

    /**
     * Obtiene el botón de compra para el MODAL de detalle.
     * @param {object} product - El objeto del producto.
     */
    function getModalButton(product) {
        if (product.stock === 'stock' || product.stock === 'last') {
            // Usamos un ID o clase diferente para el botón del modal si es necesario
            return `<button class="btn btn-primary add-to-cart-modal" data-id="${product.id}">Añadir al carrito</button>`;
        } else {
            return `<button class="btn btn-secondary" disabled>Agotado</button>`;
        }
    }


    /**
     * Renderiza los productos en la cuadrícula de productos.
     * @param {object} filters - Opciones de filtrado (searchTerm, brand, priceSort).
     */
    function renderProducts(filters = {}) {
        const grid = document.getElementById('productGrid');
        if (!grid) return; // Salir si no estamos en la página de productos

        const products = getProducts();
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

        // Mostrar u ocultar el mensaje de "No resultados"
        if (filtered.length === 0) {
            if(noResults) noResults.style.display = 'block';
        } else {
            if(noResults) noResults.style.display = 'none';
        }

        // Renderizar productos filtrados
        filtered.forEach(product => {
            const col = document.createElement('div');
            col.className = 'col fade-in-section'; // Añadida clase de animación
            
            const stockBadge = getStockBadge(product.stock);
            const buttonHtml = getProductButton(product);

            // ¡NUEVO! La imagen y el título ahora son clicables para abrir el modal
            col.innerHTML = `
                <div class="card h-100 product-card">
                    <img src="${product.images[0]}" class="card-img-top product-detail-trigger" alt="${product.name}" loading="lazy" data-id="${product.id}" style="cursor: pointer;">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title product-detail-trigger" data-id="${product.id}" style="cursor: pointer;">${product.name}</h5>
                        <p class="card-text small text-muted">${product.description.substring(0, 80)}...</p> 
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

        // IMPORTANTE: Observar los nuevos elementos para la animación de fade-in
        observeFadeInElements();
    }

    /**
     * Configura los listeners para los filtros de productos.
     */
    function setupProductListeners() {
        const searchInput = document.getElementById('searchProducts');
        const searchButton = document.getElementById('searchButton');
        const brandFilter = document.getElementById('brandFilter');
        const priceFilter = document.getElementById('priceFilter');

        // Objeto para mantener el estado de los filtros
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
        if (cartModal && cartModal.classList.contains('show')) {
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
                image: product.images[0], // Usar la primera imagen para el carrito
                qty: 1 
            });
        }
        
        saveCart(cart);
        showToast(`'${product.name}' fue añadido al carrito.`, 'success');

        // ¡NUEVO! Animación del carrito (Propuesta 3)
        const cartBtn = document.getElementById('openCartBtn');
        if (cartBtn) {
            cartBtn.classList.add('cart-pop-animation');
            // Quitar la clase después de la animación para que pueda repetirse
            setTimeout(() => {
                cartBtn.classList.remove('cart-pop-animation');
            }, 500); // Debe coincidir con la duración de la animación en CSS
        }
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
    // ¡NUEVO! LÓGICA PARA MODAL DE DETALLE DE PRODUCTO (NIVEL DIOS)
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
    // ¡NUEVO! LÓGICA PARA MODAL DE DETALLE DE PRODUCTO
    // -----------------------------------------------------------------
    /**
     * Abre el modal de detalle del producto.
     * @param {string} productId - El ID del producto.
     */
    function openProductDetailModal(productId) {
        const product = getProducts().find(p => p.id === productId);
        if (!product) return;

        const modalTitle = document.getElementById('productDetailModalTitle');
        const modalBody = document.getElementById('productDetailModalBody');
        const modalFooter = document.getElementById('productDetailModalFooter');
        
        if (!modalTitle || !modalBody || !modalFooter) return;

        modalTitle.textContent = product.name;

        // --- 1. Construir la Mini-Galería ---
        let thumbnailsHTML = '';
        product.images.forEach((imgSrc, index) => {
            thumbnailsHTML += `
                <img src="${imgSrc}" 
                     class="gallery-thumb ${index === 0 ? 'active' : ''}" 
                     data-img-src="${imgSrc}" 
                     alt="Thumbnail ${index + 1}">
            `;
        });

        // --- 2. Construir Productos Relacionados ---
        const relatedProducts = getProducts()
            .filter(p => p.brand === product.brand && p.id !== product.id) // Misma marca, no el mismo producto
            .slice(0, 3); // Limitar a 3

        let relatedHTML = '';
        if (relatedProducts.length > 0) {
            relatedHTML = '<hr><h5 class="related-products-title">También te podría gustar...</h5><div class="row g-3">';
            
            relatedProducts.forEach(relProduct => {
                relatedHTML += `
                    <div class="col-4">
                        <div class="card related-product-card product-detail-trigger" data-id="${relProduct.id}" style="cursor: pointer;">
                            <img src="${relProduct.images[0]}" class="card-img-top" alt="${relProduct.name}">
                            <div class="card-body">
                                <h6 class="card-title">${relProduct.name}</h6>
                            </div>
                        </div>
                    </div>
                `;
            });
            relatedHTML += '</div>';
        }

        // --- 3. Construir HTML Final del Modal ---
        modalBody.innerHTML = `
            <div class="row">
                <div class="col-md-6">
                    <!-- Galería Principal -->
                    <div class="product-detail-gallery">
                        <img src="${product.images[0]}" class="img-fluid rounded product-detail-image" alt="${product.name}" id="mainGalleryImage">
                        <div class="gallery-thumbnails mt-2">
                            ${thumbnailsHTML}
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <p>${product.description}</p> 
                    <h3 class="product-price">${formatCurrency(product.price)}</h3>
                    <div class="stock-indicator mb-3">
                        ${getStockBadge(product.stock)}
                    </div>
                    <p class="small text-muted">Marca: ${product.brand}</p>
                </div>
            </div>
            ${relatedHTML}
        `;

        modalFooter.innerHTML = `
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
            ${getModalButton(product)}
        `;

        // Añadir listener al botón de comprar del modal (si existe)
        const modalBuyBtn = modalFooter.querySelector('.add-to-cart-modal');
        if (modalBuyBtn) {
            modalBuyBtn.addEventListener('click', function() {
                addToCart(this.dataset.id);
                // Opcional: Cerrar modal después de añadir
                const modalInstance = bootstrap.Modal.getInstance(document.getElementById('productDetailModal'));
                if (modalInstance) {
                    modalInstance.hide();
                }
            });
        }

        const modal = new bootstrap.Modal(document.getElementById('productDetailModal'));
        modal.show();
    }


    // -----------------------------------------------------------------
    // ANIMACIONES DE SCROLL (Intersection Observer)
    // -----------------------------------------------------------------

    let observer;

    /**
     * Observa los elementos con la clase .fade-in-section para animarlos.
     */
    function observeFadeInElements() {
        const sections = document.querySelectorAll('.fade-in-section');
        
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1 // 10% del elemento visible
        };

        // Desconectar el observador anterior si existe, para evitar duplicados
        if (observer) {
            observer.disconnect();
        }

        observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    obs.unobserve(entry.target); // Dejar de observar una vez animado
                }
            });
        }, options);

        sections.forEach(section => {
            observer.observe(section);
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

        // Iniciar observador de animaciones
        observeFadeInElements();

        // --- Listeners de Clic Globales ---
        document.addEventListener('click', function (e) {
            const target = e.target;

            // Botón añadir al carrito (desde la tarjeta)
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

            // ¡NUEVO! Clic en tarjeta de producto para abrir modal
            // CORRECCIÓN: Asegurarse de que el listener del modal de producto no interfiera
            const productTrigger = target.closest('.product-detail-trigger');
            if (productTrigger) {
                const productId = productTrigger.dataset.id;
                openProductDetailModal(productId);
            }

            // ¡NUEVO! Clic en thumbnail de la galería
            if (target.classList.contains('gallery-thumb')) {
                const mainImage = document.getElementById('mainGalleryImage');
                if (mainImage) {
                    mainImage.src = target.dataset.imgSrc;
                }
                // Actualizar clase activa
                document.querySelectorAll('.gallery-thumb').forEach(thumb => thumb.classList.remove('active'));
                target.classList.add('active');
            }
        });

        // Botón vaciar carrito
        const clearCartBtn = document.getElementById('clearCartBtn');
        if (clearCartBtn) {
            clearCartBtn.addEventListener('click', () => {
                // Reemplazado confirm() por un modal de Bootstrap
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

        // Botón de confirmación en el modal "Vaciar Carrito"
        const confirmClearBtn = document.getElementById('confirmClearCartBtn');
        if (confirmClearBtn) {
            confirmClearBtn.addEventListener('click', () => {
                saveCart([]); // Vaciar el carrito
                
                const modalElement = document.getElementById('confirmClearCartModal');
                const modalInstance = bootstrap.Modal.getInstance(modalElement);
                if (modalInstance) {
                    modalInstance.hide();
                }

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
                showToast('¡Proceso de pago aún no implementado!', 'info');
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