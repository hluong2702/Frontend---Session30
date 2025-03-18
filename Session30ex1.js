let products = [
    { id: 1, name: "mèn mén", price: 20000, quantity: 20, category: "món ăn dân tộc Mông" },
    { id: 2, name: "mứt", price: 80000, quantity: 21, category: "món ăn dân tộc Kinh" },
    { id: 3, name: "cơm lam", price: 40000, quantity: 15, category: "món ăn dân tộc Mông" },
    { id: 4, name: "bánh đậu xanh", price: 60000, quantity: 30, category: "món ăn dân tộc Kinh" }
];
let choice;
let cart = [];

function showProductsByCategory() {
    let category = prompt("Nhập tên danh mục muốn xem:");
    let filteredProducts = products.filter(product => product.category.toLowerCase() === category.toLowerCase());
    console.table(filteredProducts.length ? filteredProducts : "Không có sản phẩm nào trong danh mục này.");
}

function buyProduct() {
    let id = +prompt("Nhập ID sản phẩm muốn mua:");
    let product = products.find(p => p.id === id);
    
    if (!product) {
        alert("Sản phẩm không có trong cửa hàng.");
        return;
    }
    
    let quantity = +prompt(`Nhập số lượng sản phẩm muốn mua (còn ${product.quantity}):`);
    
    if (quantity > product.quantity) {
        alert("Số lượng không đủ!");
        return;
    }

    if (product.quantity === 0) {
        alert("Hàng đã hết!")
        return;
    }
    
    product.quantity -= quantity;
    let cartItem = cart.find(item => item.id === id);
    
    if (cartItem) {
        cartItem.quantity += quantity;
    } else {
        cart.push({ id: product.id, name: product.name, price: product.price, quantity });
    }
    
    alert("Mua hàng thành công!");
}

function sortProducts(order) {
    let sortedProducts = [...products];
    sortedProducts.sort((a, b) => order === "asc" ? a.price - b.price : b.price - a.price);
    console.table(sortedProducts);
}

function calculateTotal() {
    let total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    alert(`Tổng tiền cần thanh toán: ${total} VND`);
}

do {
    choice = +prompt(`
        ========== MENU ==========
        1. Hiển thị sản phẩm theo danh mục
        2. Mua sản phẩm
        3. Sắp xếp sản phẩm theo giá tăng dần
        4. Sắp xếp sản phẩm theo giá giảm dần
        5. Tính tổng tiền thanh toán
        6. Thoát
        ===========================`);
    
    switch (choice) {
        case 1: 
            showProductsByCategory(); 
            break;
        case 2: 
            buyProduct(); 
            break;
        case 3: 
            sortProducts("asc");
            break;
        case 4: 
            sortProducts("desc"); 
            break;
        case 5: 
            calculateTotal(); 
            break;
        case 6: 
            alert("Cảm ơn đã sử dụng dịch vụ!"); 
            break;
        default: 
            alert("Lựa chọn không hợp lệ!");
    }
} while (choice !== 6);
