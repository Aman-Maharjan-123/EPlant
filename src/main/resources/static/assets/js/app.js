/**
 * E-PLANT — MULTI-PAGE APPLICATION CORE LOGIC
 * A professional, modular approach for a college project.
 */

/* =====================================================
   1. STATE & CONSTANTS
   ===================================================== */

const CAT_GRAD = {
  Indoor: 'linear-gradient(135deg,#0F5A0F,#1a7a1a)',
  Outdoor: 'linear-gradient(135deg,#0a4a2a,#1a8a4a)',
  Succulent: 'linear-gradient(135deg,#3a5a0a,#5a8a1a)',
  Flowering: 'linear-gradient(135deg,#4a1a3a,#7a2a5a)',
  Tropical: 'linear-gradient(135deg,#0a3a4a,#1a6a5a)',
  Herb: 'linear-gradient(135deg,#2a4a0a,#4a7a1a)',
};

const DEFAULT_PLANTS = [
  { id: 1, name: "Monstera Deliciosa", category: "Indoor", season: "Summer", description: "A stunning tropical plant known for its large, glossy, split leaves. Perfect for adding a jungle vibe to any room.", price: 4500, stock: 45, image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&q=80&w=800" },
  { id: 2, name: "Snake Plant", category: "Indoor", season: "All-Season", description: "One of the toughest houseplants around. Thrives in low light and requires minimal watering.", price: 2500, stock: 120, image: "https://images.unsplash.com/photo-1593482892290-f54927ae1bf6?auto=format&fit=crop&q=80&w=800" },
  { id: 3, name: "Fiddle Leaf Fig", category: "Indoor", season: "Spring", description: "A designer favorite with large, violin-shaped leaves. A statement piece for any living space.", price: 6500, stock: 8, image: "https://images.unsplash.com/photo-1545239351-ef35f43d514b?auto=format&fit=crop&q=80&w=800" },
  { id: 4, name: "English Ivy", category: "Outdoor", season: "All-Season", description: "Classic climbing plant with elegant lobed leaves. Perfect for covering walls or trellises.", price: 1800, stock: 85, image: "https://images.unsplash.com/photo-1599394022918-6c276a50e181?auto=format&fit=crop&q=80&w=800" },
  { id: 5, name: "Japanese Maple", category: "Outdoor", season: "Autumn", description: "Elegant ornamental tree with delicate leaves that turn brilliant crimson in autumn.", price: 9500, stock: 12, image: "https://images.unsplash.com/photo-1542601906990-b4d3fb773b09?auto=format&fit=crop&q=80&w=800" },
  { id: 6, name: "Echeveria", category: "Outdoor", season: "Summer", description: "Rosette-forming succulent with pastel-colored leaves. Drought-tolerant and easy to propagate.", price: 1200, stock: 200, image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&q=80&w=800" },
  { id: 7, name: "Aloe Vera", category: "Indoor", season: "All-Season", description: "A must-have succulent with healing gel inside its thick leaves. Low maintenance and multi-purpose.", price: 1500, stock: 95, image: "https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?auto=format&fit=crop&q=80&w=800" },
  { id: 8, name: "Phalaenopsis Orchid", category: "Indoor", season: "Spring", description: "Exquisite flowering plant with elegant arching blooms that last for months.", price: 5200, stock: 30, image: "https://images.unsplash.com/photo-1534885391148-433dfa627883?auto=format&fit=crop&q=80&w=800" },
  { id: 9, name: "Peace Lily", category: "Indoor", season: "Spring", description: "Beautiful white spathes and glossy dark green leaves. One of the best air-purifying indoor plants.", price: 3200, stock: 60, image: "https://images.unsplash.com/photo-1597055181300-e3633a207519?auto=format&fit=crop&q=80&w=800" },
  { id: 10, name: "Bird of Paradise", category: "Indoor", season: "Summer", description: "Dramatic plant with large banana-like leaves and striking orange-blue crane-shaped flowers.", price: 7200, stock: 5, image: "https://images.unsplash.com/photo-1620190892019-33827d0f1eb9?auto=format&fit=crop&q=80&w=800" },
  { id: 11, name: "Sweet Basil", category: "Outdoor", season: "Summer", description: "Fresh, aromatic basil perfect for cooking and salads. Grow it on your windowsill.", price: 800, stock: 150, image: "https://images.unsplash.com/photo-1618164436241-4473940d1f5c?auto=format&fit=crop&q=80&w=800" },
  { id: 12, name: "Rosemary", category: "Outdoor", season: "Spring", description: "Woody, fragrant herb essential in any kitchen garden. Wonderful as an ornamental shrub.", price: 900, stock: 110, image: "https://images.unsplash.com/photo-1594313177694-8228148b598b?auto=format&fit=crop&q=80&w=800" },
  { id: 13, name: "Areca Palm", category: "Indoor", season: "All-Season", description: "Lush, feathery palm that brings instant tropical vibes to any room. Natural air humidifier.", price: 3800, stock: 35, image: "https://images.unsplash.com/photo-1592150621344-22d50847ba8c?auto=format&fit=crop&q=80&w=800" },
  { id: 14, name: "Hibiscus", category: "Outdoor", season: "Summer", description: "Bold, trumpet-shaped flowers in vibrant colors. A classic garden plant that blooms abundantly.", price: 2800, stock: 20, image: "https://images.unsplash.com/photo-1534567059665-3f9ee423f790?auto=format&fit=crop&q=80&w=800" },
  { id: 15, name: "Golden Pothos", category: "Indoor", season: "All-Season", description: "The ultimate beginner plant with trailing vines of heart-shaped, variegated leaves.", price: 1800, stock: 15, image: "https://images.unsplash.com/photo-1637967886160-fd78dc3eb315?auto=format&fit=crop&q=80&w=800" },
  { id: 16, name: "Jade Plant", category: "Indoor", season: "Winter", description: "A symbol of prosperity with thick, oval leaves on woody stems. Can live for decades.", price: 2100, stock: 70, image: "https://images.unsplash.com/photo-1622329381622-df38d2f5341f?auto=format&fit=crop&q=80&w=800" },
  { id: 17, name: "Chrysanthemum", category: "Outdoor", season: "Autumn", description: "Classic autumn bloom that brings vibrant gold and burgundy colors as temperatures cool.", price: 1400, stock: 40, image: "https://images.unsplash.com/photo-1508615039623-a25605d2b022?auto=format&fit=crop&q=80&w=800" },
  { id: 18, name: "Winter Jasmine", category: "Outdoor", season: "Winter", description: "Hardy winter-blooming outdoor shrub that flowers with bright yellow stars in cold months.", price: 1600, stock: 30, image: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80&w=800" }
];

let S = { user: null, cart: [], plants: [], users: [], orders: [] };
let authToken = localStorage.getItem('ep_token');
let useAPI = true;

const api = {
  get: async (url) => {
    const headers = {};
    if (authToken) headers['Authorization'] = 'Bearer ' + authToken;
    const res = await fetch(url, { headers });
    if (res.status === 403) { handleForbidden(); throw new ForbiddenError(); }
    if (!res.ok) { const text = await res.text(); throw new Error(text || 'API Error: ' + res.status); }
    const text = await res.text();
    try { return JSON.parse(text); } catch (e) { throw new Error('Invalid JSON: ' + text.substring(0, 100)); }
  },
  post: async (url, data) => {
    const headers = { 'Content-Type': 'application/json' };
    if (authToken) headers['Authorization'] = 'Bearer ' + authToken;
    const res = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(data)
    });
    if (res.status === 403) { handleForbidden(); throw new ForbiddenError(); }
    if (!res.ok) { const text = await res.text(); throw new Error(text || 'API Error: ' + res.status); }
    return res.json();
  },
  put: async (url, data) => {
    const headers = { 'Content-Type': 'application/json' };
    if (authToken) headers['Authorization'] = 'Bearer ' + authToken;
    const res = await fetch(url, {
      method: 'PUT',
      headers,
      body: JSON.stringify(data)
    });
    if (res.status === 403) { handleForbidden(); throw new ForbiddenError(); }
    if (!res.ok) { const text = await res.text(); throw new Error(text || 'API Error: ' + res.status); }
    return res.json();
  },
  del: async (url) => {
    const headers = {};
    if (authToken) headers['Authorization'] = 'Bearer ' + authToken;
    const res = await fetch(url, { method: 'DELETE', headers });
    if (res.status === 403) { handleForbidden(); throw new ForbiddenError(); }
    if (!res.ok) throw new Error('API Error: ' + res.status);
  }
};

class ForbiddenError extends Error {
  constructor() { super('Forbidden'); this.name = 'ForbiddenError'; }
}

function handleForbidden() {
  S.user = null; S.cart = [];
  authToken = null;
  localStorage.removeItem('ep_token');
  localStorage.removeItem('ep_user');
  localStorage.removeItem('ep_uid');
  toast('Your account has been disabled. Please contact support.', 'error');
  window.location.href = 'index.html';
}

const loadState = async () => {
  // Try fetching latest plant catalog from backend API first
  try {
    const livePlants = await api.get('/api/plants');
    if (Array.isArray(livePlants) && livePlants.length > 0) {
      S.plants = livePlants;
      savePlants();
    }
  } catch (e) {
    console.warn('API plant fetch failed, checking local storage/defaults', e);
  }

  // If user is authenticated, load user profile & cart
  if (authToken) {
    const savedUser = localStorage.getItem('ep_user');
    if (savedUser) {
      try {
        S.user = JSON.parse(savedUser);
        try { S.cart = await api.get('/api/cart/' + S.user.id); } catch (ce) { console.warn('Cart load failed', ce); }
      } catch (ue) { console.warn(ue); }
    }
  } else {
    S.users = JSON.parse(localStorage.getItem('ep_users')) || [];
    S.orders = JSON.parse(localStorage.getItem('ep_orders')) || [];
    const uid = localStorage.getItem('ep_uid');
    if (uid) S.user = S.users.find(u => u.id === +uid) || null;
    if (S.user) S.cart = JSON.parse(localStorage.getItem('ep_cart_' + S.user.id)) || [];
  }

  // Fallback to local plants or defaults if S.plants is still empty or has old version
  const DATA_VER = '2.3';
  const currentVer = localStorage.getItem('ep_version');
  let localPlants = JSON.parse(localStorage.getItem('ep_plants'));
  if (!S.plants || S.plants.length === 0) {
    if (currentVer !== DATA_VER || !localPlants || localPlants.length < DEFAULT_PLANTS.length) {
      S.plants = JSON.parse(JSON.stringify(DEFAULT_PLANTS));
      savePlants();
      localStorage.setItem('ep_version', DATA_VER);
    } else {
      S.plants = localPlants;
    }
  }

  // Ensure every plant has season defined
  if (Array.isArray(S.plants)) {
    S.plants.forEach(p => {
      if (!p.season || !p.season.trim()) p.season = 'All-Season';
    });
  }
};

const savePlants = () => localStorage.setItem('ep_plants', JSON.stringify(S.plants));
const saveUsers = () => localStorage.setItem('ep_users', JSON.stringify(S.users));
const saveOrders = () => localStorage.setItem('ep_orders', JSON.stringify(S.orders));
const saveCart = () => { if (S.user) localStorage.setItem('ep_cart_' + S.user.id, JSON.stringify(S.cart)); };
const saveUid = () => { if (S.user) localStorage.setItem('ep_uid', S.user.id); else localStorage.removeItem('ep_uid'); };

const $ = id => document.getElementById(id);
const fmt = n => 'Rs. ' + Math.round(n).toLocaleString();
const getPlant = id => S.plants.find(p => p.id === +id);
const nextId = a => a.length ? Math.max(...a.map(x => x.id)) + 1 : 1;
const cartCount = () => S.cart.reduce((s, i) => s + i.qty, 0);
const cartSub = () => S.cart.reduce((s, i) => { const p = getPlant(i.plantId); return s + (p ? p.price * i.qty : 0); }, 0);
const deliveryFee = () => cartSub() >= 5000 ? 0 : 200;
const isAdmin = () => S.user && S.user.role === 'ADMIN';

/* =====================================================
   3. UI COMPONENTS (SHARED)
   ===================================================== */

function renderHeader() {
  const cc = cartCount();
  const pg = document.body.dataset.page;
  const isAuth = !!S.user;

  const navHtml = `
    <div class="navbar-inner">
        <a href="index.html" class="nav-logo"><img src="assets/img/logo main file-05.png" alt="e-plant"></a>
        <div class="nav-links">
            <a href="index.html" class="${pg === 'home' ? 'active' : ''}">Home</a>
            <a href="shop.html" class="${pg === 'shop' ? 'active' : ''}">Shop</a>
            <a href="about.html" class="${pg === 'about' ? 'active' : ''}">About</a>
        </div>
        <div class="nav-right">
            <button class="cart-badge" id="theme-toggle-btn" onclick="toggleTheme()" title="Toggle Theme"><i class="fas fa-sun"></i></button>
            ${isAuth ? `
              ${!isAdmin() ? `<button class="cart-badge" onclick="window.location.href='cart.html'" title="View Cart"><i class="fas fa-shopping-bag"></i>${cc > 0 ? `<span class="count">${cc}</span>` : ''}</button>` : ''}
              <div class="user-menu-wrap">
                  <div class="user-avatar" onclick="toggleDD()">${S.user.name.charAt(0).toUpperCase()}</div>
                  <div class="user-dropdown" id="dd">
                      <div style="padding:12px 18px;border-bottom:1px solid var(--border);">
                          <div class="fw-600">${S.user.name}</div>
                          <div class="text-muted text-sm">${S.user.email}</div>
                      </div>
                      ${isAdmin() ? '<a href="admin-dashboard.html"><i class="fas fa-gauge-high"></i> Dashboard</a>' : ''}
                      ${!isAdmin() ? '<a href="my-orders.html"><i class="fas fa-box"></i> My Orders</a>' : ''}
                      <div class="dd-divider"></div>
                      <button onclick="doLogout()"><i class="fas fa-right-from-bracket"></i> Logout</button>
                  </div>
              </div>
            ` : `
              <div style="display:flex;align-items:center;gap:12px;">
                  <a href="login.html" class="btn btn-ghost btn-sm">Login</a>
                  <a href="register.html" class="btn btn-primary btn-sm">Register</a>
              </div>
            `}
            <button class="mobile-toggle" onclick="toggleSidebar()"><i class="fas fa-bars"></i></button>
        </div>
    </div>`;

  const header = document.createElement('nav');
  header.className = 'navbar';
  header.innerHTML = navHtml;

  if (!pg.startsWith('admin') && !['login', 'register'].includes(pg)) {
    document.body.prepend(header);
    renderFooter();
  }
  if (pg.startsWith('admin')) renderAdminSidebar();

  const sidebarHtml = `
    <div class="sidebar-overlay" id="overlay" onclick="toggleSidebar()"></div>
    <div class="mobile-sidebar" id="sidebar">
        <div class="sidebar-header" style="display:flex;justify-content:space-between;align-items:center;margin-bottom:32px;">
            <a href="index.html" class="nav-logo"><img src="assets/img/logo main file-05.png" alt="e-plant" style="height:48px;"></a>
            <button class="btn btn-ghost btn-sm" onclick="toggleSidebar()"><i class="fas fa-xmark"></i></button>
        </div>
        <div class="sidebar-links" style="display:flex;flex-direction:column;gap:16px;">
            <a href="index.html" class="sidebar-link ${pg === 'home' ? 'active' : ''}"><i class="fas fa-house"></i> Home</a>
            <a href="shop.html" class="sidebar-link ${pg === 'shop' ? 'active' : ''}"><i class="fas fa-leaf"></i> Shop</a>
            <a href="about.html" class="sidebar-link ${pg === 'about' ? 'active' : ''}"><i class="fas fa-info-circle"></i> About</a>
            <div id="sidebar-user-links">
               ${isAuth ? `
                 ${isAdmin() ? '<a href="admin-dashboard.html" class="sidebar-link"><i class="fas fa-gauge-high"></i> Dashboard</a>' : ''}
                 ${!isAdmin() ? '<a href="my-orders.html" class="sidebar-link"><i class="fas fa-box"></i> My Orders</a>' : ''}
                 <button class="sidebar-link" onclick="toggleTheme()"><i class="fas fa-circle-half-stroke"></i> Theme</button>
                 <button class="sidebar-link" onclick="doLogout()"><i class="fas fa-right-from-bracket"></i> Logout</button>
               ` : ''}
            </div>
        </div>
    </div>`;
  document.body.insertAdjacentHTML('afterbegin', sidebarHtml);
}

function renderAdminSidebar() {
  const pg = document.body.dataset.page;
  const sidebarHtml = `
    <div class="admin-sidebar">
        <div class="sidebar-logo" style="margin-bottom:40px;">
            <a href="index.html" class="nav-logo"><img src="assets/img/logo main file-05.png" alt="e-plant" style="height:58px;"></a>
        </div>
        <div class="sidebar-nav">
            <a href="admin-dashboard.html" class="sidebar-link ${pg === 'admin-dash' ? 'active' : ''}"><i class="fas fa-gauge-high"></i> Dashboard</a>
            <a href="admin-manage-plants.html" class="sidebar-link ${pg === 'admin-manage' ? 'active' : ''}"><i class="fas fa-leaf"></i> Manage Plants</a>
            <a href="admin-orders.html" class="sidebar-link ${pg === 'admin-orders' ? 'active' : ''}"><i class="fas fa-shopping-cart"></i> Orders</a>
            <a href="admin-users.html" class="sidebar-link ${pg === 'admin-users' ? 'active' : ''}"><i class="fas fa-users"></i> Users</a>
            <div style="margin-top:auto; padding-top:20px; border-top:1px solid var(--border); position: absolute; bottom: 40px; width: calc(100% - 32px);">
                <button class="sidebar-link" onclick="toggleTheme()"><i class="fas fa-circle-half-stroke"></i> Theme</button>
                <button class="sidebar-link" onclick="doLogout()"><i class="fas fa-right-from-bracket"></i> Logout</button>
            </div>
        </div>
    </div>`;
  document.body.insertAdjacentHTML('afterbegin', sidebarHtml);
}

function renderFooter() {
  const footerHtml = `
    <div class="footer-inner">
        <div class="grid-3" style="gap:48px;">
            <div>
                <div class="footer-logo"><img src="assets/img/logo main file-05.png" alt="e-plant"></div>
                <p class="text-muted text-sm">Empowering your living spaces with fresh, vibrant greenery. Your trusted partner for indoor and outdoor plants.</p>
            </div>
            <div>
                <h4 class="mb-12">Quick Links</h4>
                <div class="flex-col" style="gap:10px;">
                    <a href="index.html" class="text-muted text-sm">Home</a>
                    <a href="shop.html" class="text-muted text-sm">Shop</a>
                    <a href="about.html" class="text-muted text-sm">About Us</a>
                </div>
            </div>
            <div>
                <h4 class="mb-12">Connect With Us</h4>
                <div class="flex-col" style="gap:10px;">
                    <span class="text-muted text-sm"><i class="fas fa-envelope" style="width:20px;"></i> support@eplant.com</span>
                    <span class="text-muted text-sm"><i class="fas fa-phone" style="width:20px;"></i> +977 1-444555</span>
                    <span class="text-muted text-sm"><i class="fas fa-location-dot" style="width:20px;"></i> Green Plaza, Kathmandu</span>
                </div>
            </div>
        </div>
        <div class="footer-bottom">&copy; ${new Date().getFullYear()} e-plant E-Commerce. Developed for College Project.</div>
    </div>`;
  const footer = document.createElement('footer');
  footer.className = 'site-footer';
  footer.innerHTML = footerHtml;
  document.body.appendChild(footer);
}

function toast(msg, type = 'success') {
  let c = $('toast-container');
  if (!c) { c = document.createElement('div'); c.id = 'toast-container'; document.body.appendChild(c); }
  const t = document.createElement('div');
  t.className = `toast toast-${type}`;
  t.innerHTML = `<i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i><span>${msg}</span>`;
  c.appendChild(t);
  setTimeout(() => { t.style.animation = 'slideOut .3s ease forwards'; setTimeout(() => t.remove(), 300); }, 3000);
}

function toggleSidebar() { $('sidebar')?.classList.toggle('open'); $('overlay')?.classList.toggle('open'); }
function toggleDD() { $('dd')?.classList.toggle('open'); }
document.addEventListener('click', e => { if (!e.target.closest('.user-menu-wrap')) $('dd')?.classList.remove('open'); });

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  const target = current === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', target);
  localStorage.setItem('ep_theme', target);
  updateThemeIcon();
}

