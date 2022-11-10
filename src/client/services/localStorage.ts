const CART_KEY = "cart";

interface CartItem {
    id: number;
    quantity: number;
    price: number;
}

function clearOutCart() {
    localStorage.removeItem(CART_KEY);
}

function retrieveCartData(): CartItem[] {
    const cart = localStorage.getItem(CART_KEY);

    if (cart) {
        return JSON.parse(cart);
    } else {
        return [];
    }
}

function addToCart(item: CartItem) {
    const currentCartData = retrieveCartData();
    localStorage.setItem(CART_KEY, JSON.stringify([item, ...currentCartData]));
}

export default {
    clearOutCart,
    retrieveCartData,
    addToCart
};
