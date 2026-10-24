import { getCustomerById, getProductById, getOrderTotal, getFilteredOrders } from './selectors.js';

export function renderIndicators(state) {
    document.getElementById('count-customers').textContent = state.customers.length;
    document.getElementById('count-products').textContent = state.products.length;
    document.getElementById('count-orders').textContent = state.orders.length;
    
    let total = 0;
    state.orders.forEach(order => {
        total += getOrderTotal(state, order);
    });
    document.getElementById('sum-orders').textContent = total;
}

export function renderOrders(state) {
    const zone = document.getElementById('orders-zone');
    zone.innerHTML = ''; 

    const filteredOrders = getFilteredOrders(state);

    filteredOrders.forEach(order => {
        const customer = getCustomerById(state, order.customerId);
        const total = getOrderTotal(state, order);

        const div = document.createElement('div');
        div.className = 'border p-3 mb-2 bg-light';
        div.innerHTML = `
            <h5>Commande #${order.id}</h5>
            <p>Client : ${customer ? customer.name : 'Inconnu'}</p>
            <p>Statut : ${order.status}</p>
            <p>Total : ${total} MAD</p>
        `;

        const btn = document.createElement('button');
        btn.className = 'btn btn-primary btn-sm';
        btn.textContent = 'Détail';
        btn.onclick = () => showOrderModal(state, order);
        
        div.appendChild(btn);
        zone.appendChild(div);
    });
}

function showOrderModal(state, order) {
    const customer = getCustomerById(state, order.customerId);
    const content = document.getElementById('modal-content');
    
    let html = `
        <p><strong>Commande :</strong> #${order.id}</p>
        <p><strong>Client :</strong> ${customer.name} (${customer.city})</p>
        <p><strong>Date :</strong> ${order.date}</p>
        <p><strong>Statut :</strong> ${order.status}</p>
        <hr>
        <h6>Produits commandés :</h6>
        <ul>
    `;

    order.items.forEach(item => {
        const product = getProductById(state, item.productId);
        const montantLigne = product.price * item.quantity;
        html += `<li>${product.name} - ${product.price} MAD x ${item.quantity} = <strong>${montantLigne} MAD</strong></li>`;
    });

    html += `</ul><hr><h5>Total : ${getOrderTotal(state, order)} MAD</h5>`;
    content.innerHTML = html;

    const modal = new bootstrap.Modal(document.getElementById('orderModal'));
    modal.show();
}

export function render(state) {
    renderIndicators(state);
    renderOrders(state);
}