function updateThemeIcon() {
  const btn = $('theme-toggle-btn'); if (!btn) return;
  const isLight = document.documentElement.getAttribute('data-theme') === 'light';
  btn.innerHTML = isLight ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
}

function initTheme() {
  const saved = localStorage.getItem('ep_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', saved);
  updateThemeIcon();
}

function plantCard(p) {
  const isOutOfStock = p.stock === 0;
  const isLowStock = p.stock > 0 && p.stock <= 10;
  const season = p.season || 'All-Season';
  return `
    <div class="card product-card fade-up">
        <div class="plant-visual" onclick="window.location.href='plant-detail.html?id=${p.id}'" style="cursor:pointer;"><img src="${p.image}" alt="${p.name}"></div>
        <div style="padding:20px;">
            <div class="flex-between mb-8" style="gap:6px;align-items:flex-start;">
                <div style="display:flex;gap:6px;align-items:center;flex-wrap:wrap;">
                    <span class="badge badge-cat">${p.category}</span>
                    <span class="badge badge-season"><i class="fas fa-calendar-alt" style="font-size:0.65rem;margin-right:3px;"></i>${season}</span>
                </div>
                ${isOutOfStock ? '<span class="badge badge-red">Sold Out</span>' : isLowStock ? `<span class="badge" style="background:rgba(245,158,11,0.1);color:#f59e0b;">Only ${p.stock} left</span>` : '<span class="badge badge-green">In Stock</span>'}
            </div>
            <h3 class="mb-4" onclick="window.location.href='plant-detail.html?id=${p.id}'" style="cursor:pointer;font-size:1.15rem;">${p.name}</h3>
            <p class="text-muted text-sm mb-12" style="display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;height:40px;">${p.description}</p>
            <div class="flex-between">
                <div class="fw-700 text-green">${fmt(p.price)}</div>
                ${isAdmin() ? `<a href="admin-plant-form.html?id=${p.id}" class="btn btn-ghost btn-sm">Edit</a>` : `<button class="btn btn-primary btn-sm" onclick="addToCart(${p.id})" ${isOutOfStock ? 'disabled' : ''}>Add</button>`}
            </div>
        </div>
    </div>`;
}

