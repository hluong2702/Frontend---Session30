let phones = [
    { id: 1, name: "iPhone 14", price: 20000000, quantity: 5, company: "Apple" },
    { id: 2, name: "Samsung Galaxy S25", price: 18000000, quantity: 7, company: "Samsung" },
    { id: 3, name: "Xiaomi Mi ", price: 15000000, quantity: 10, company: "Xiaomi" },
    { id: 4, name: "iPhone 13", price: 17000000, quantity: 3, company: "Apple" }
];

let cart = [];
let choice;

function showPhonesByCompany() {
    let company = prompt("Nhap ten hang dien thoai ban muon xem:");
    let filteredPhones = phones.filter(phone => phone.company.toLowerCase() === company.toLowerCase());

    if (filteredPhones.length > 0) {
        console.table(filteredPhones);
    } else {
        alert("Khong tim thay dien thoai thuoc hang nay.");
    }
}

function addPhone() {
    let id = phones.length + 1;
    let name = prompt("Nhap ten dien thoai:");
    let price = +prompt("Nhap gia dien thoai:");
    let quantity = +prompt("Nhap so luong:");
    let company = prompt("Nhap hang dien thoai:");

    phones.push({ id, name, price, quantity, company });
    alert("Them dien thoai thanh cong!");
}

function searchPhone() {
    let keyword = prompt("Nhap ten hoac ID dien thoai:");
    let foundPhones = phones.filter(phone => 
        phone.name.toLowerCase().includes(keyword.toLowerCase()) || phone.id == keyword
    );

    if (foundPhones.length > 0) {
        console.table(foundPhones);
    } else {
        alert("Khong tim thay dien thoai.");
    }
}

function buyPhone() {
    let phoneId = +prompt("Nhap ID dien thoai muon mua:");
    let phone = phones.find(p => p.id === phoneId);

    if (!phone) {
        alert("Dien thoai khong ton tai.");
        return;
    }

    let quantity = +prompt("Nhap so luong muon mua:");

    if (phone.quantity < quantity) {
        alert("So luong dien thoai khong du.");
    } else {
        phone.quantity -= quantity;

        let cartItem = cart.find(item => item.id === phoneId);
        if (cartItem) {
            cartItem.quantity += quantity;
        } else {
            cart.push({ id: phone.id, name: phone.name, price: phone.price, quantity });
        }

        alert("Mua dien thoai thanh cong!");
    }
}

function checkout() {
    if (cart.length === 0) {
        alert("Gio hang trong!");
        return;
    }

    let totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    alert(`Thanh toan thanh cong! Tong tien: ${totalPrice.toLocaleString()} VND`);
    cart = [];
}

function sortPhonesByPrice(order) {
    if (order === "asc") {
        phones.sort((a, b) => a.price - b.price);
    } else {
        phones.sort((a, b) => b.price - a.price);
    }
    console.table(phones);
}

function totalMoneyInStock() {
    let totalMoney = phones.reduce((sum, phone) => sum + phone.price * phone.quantity, 0);
    console.log(`Tong tien cua tat ca dien thoai trong kho: ${totalMoney.toLocaleString()} VND`);
}

function totalPhonesByCompany() {
    let countByCompany = phones.reduce((acc, phone) => {
        acc[phone.company] = (acc[phone.company] || 0) + phone.quantity;
        return acc;
    }, {});

    console.table(countByCompany);
}

do {
    choice = +prompt(`
===== MENU =====
1. Hien thi danh sach dien thoai theo hang
2. Them dien thoai moi vao cua hang
3. Tim kiem dien thoai theo ten hoac ID
4. Mua dien thoai
5. Thanh toan gio hang
6. Sap xep dien thoai theo gia (1: Tang dan, 2: Giam dan)
7. Hien thi tong tien dien thoai trong kho
8. Hien thi tong so luong dien thoai theo hang
9. Thoat chuong trinh
================
Nhap lua chon cua ban:`);

    switch (choice) {
        case 1:
            showPhonesByCompany();
            break;
        case 2:
            addPhone();
            break;
        case 3:
            searchPhone();
            break;
        case 4:
            buyPhone();
            break;
        case 5:
            checkout();
            break;
        case 6:
            let order = +prompt("Nhap 1 de sap xep tang dan, 2 de giam dan:");
            sortPhonesByPrice(order === 1 ? "asc" : "desc");
            break;
        case 7:
            totalMoneyInStock();
            break;
        case 8:
            totalPhonesByCompany();
            break;
        case 9:
            alert("Tam biet!");
            break;
        default:
            alert("Lua chon khong hop le.");
    }
} while (choice !== 9);
