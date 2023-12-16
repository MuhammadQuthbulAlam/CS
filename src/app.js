document.addEventListener( 'alpine:init', ( ) => {
    Alpine.data('products', () => ({
      items: [
        { id: 1, name: 'Robusta Brazil', img: '1.jpg', price: 20000},
        { id: 2, name: 'Arabica Blend', img: '2.jpg', price: 25000},
        { id: 3, name: 'Primo Passo', img: '3.jpg', price: 54000},
        { id: 4, name: 'Aceh Gayo', img: '4.jpg', price: 36000},
        { id: 5, name: 'Sumatra Mandheling', img: '5.jpg', price: 47000},
        { id: 6, name: 'Black Coffee', img: '6.jpg', price: 37000},
    ],
    }));

    Alpine.store('cart', {
        items: [],
        total: 0,
        quantity: 0,
        add(newItem){
            // Cek apakah ada barang yang sama di cart
            const cartItem = this.items.find((item) => item.id === newItem.id);

            //Jika belum ada
            if(!cartItem){

            this.items.push({ ...newItem, quantity: 1, total: newItem.price });
            this.quantity++;
            this.total += newItem.price;
            } else {
                // Cek barang duplikat
                this.items = this.items.map((item) => {
                    // Jika barang berbeda
                    if (item.id !== newItem.id) {
                        return item;
                    } else {
                        item.quantity++;
                        item.total = item.price * item.quantity;
                        this.quantity++;
                        this.total += item.price;
                        return item;
                    }
                });
            }
        },
        remove(id) {
            // Ambil Item
            const cartItem = this.items.find((item) => item.id === id);

            // Jika item lebih dari 1
            if(cartItem.quantity > 1) {
                // Telusuri 1 1
                this.items = this.items.map((item) => {
                    if (item.id !== id) {
                        return item;
                    } else {
                        item.quantity--;
                        item.total = item.price * item.quantity;
                        this.quantity--;
                        this.total -= item.price;
                        return item;
                    }
                })
            } else if (cartItem.quantity === 1){
                this.items = this.items.filter((item) => item.id !== id);
                this.quantity--;
                this.total -= cartItem.price;
            }
        }
    });
});

// Form Validation

const checkoutButton = document.querySelector('.checkout-button');
checkoutButton.disabled = true;


const form = document.querySelector('#checkoutForm');
form.addEventListener('keyup', function() {
    for(let i = 0; i < form.elements.length; i++) {
        if(form.elements[i].value.length !== 0) {
            checkoutButton.classList.remove('disabled');
            checkoutButton.classList.add('disabled');
        } else {
            return false;
        }
    }
    checkoutButton.disabled = false;
    checkoutButton.classList.remove('disabled');
});

// konversi ke rupiah

const rupiah = (Number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(Number);
};