/* =====================================================
   4. PAGE LOGIC
   ===================================================== */

async function addToCart(pid, qty = 1) {
  if (!S.user) { localStorage.setItem('ep_redir', window.location.href); window.location.href = 'login.html'; return; }
  const p = getPlant(pid); if (!p || p.stock === 0) return;
  try {
    await api.post('/api/cart/' + S.user.id + '/add', { plantId: pid, qty: qty });
    const existing = S.cart.find(i => i.plantId === pid);
    if (existing) { existing.qty += qty; } else { S.cart.push({ plantId: pid, qty: qty }); }
    toast(p.name + ' added to cart');
    refreshUI();
  } catch (e) {
    if (e.name === 'ForbiddenError') return;
    toast('Failed to add to cart: ' + e.message, 'error');
  }
}

async function updateCartQty(pid, qty) {
  if (qty <= 0) { await removeFromCart(pid); return; }
  try {
    await api.put('/api/cart/' + S.user.id + '/update', { plantId: pid, qty: qty });
    const item = S.cart.find(i => i.plantId === pid);
    if (item) item.qty = qty;
    refreshUI();
  } catch (e) {
    if (e.name === 'ForbiddenError') return;
    toast('Failed to update cart', 'error');
  }
}

async function removeFromCart(pid) {
  try {
    await api.del('/api/cart/' + S.user.id + '/remove/' + pid);
    S.cart = S.cart.filter(i => i.plantId !== pid);
    refreshUI();
  } catch (e) {
    if (e.name === 'ForbiddenError') return;
    toast('Failed to remove item', 'error');
  }
}

