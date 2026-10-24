export async function loadDataManually() {
    try {
        const resCustomers = await fetch('./data/customers.json');
        if (!resCustomers.ok) throw new Error("probleme customers");
        const customers = await resCustomers.json();

        const resProducts = await fetch('./data/products.json');
        if (!resProducts.ok) throw new Error("probleme products");
        const products = await resProducts.json();

        const resOrders = await fetch('./data/orders.json');
        if (!resOrders.ok) throw new Error("probleme orders");
        const orders = await resOrders.json();

        return { customers, products, orders };
    } catch (error) {
        console.error("Erreur de chargement:", error);
        throw error; 
    }
}