// js/selectors.js
export function getCustomerById(state, customerId) {
    return state.customers.find(customer => customer.id === customerId);
}

export function getProductById(state, productId) {
    return state.products.find(product => product.id === productId);
}

export function getOrderTotal(state, order) {
    let total = 0;
    order.items.forEach(item => {
        const product = getProductById(state, item.productId);
        if (product) {
            total += product.price * item.quantity;
        }
    });
    return total;
}

export function getFilteredOrders(state) {
    return state.orders.filter(order => {
        const customer = getCustomerById(state, order.customerId);
        if (!customer) return false; 

        const matchSearch = customer.name.toLowerCase().includes(state.searchQuery.toLowerCase());
        const matchStatus = state.selectedStatus === "" || order.status === state.selectedStatus;
        
        let matchCategory = true;
        if (state.selectedCategory !== "") {
            matchCategory = order.items.some(item => {
                const product = getProductById(state, item.productId);
                return product ? product.category === state.selectedCategory : false;
            });
        }

        return matchSearch && matchStatus && matchCategory;
    });
}