function doLogout() {
  S.user = null; S.cart = [];
  authToken = null;
  localStorage.removeItem('ep_token');
  localStorage.removeItem('ep_user');
  localStorage.removeItem('ep_uid');
  window.location.href = 'index.html';
}

async function refreshUI() {
  const oldNav = document.querySelector('.navbar'); const oldSidebar = $('sidebar'); const oldOverlay = $('overlay');
  if (oldNav) oldNav.remove(); if (oldSidebar) oldSidebar.remove(); if (oldOverlay) oldOverlay.remove();
  renderHeader(); initTheme();
  const pg = document.body.dataset.page;
  if (pg === 'cart') await initCart(); if (pg === 'shop') filterShop();
}

async function initHome() {
  if (useAPI && S.plants.length === 0) {
    try { S.plants = await api.get('/api/plants'); } catch (e) { console.warn(e); }
  }
  const grid = $('home-popular-grid'); if (grid) grid.innerHTML = S.plants.slice(0, 4).map(p => plantCard(p)).join('');
  const hero = $('hero-featured-plant'); if (hero && S.plants[0]) hero.innerHTML = `<img src="${S.plants[0].image}" class="fade-up" style="width:100%;max-height:400px;object-fit:cover;border-radius:20px;box-shadow:var(--shadow);">`;
}

