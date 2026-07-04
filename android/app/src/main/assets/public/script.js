// بيانات المنتجات (يمكنك تغيير الأسماء والأسعار والأشكال التعبيرية من هنا)
const products = [
    { id: 1, name: "سماعات لاسلكية", price: 150, icon: "🎧" },
    { id: 2, name: "ساعة ذكية", price: 250, icon: "⌚" },
    { id: 3, name: "هاتف ذكي", price: 1200, icon: "📱" },
    { id: 4, name: "كمبيوتر محمول", price: 3500, icon: "💻" },
    { id: 5, name: "كاميرا رقمية", price: 800, icon: "📷" },
    { id: 6, name: "شاحن سريع", price: 50, icon: "🔌" }
];

// مصفوفة لتخزين عناصر السلة
let cart = [];

// عرض المنتجات في الصفحة عند تحميلها
const productsContainer = document.getElementById('products-container');

function displayProducts() {
    productsContainer.innerHTML = "";
    products.forEach(product => {
        productsContainer.innerHTML += `
            <div class="product-card">
                <div class="product-image">${product.icon}</div>
                <div class="product-title">${product.name}</div>
                <div class="product-price">${product.price} ريال</div>
                <button class="add-btn" onclick="addToCart(${product.id})">إضافة للسلة</button>
            </div>
        `;
    });
}

// فتح وإغلاق السلة
function toggleCart() {
    const sidebar = document.getElementById('cart-sidebar');
    sidebar.classList.toggle('active');
}

// إضافة منتج إلى السلة
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const cartItem = cart.find(item => item.id === productId);

    if (cartItem) {
        cartItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCartUI();
}

// تحديث واجهة السلة (الأعداد والأسعار)
function updateCartUI() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');

    // تحديث عدد العناصر فوق أيقونة السلة
    let totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.innerText = totalCount;

    // تحديث عناصر السلة بالداخل
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p style="text-align: center; color: #888;">السلة فارغة حالياً</p>';
        cartTotal.innerText = "0";
        return;
    }

    cartItemsContainer.innerHTML = "";
    let totalPrice = 0;

    cart.forEach(item => {
        totalPrice += item.price * item.quantity;
        cartItemsContainer.innerHTML += `
            <div class="cart-item">
                <div>
                    <h4>${item.name}</h4>
                    <small>${item.price} ريال × ${item.quantity}</small>
                </div>
                <button onclick="removeFromCart(${item.id})" style="background:none; border:none; color:red; cursor:pointer;">حذف</button>
            </div>
        `;
    });

    cartTotal.innerText = totalPrice;
}

// حذف عنصر من السلة
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
}

// إتمام الشراء (رسالة تنبيهية)
function checkout() {
    if(cart.length === 0) {
        alert("سلتك فارغة، أضف بعض المنتجات أولاً!");
        return;
    }
    alert("شكراً لشرائك! تم استلام طلبك بنجاح 🎉");
    cart = [];
    updateCartUI();
    toggleCart();
}

// تشغيل الدالة لعرض المنتجات فور فتح الصفحة
displayProducts();