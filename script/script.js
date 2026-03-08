// All selectors
const categoryBtnContainer = document.getElementById('all-category-btns');
const allCategoryBtn = document.getElementsByClassName('category-btn');
const plantCardsContainer = document.getElementById('plant-card-container');
const loadingSpinner = document.getElementById('loading-spinner');
const cartItemsContainer = document.getElementById('cart-items');
const emptyCartMessage = document.getElementById('empty-cart-message');
const cartTotal = document.getElementById('cart-total');
let cart = [];


let fetchedPlants = [];
const showMoreContainer = document.getElementById('show-more-container');
const showMoreBtn = document.getElementById('show-more-btn');


const displayCategories = (categories) => {
    categories.forEach((category) => {
        const categoryBtn = document.createElement('button');
        categoryBtn.className = "category-btn btn btn-ghost w-full";
        categoryBtn.innerText = category.category_name;
        categoryBtn.addEventListener('click', () => {
            for (const btn of allCategoryBtn) {
                btn.classList.remove('bg-[#15803D]', 'text-white');
                btn.classList.add('btn-ghost');
            }
            categoryBtn.classList.add('bg-[#15803D]', 'text-white');
            plantCardsContainer.innerHTML = '';
            loadPlantsByCategory(category.id);
        })
        categoryBtnContainer.appendChild(categoryBtn);

    })
}

const loadPlantsByCategory = async (categoryId) => {
    showLoadingSpinner(true);
    const res = await fetch(`https://openapi.programming-hero.com/api/category/${categoryId}`);
    const data = await res.json();

    fetchedPlants = data.plants;
    displayPlants(fetchedPlants, false);

    showLoadingSpinner(false);
}

const loadAllTrees = () => {
    plantCardsContainer.innerHTML = '';
    const allCategoryBtn = document.getElementsByClassName('category-btn');
    for (const btn of allCategoryBtn) {
        btn.classList.remove('bg-[#15803D]', 'text-white');
        btn.classList.add('btn-ghost');
    }
    allCategoryBtn[0].classList.add('bg-[#15803D]', 'text-white');
    loadAllPlants();
}


const loadCategories = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/categories');
    const data = await res.json();
    displayCategories(data.categories)
}

const loadAllPlants = async () => {
    showLoadingSpinner(true);
    const res = await fetch('https://openapi.programming-hero.com/api/plants');
    const data = await res.json();

    fetchedPlants = data.plants;
    displayPlants(fetchedPlants, false);

    showLoadingSpinner(false);
}

const displayPlants = (plants, isShowAll) => {
    plantCardsContainer.innerHTML = '';

    const limit = 6;

    let plantsToDisplay = plants;

    if (!isShowAll && plants.length > limit) {
        plantsToDisplay = plants.slice(0, limit);
        showMoreContainer.classList.remove('hidden');
    } else {
        showMoreContainer.classList.add('hidden');
    }

    plantsToDisplay.forEach((plant) => {
        const plantCard = document.createElement('div');
        plantCard.className = "p-4 bg-base-100 rounded-lg shadow-md space-y-3";
        plantCard.innerHTML = `
        <div class="h-[178px] w-full overflow-hidden rounded-lg">
             <img class="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-300" src=${plant.image} alt="${plant.name}">
        </div>
        <div class="space-y-2">
            <h3 class="font-semibold text-sm">${plant.name}</h3>
            <p class="text-[#71717A] text-xs line-clamp-2">${plant.description}</p>
            <div class="flex justify-between">
                <div class="badge badge-soft badge-success text-sm font-medium">${plant.category}</div>
                <p class="font-semibold text-sm">৳${plant.price}</p>
            </div>
         </div>
        <button onclick="addToCart(${plant.id}, '${plant.name}', ${plant.price})" class="btn w-full bg-[#15803D] text-white rounded-full">Add to Cart</button>
        `
        plantCardsContainer.appendChild(plantCard);
    })
}

showMoreBtn.addEventListener('click', () => {
    displayPlants(fetchedPlants, true);
});

const addToCart = (id, name, price) => {
    const existingItem = cart.find(item => item.id === id);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id, name, price, quantity: 1 });
    }
    updateCartUI();
}

const updateCartUI = () => {
    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
        emptyCartMessage.classList.remove('hidden');
        cartTotal.textContent = '0.00';
        return;
    } else {
        emptyCartMessage.classList.add('hidden');
    }

    let total = 0;
    cart.forEach((item) => {
        total += item.price * item.quantity;
        const cartItem = document.createElement('div');
        cartItem.className = "flex justify-between items-center py-2 px-3 bg-[#F0FDF4] rounded-lg mb-3";
        cartItem.innerHTML = `
        <div>
            <h3 class="font-semibold text-sm mb-1">${item.name}</h3>
            <p class="text-[#1F2937]">৳${item.price} x ${item.quantity}</p>
        </div>
        <div>
            <button class="btn btn-ghost btn-sm" onclick="removeFromCart(${item.id})">x</button>
        </div>
        `
        cartItemsContainer.appendChild(cartItem);
    })
    cartTotal.textContent = total.toFixed(2);
}

const removeFromCart = (id) => {
    cart = cart.filter(item => item.id !== id);
    updateCartUI();
}

const showLoadingSpinner = (status) => {
    if (status) {
        loadingSpinner.classList.remove('hidden');
    } else {
        loadingSpinner.classList.add('hidden');
    }
}

loadCategories();
loadAllPlants();