let currentCat = 'All';
let currentSeason = 'All';

async function initShop() {
  if (!S.plants || S.plants.length === 0) {
    try {
      const res = await api.get('/api/plants');
      if (Array.isArray(res) && res.length > 0) S.plants = res;
    } catch (e) { console.warn(e); }
  }

  // Ensure every plant has a season fallback
  S.plants.forEach(p => { if (!p.season || !p.season.trim()) p.season = 'All-Season'; });

  // Read URL query params if present (e.g. ?category=Indoor or ?season=Spring)
  const urlParams = new URLSearchParams(window.location.search);
  const paramCat = urlParams.get('category') || urlParams.get('cat');
  const paramSeason = urlParams.get('season');
  if (paramCat) currentCat = paramCat;
  if (paramSeason) currentSeason = paramSeason;

  // Type / Category tabs
  const cats = ['All', ...new Set(S.plants.map(p => p.category).filter(Boolean))];
  const fc = $('catFilters');
  if (fc) {
    fc.innerHTML = cats.map(c => `
      <button type="button" class="pill ${currentCat.toLowerCase() === c.toLowerCase() ? 'active' : ''}" onclick="setCat('${c}',this)">${c}</button>
    `).join('');
  }

  // Season tabs
  const defaultSeasons = ['Spring', 'Summer', 'Autumn', 'Winter', 'All-Season'];
  const plantSeasons = new Set(S.plants.map(p => p.season).filter(Boolean));
  const seasonList = [
    'All',
    ...defaultSeasons.filter(s => plantSeasons.size === 0 || plantSeasons.has(s)),
    ...[...plantSeasons].filter(s => !defaultSeasons.includes(s))
  ];
  const sf = $('seasonFilters');
  if (sf) {
    sf.innerHTML = seasonList.map(s => `
      <button type="button" class="pill ${currentSeason.toLowerCase() === s.toLowerCase() ? 'active' : ''}" onclick="setSeason('${s}',this)">${s}</button>
    `).join('');
  }

  filterShop();
}

function setCat(cat, el) {
  currentCat = cat;
  document.querySelectorAll('#catFilters .pill').forEach(p => p.classList.remove('active'));
  if (el) el.classList.add('active');
  filterShop();
}

function setSeason(season, el) {
  currentSeason = season;
  document.querySelectorAll('#seasonFilters .pill').forEach(p => p.classList.remove('active'));
  if (el) el.classList.add('active');
  filterShop();
}

function filterShop() {
  const q = ($('shopSearch')?.value || '').trim().toLowerCase();
  const f = S.plants.filter(p => {
    const pCat = p.category || '';
    const pSeason = p.season || 'All-Season';

    const matchesCat = (currentCat === 'All' || pCat.toLowerCase() === currentCat.toLowerCase());
    const matchesSeason = (currentSeason === 'All' || pSeason.toLowerCase() === currentSeason.toLowerCase());
    const matchesSearch = !q || p.name.toLowerCase().includes(q) || (p.description && p.description.toLowerCase().includes(q));

    return matchesCat && matchesSeason && matchesSearch;
  });

  const grid = $('shopGrid');
  if (!grid) return;
  if (!f.length) {
    grid.innerHTML = '';
    $('shopEmpty').style.display = 'block';
  } else {
    $('shopEmpty').style.display = 'none';
    grid.innerHTML = f.map(p => plantCard(p)).join('');
  }
}

async function initDetail() {
  if (useAPI && S.plants.length === 0) {
    try { S.plants = await api.get('/api/plants'); } catch (e) { console.warn(e); }
  }
  const id = new URLSearchParams(window.location.search).get('id'); const p = getPlant(id);
  const container = $('detail-container'); if (!container || !p) return;
  const related = S.plants.filter(r => r.category === p.category && r.id !== p.id).slice(0, 3);
  container.innerHTML = `
    <a href="shop.html" class="text-muted text-sm mb-24" style="display:inline-flex;align-items:center;gap:8px;"><i class="fas fa-arrow-left"></i> Back to Shop</a>
    <div class="grid-2" style="gap:60px;">
        <div class="fade-up"><img src="${p.image}" alt="${p.name}" style="width:100%; border-radius:20px; box-shadow:var(--shadow);"></div>
        <div class="fade-up" style="animation-delay:0.1s;">
            <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;" class="mb-12">
                <span class="badge badge-cat">${p.category}</span>
                ${p.season ? `<span class="badge badge-season"><i class="fas fa-calendar-alt" style="font-size:0.75rem;margin-right:4px;"></i>${p.season} Season</span>` : ''}
            </div>
            <h1 class="mb-12" style="font-size:2.5rem;">${p.name}</h1>
            <div class="text-green fw-700 mb-24" style="font-size:2rem;">${fmt(p.price)}</div>
            <p class="text-muted mb-24" style="font-size:1.1rem;line-height:1.8;">${p.description}</p>
            <div class="card" style="padding:24px;background:rgba(255,255,255,0.02);">
                <div class="mb-16 text-sm"><i class="fas fa-truck-fast"></i> Delivery within 2-3 business days.</div>
                <button class="btn btn-primary btn-full" style="padding:16px;font-size:1.1rem;" onclick="addToCart(${p.id})">Add to Cart</button>
            </div>
        </div>
    </div>
    <div style="margin-top:80px;"><h2 class="mb-24">Related Greenery</h2><div class="grid-3">${related.map(r => plantCard(r)).join('')}</div></div>`;
}

