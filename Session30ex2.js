let listBook = [
    { id: 1, name: "Lập trình JS", price: 150000, quantity: 10, category: "Lập trình" },
    { id: 2, name: "HTML & CSS", price: 120000, quantity: 8, category: "Thiết kế web" },
    { id: 3, name: "Python cơ bản", price: 180000, quantity: 5, category: "Lập trình" },
    { id: 4, name: "Data Science", price: 200000, quantity: 7, category: "Khoa học dữ liệu" }
];

let cart = [];

function showBooksByCategory() {
    let category = prompt("Nhập thể loại sách bạn muốn xem:");
    let filteredBooks = listBook.filter(book => book.category.toLowerCase() === category.toLowerCase());

    if (filteredBooks.length > 0) {
        console.table(filteredBooks);
    } else {
        alert("Không tìm thấy sách trong thể loại này.");
    }
}

function addBook() {
    let id = listBook.length + 1;
    let name = prompt("Nhập tên sách:");
    let price = +prompt("Nhập giá sách:");
    let quantity = +prompt("Nhập số lượng sách:");
    let category = prompt("Nhập thể loại sách:");

    listBook.push({ id, name, price, quantity, category });
    alert("Thêm sách thành công!");
}

function searchBook() {
    let keyword = prompt("Nhập tên hoặc ID sách:");
    let foundBooks = listBook.filter(book => 
        book.name.toLowerCase().includes(keyword.toLowerCase()) || book.id == keyword
    );

    if (foundBooks.length > 0) {
        console.table(foundBooks);
    } else {
        alert("Không tìm thấy sách.");
    }
}

function buyBook() {
    let bookId = +prompt("Nhập ID sách muốn mua:");
    let book = listBook.find(b => b.id === bookId);

    if (!book) {
        alert("Sách không tồn tại.");
        return;
    }

    let quantity = +prompt("Nhập số lượng muốn mua:");

    if (book.quantity < quantity) {
        alert("Số lượng sách không đủ.");
    } else {
        book.quantity -= quantity;

        let cartItem = cart.find(item => item.id === bookId);
        if (cartItem) {
            cartItem.quantity += quantity;
        } else {
            cart.push({ id: book.id, name: book.name, price: book.price, quantity });
        }

        alert("Mua sách thành công!");
    }
}

function sortBooksByPrice(order) {
    if (order === "asc") {
        listBook.sort((a, b) => a.price - b.price);
    } else {
        listBook.sort((a, b) => b.price - a.price);
    }
    console.table(listBook);
}

function calculateTotal() {
    let totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
    let totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    console.log(`Tổng số lượng sách đã mua: ${totalQuantity}`);
    console.log(`Tổng tiền: ${totalPrice.toLocaleString()} VND`);
}

function totalBooksInStock() {
    let total = listBook.reduce((sum, book) => sum + book.quantity, 0);
    console.log(`Tổng số sách trong kho: ${total}`);
}

let choice;
do {
    choice = +prompt(`
===== MENU =====
1. Hiển thị sách theo thể loại
2. Thêm sách vào kho
3. Tìm kiếm sách theo tên hoặc ID
4. Mua sách
5. Sắp xếp sách theo giá (1: Tăng dần, 2: Giảm dần)
6. Tính tổng tiền và số lượng sách đã mua
7. Hiển thị tổng số lượng sách trong kho
8. Thoát
================
Nhập lựa chọn của bạn:`);

    switch (choice) {
        case 1:
            showBooksByCategory();
            break;
        case 2:
            addBook();
            break;
        case 3:
            searchBook();
            break;
        case 4:
            buyBook();
            break;
        case 5:
            let order = +prompt("Nhập 1 để sắp xếp tăng dần, 2 để giảm dần:");
            sortBooksByPrice(order === 1 ? "asc" : "desc");
            break;
        case 6:
            calculateTotal();
            break;
        case 7:
            totalBooksInStock();
            break;
        case 8:
            alert("Tạm biệt!");
            break;
        default:
            alert("Lựa chọn không hợp lệ.");
    }
} while (choice !== 8);
