import state from './state.js';
import { loadDataManually } from './dataService.js';
import { render } from './view.js';

async function init() {
    try {
        const data = await loadDataManually();
        
        state.customers = data.customers;
        state.products = data.products;
        state.orders = data.orders;

        const categorySelect = document.getElementById('categoryFilter');
        const categoriesUnique = [...new Set(state.products.map(p => p.category))];
        categoriesUnique.forEach(cat => {
            categorySelect.innerHTML += `<option value="${cat}">${cat}</option>`;
        });

        render(state);

        document.getElementById('searchInput').addEventListener('input', (event) => {
            state.searchQuery = event.target.value;
            render(state);
        });

        document.getElementById('statusFilter').addEventListener('change', (event) => {
            state.selectedStatus = event.target.value;
            render(state);
        });

        document.getElementById('categoryFilter').addEventListener('change', (event) => {
            state.selectedCategory = event.target.value;
            render(state);
        });

    } catch (error) {
        const errorZone = document.getElementById('error-zone');
        errorZone.textContent = "Erreur: Les fichiers JSON makhdaminch awla mal9ahomch.";
        errorZone.classList.remove('d-none');
        console.error("L'erreur est:", error);
    }
}

init();