async function initCart() {
  const c = $('cart-container'); if (!c) return;
  if (!S.cart.length) { c.innerHTML = '<div class="empty-state" style="padding:100px 0;"><h3>Your cart is empty</h3><p>Looks like you haven\'t added any plants yet.</p><a href="shop.html" class="btn btn-primary">Start Shopping</a></div>'; return; }
  const sub = cartSub(), df = deliveryFee(), tot = sub + df;
  let rows = S.cart.map(i => {
    const p = getPlant(i.plantId); if (!p) return '';
    return `
      <div class="card" style="padding:20px;margin-bottom:16px;display:flex;align-items:center;gap:20px;">
          <img src="${p.image}" style="width:80px;height:80px;object-fit:cover;border-radius:10px;">
          <div style="flex:1;"><h4 class="mb-4">${p.name}</h4><div class="text-muted text-sm">${fmt(p.price)}</div></div>
          <div class="qty-selector"><button onclick="updateCartQty(${p.id},${i.qty - 1})">−</button><span class="qty-val">${i.qty}</span><button onclick="updateCartQty(${p.id},${i.qty + 1})">+</button></div>
          <div class="fw-700" style="width:120px;text-align:right;">${fmt(p.price * i.qty)}</div>
          <button class="btn btn-ghost btn-sm" onclick="removeFromCart(${p.id})"><i class="fas fa-trash-can"></i></button>
      </div>`;
  }).join('');
  c.innerHTML = `<h1 class="mb-32">Shopping Cart</h1><div class="grid-2" style="grid-template-columns: 1.5fr 1fr;"><div>${rows}</div><div class="summary-card"><h3 class="mb-24">Order Summary</h3><div class="summary-row"><span>Items (${cartCount()})</span><span>${fmt(sub)}</span></div><div class="summary-row"><span>Shipping</span><span>${df === 0 ? '<span class="text-green">Free</span>' : fmt(df)}</span></div><div class="summary-row total" style="margin-top:20px;"><span>Estimated Total</span><span class="text-green">${fmt(tot)}</span></div><button class="btn btn-primary btn-full mt-24" style="padding:16px;" onclick="window.location.href='checkout.html'">Proceed to Checkout</button></div></div>`;
}

async function initMyOrders() {
  const c = $('orders-list'); if (!c || !S.user) return;
  let userOrders = [];
  if (useAPI) {
    try { userOrders = await api.get('/api/orders/' + S.user.id); } catch (e) { console.warn(e); }
    userOrders = userOrders.map(o => ({ ...o, items: o.itemsJson ? JSON.parse(o.itemsJson) : [] }));
  } else {
    userOrders = S.orders.filter(o => o.userId === S.user.id);
  }
  userOrders = userOrders.reverse();
  if (!userOrders.length) { c.innerHTML = '<div class="empty-state"><h3>No orders yet</h3></div>'; return; }
  c.innerHTML = userOrders.map(o => {
    const statusColor = o.status === 'Delivered' ? 'badge-green' :
      o.status === 'Shipped' ? 'badge-blue' :
        o.status === 'Cancelled' ? 'badge-red' : 'badge-amber';
    return `<div class="card mb-24" style="padding:24px;"><div class="flex-between mb-16"><div><span class="fw-700">Order #${o.id}</span><div class="text-muted text-sm">${o.date}</div></div><span class="badge ${statusColor}">${o.status}</span></div><div class="flex-col" style="gap:12px;">${o.items.map(i => { const p = getPlant(i.plantId); return `<div class="flex-between text-sm"><span>${p ? p.name : 'Unknown'} x ${i.qty}</span><span>${fmt((p ? p.price : 0) * i.qty)}</span></div>` }).join('')}</div><div class="flex-between mt-16 pt-16" style="border-top:1px solid var(--border);"><span class="fw-600">Total</span><span class="fw-700 text-green">${fmt(o.total)}</span></div></div>`;
  }).join('');
}

async function initAdminDash() {
  const c = $('admin-dash-content'); if (!c) return;
  let stats = {};
  let orders = [];
  let users = [];
  if (useAPI) {
    try {
      stats = await api.get('/api/admin/stats');
      orders = await api.get('/api/orders');
      users = await api.get('/api/admin/users');
    } catch (e) { console.warn(e); }
  }
  const totalSales = useAPI ? (stats.totalSales || 0) : S.orders.reduce((s, o) => s + o.total, 0);
  const orderCount = useAPI ? (stats.totalOrders || 0) : S.orders.length;
  const totalPlants = useAPI ? (stats.totalPlants || S.plants.length) : S.plants.length;
  const totalUsers = useAPI ? (stats.totalUsers || 0) : S.users.length;
  const pendingUsers = users.filter(u => !u.approved && u.role !== 'ADMIN');
  const recentOrders = orders.slice().reverse().slice(0, 5);

  c.innerHTML = `
    <h1 class="mb-32">Dashboard Overview</h1>
    <div class="grid-4 mb-48">
      <div class="card stat-card">
        <div style="width:48px;height:48px;border-radius:12px;background:rgba(168,230,29,0.1);color:var(--primary);display:flex;align-items:center;justify-content:center;font-size:1.25rem;margin-bottom:16px;"><i class="fas fa-dollar-sign"></i></div>
        <div class="stat-value">${fmt(totalSales)}</div>
        <div class="text-muted text-sm">Total Sales</div>
      </div>
      <div class="card stat-card">
        <div style="width:48px;height:48px;border-radius:12px;background:rgba(59,130,246,0.1);color:#60a5fa;display:flex;align-items:center;justify-content:center;font-size:1.25rem;margin-bottom:16px;"><i class="fas fa-shopping-bag"></i></div>
        <div class="stat-value">${orderCount}</div>
        <div class="text-muted text-sm">Orders</div>
      </div>
      <div class="card stat-card">
        <div style="width:48px;height:48px;border-radius:12px;background:rgba(245,158,11,0.1);color:#f59e0b;display:flex;align-items:center;justify-content:center;font-size:1.25rem;margin-bottom:16px;"><i class="fas fa-leaf"></i></div>
        <div class="stat-value">${totalPlants}</div>
        <div class="text-muted text-sm">Plants</div>
      </div>
      <div class="card stat-card">
        <div style="width:48px;height:48px;border-radius:12px;background:rgba(168,230,29,0.1);color:var(--primary);display:flex;align-items:center;justify-content:center;font-size:1.25rem;margin-bottom:16px;"><i class="fas fa-users"></i></div>
        <div class="stat-value">${totalUsers}</div>
        <div class="text-muted text-sm">Users</div>
      </div>
    </div>

    <div class="grid-2 mb-48" style="grid-template-columns: 1.5fr 1fr;">
      <div>
        <div class="flex-between mb-24">
          <h2 class="section-title" style="font-size:1.25rem;">Recent Orders</h2>
          <a href="admin-orders.html" class="btn btn-ghost btn-sm">View All</a>
        </div>
        <div class="flex-col" style="gap:12px;">
          ${recentOrders.length === 0 ? '<div class="empty-state" style="padding:40px 0;"><h3>No orders yet</h3></div>' : recentOrders.map(o => `
            <div class="card" style="padding:20px;">
              <div class="flex-between mb-8">
                <span class="fw-700">Order #${o.id}</span>
                <span class="badge" style="background:rgba(59,130,246,0.1);color:#60a5fa;">${o.status}</span>
              </div>
              <div class="text-muted text-sm mb-8">${o.date}</div>
              <div class="flex-between">
                <span class="text-sm">${o.userId ? 'User #' + o.userId : 'Guest'}</span>
                <span class="fw-700 text-green">${fmt(o.total)}</span>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
      <div>
        <div class="flex-between mb-24">
          <h2 class="section-title" style="font-size:1.25rem;">Pending Approvals</h2>
          <a href="admin-users.html" class="btn btn-ghost btn-sm">View All</a>
        </div>
        <div class="flex-col" style="gap:12px;">
          ${pendingUsers.length === 0 ? '<div class="empty-state" style="padding:40px 0;"><h3>No pending users</h3></div>' : pendingUsers.map(u => `
            <div class="card" style="padding:20px;">
              <div class="flex-between mb-8">
                <span class="fw-600">${u.name}</span>
                <span class="badge" style="background:rgba(245,158,11,0.1);color:#f59e0b;">Pending</span>
              </div>
              <div class="text-muted text-sm mb-12">${u.email}</div>
              <button class="btn btn-primary btn-sm" onclick="approveUser(${u.id})"><i class="fas fa-check"></i> Approve</button>
            </div>
          `).join('')}
        </div>
      </div>
    </div>

    <div class="card" style="padding:32px;background:linear-gradient(135deg,rgba(168,230,29,0.05),rgba(168,230,29,0.02));border:1px solid rgba(168,230,29,0.1);">
      <div class="flex-between" style="align-items:center;flex-wrap:wrap;gap:20px;">
        <div>
          <h2 class="mb-8" style="font-size:1.25rem;">Quick Actions</h2>
          <p class="text-muted text-sm">Manage your store efficiently</p>
        </div>
        <div style="display:flex;gap:12px;flex-wrap:wrap;">
          <a href="admin-plant-form.html" class="btn btn-primary"><i class="fas fa-plus"></i> Add Plant</a>
          <a href="admin-orders.html" class="btn btn-ghost"><i class="fas fa-shopping-cart"></i> View Orders</a>
          <a href="admin-users.html" class="btn btn-ghost"><i class="fas fa-users"></i> Manage Users</a>
        </div>
      </div>
    </div>
  `;
}

async function initAdminUsers() {
  const c = $('admin-users-list'); if (!c) return;
  if (!authToken) { c.innerHTML = '<div class="empty-state"><h3>Please login as admin</h3></div>'; return; }
  try {
    const users = await api.get('/api/admin/users');
    if (!Array.isArray(users)) throw new Error('Invalid response from server');
    if (users.length === 0) { c.innerHTML = '<div class="empty-state"><h3>No users found</h3></div>'; return; }
    c.innerHTML = users.map(u => {
      const safeName = (u.name || '').replace(/[<>"&]/g, '');
      const safeEmail = (u.email || '').replace(/[<>"&]/g, '');
      return `
        <div class="card" style="padding:20px;display:flex;align-items:center;gap:20px;flex-wrap:wrap;">
          <div style="width:48px;height:48px;border-radius:50%;background:var(--gradient);display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;">
            ${safeName.charAt(0).toUpperCase()}
          </div>
          <div style="flex:1;min-width:200px;">
            <div class="fw-600">${safeName}</div>
            <div class="text-muted text-sm">${safeEmail}</div>
          </div>
          <div class="flex-col" style="gap:4px;align-items:flex-end;">
            <span class="badge ${u.approved ? 'badge-green' : ''}" style="${!u.approved ? 'background:rgba(245,158,11,0.1);color:#f59e0b;' : ''}">${u.approved ? 'Approved' : 'Pending'}</span>
            <span class="badge" style="background:rgba(59,130,246,0.1);color:#60a5fa;">${u.role}</span>
          </div>
          <div style="display:flex;gap:8px;">
            ${!u.approved ? `<button class="btn btn-primary btn-sm" onclick="approveUser(${u.id})"><i class="fas fa-check"></i> Approve</button>` : ''}
            ${u.approved && u.role !== 'ADMIN' ? `<button class="btn btn-ghost btn-sm" onclick="rejectUser(${u.id})"><i class="fas fa-ban"></i> Disable</button>` : ''}
            <button class="btn btn-ghost btn-sm" onclick="deleteUser(${u.id})"><i class="fas fa-trash"></i></button>
          </div>
        </div>
      `;
    }).join('');
  } catch (e) {
    console.error('initAdminUsers error:', e);
    c.innerHTML = '<div class="empty-state"><h3>Failed to load users</h3><p class="text-muted">' + e.message + '</p></div>';
  }
}

async function approveUser(id) {
  try {
    await api.put('/api/admin/users/' + id + '/approve');
    toast('User approved');
    initAdminUsers();
  } catch (e) { if (e.name === 'ForbiddenError') return; toast('Failed to approve user: ' + e.message, 'error'); }
}

async function rejectUser(id) {
  if (!confirm('Disable this user?')) return;
  try {
    await api.put('/api/admin/users/' + id + '/reject');
    toast('User disabled');
    initAdminUsers();
  } catch (e) { if (e.name === 'ForbiddenError') return; toast('Failed to disable user: ' + e.message, 'error'); }
}

async function deleteUser(id) {
  if (!confirm('Delete this user permanently?')) return;
  try {
    await api.del('/api/admin/users/' + id);
    toast('User deleted');
    initAdminUsers();
  } catch (e) { if (e.name === 'ForbiddenError') return; toast('Failed to delete user: ' + e.message, 'error'); }
}

async function initAdminManage() {
  const grid = $('admin-plants-grid'); if (!grid) return;
  if (useAPI && S.plants.length === 0) {
    try { S.plants = await api.get('/api/plants'); } catch (e) { console.warn(e); }
  }
  grid.innerHTML = S.plants.map(p => `<div class="card" style="padding:16px;display:flex;align-items:center;gap:16px;"><img src="${p.image}" style="width:60px;height:60px;object-fit:cover;border-radius:8px;"><div style="flex:1;"><div class="fw-600">${p.name}</div><div class="text-muted text-sm">${p.category} • ${p.season || 'All-Season'} • ${fmt(p.price)}</div></div><a href="admin-plant-form.html?id=${p.id}" class="btn btn-ghost btn-sm"><i class="fas fa-edit"></i></a><button class="btn btn-ghost btn-sm" onclick="deletePlant(${p.id})"><i class="fas fa-trash"></i></button></div>`).join('');
}

async function initAdminOrders() {
  const c = $('admin-orders-list'); if (!c) return;
  let orders = [];
  if (useAPI) {
    try { orders = await api.get('/api/orders'); } catch (e) { console.warn(e); }
  } else {
    orders = S.orders;
  }
  c.innerHTML = orders.slice().reverse().map(o => `<div class="card mb-24" style="padding:24px;"><div class="flex-between"><div><span class="fw-700">Order #${o.id}</span></div><select class="form-input btn-sm" style="width:auto;" onchange="updateOrderStatus(${o.id}, this.value)"><option ${o.status === 'Pending' ? 'selected' : ''}>Pending</option><option ${o.status === 'Shipped' ? 'selected' : ''}>Shipped</option><option ${o.status === 'Delivered' ? 'selected' : ''}>Delivered</option></select></div><div class="flex-between mt-12"><span class="text-muted text-sm">${o.date}</span><span class="fw-700 text-green">${fmt(o.total)}</span></div></div>`).join('');
}

function initAdminForm() {
  const id = new URLSearchParams(window.location.search).get('id'); const p = id ? getPlant(id) : null;
  if (p) {
    $('form-title').innerText = 'Edit Plant';
    $('pName').value = p.name;
    $('pCat').value = p.category;
    if ($('pSeason')) $('pSeason').value = p.season || 'All-Season';
    $('pPrice').value = p.price;
    $('pStock').value = p.stock;
    $('pDesc').value = p.description;
    $('pImage').value = p.image;
  }
}

async function savePlant(e) {
  e.preventDefault();
  const id = new URLSearchParams(window.location.search).get('id');
  const seasonVal = $('pSeason') ? $('pSeason').value : 'All-Season';
  const data = {
    name: $('pName').value,
    category: $('pCat').value,
    season: seasonVal,
    price: +$('pPrice').value,
    stock: +$('pStock').value,
    description: $('pDesc').value,
    image: $('pImage').value
  };
  try {
    if (id) {
      await api.put('/api/plants/' + id, data);
    } else {
      await api.post('/api/plants', data);
    }
    window.location.href = 'admin-manage-plants.html';
  } catch (err) {
    if (err.name === 'ForbiddenError') return;
    toast('Failed to save plant: ' + err.message, 'error');
  }
}

async function deletePlant(id) {
  if (!confirm('Delete?')) return;
  try {
    await api.del('/api/plants/' + id);
    S.plants = S.plants.filter(p => p.id !== id);
    initAdminManage();
    toast('Plant deleted');
  } catch (err) {
    if (err.name === 'ForbiddenError') return;
    toast('Failed to delete plant', 'error');
  }
}

async function updateOrderStatus(id, s) {
  try {
    await api.put('/api/orders/' + id + '/status', { status: s });
    toast('Status updated');
  } catch (err) {
    if (err.name === 'ForbiddenError') return;
    toast('Failed to update status', 'error');
  }
}

async function handleLogin(e) {
  e.preventDefault();
  try {
    const data = await api.post('/api/auth/login', { email: $('loginEmail').value, password: $('loginPw').value });
    authToken = data.token;
    localStorage.setItem('ep_token', data.token);
    S.user = { id: data.id, name: data.name, email: data.email, role: data.role };
    localStorage.setItem('ep_user', JSON.stringify(S.user));
    const r = localStorage.getItem('ep_redir') || (isAdmin() ? 'admin-dashboard.html' : 'index.html');
    localStorage.removeItem('ep_redir');
    window.location.href = r;
  } catch (err) {
    if (err.name === 'ForbiddenError') return;
    toast(err.message || 'Invalid credentials', 'error');
  }
}

async function handleRegister(e) {
  e.preventDefault();
  try {
    const data = await api.post('/api/auth/register', { name: $('regName').value, email: $('regEmail').value, password: $('regPw').value });
    toast(data.message || 'Registration successful. Pending approval.');
    window.location.href = 'login.html';
  } catch (err) {
    if (err.name === 'ForbiddenError') return;
    toast(err.message || 'Registration failed', 'error');
  }
}

/* =====================================================
   5. APP LIFECYCLE (INITIALIZATION)
   ===================================================== */

window.onload = async () => {
  await loadState(); initTheme(); renderHeader();
  const pg = document.body.dataset.page;
  switch (pg) {
    case 'home': await initHome(); break;
    case 'shop': await initShop(); break;
    case 'detail': await initDetail(); break;
    case 'cart': await initCart(); break;
    case 'my-orders': await initMyOrders(); break;
    case 'admin-dash': await initAdminDash(); break;
    case 'admin-manage': await initAdminManage(); break;
    case 'admin-orders': await initAdminOrders(); break;
    case 'admin-users': await initAdminUsers(); break;
    case 'admin-form': initAdminForm(); break;
  }
  if (pg.startsWith('admin') && !isAdmin()) window.location.href = 'login.html';
  if (['cart', 'checkout', 'my-orders'].includes(pg) && !S.user) window.location.href = 'login.html';
};

window.addToCart = addToCart; window.updateCartQty = updateCartQty; window.removeFromCart = removeFromCart;
window.handleLogin = handleLogin; window.handleRegister = handleRegister;
window.toggleSidebar = toggleSidebar; window.toggleDD = toggleDD; window.doLogout = doLogout;
window.setCat = setCat; window.setSeason = setSeason; window.filterShop = filterShop; window.toggleTheme = toggleTheme;
window.savePlant = savePlant; window.deletePlant = deletePlant; window.updateOrderStatus = updateOrderStatus;
window.approveUser = approveUser; window.rejectUser = rejectUser; window.deleteUser = deleteUser;
