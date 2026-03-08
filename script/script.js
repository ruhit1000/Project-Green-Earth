// All selectors
const categoryBtnContainer = document.getElementById('all-category-btns');
const allCategoryBtn = document.getElementsByClassName('category-btn');
const plantCardsContainer = document.getElementById('plant-card-container');
const loadingSpinner = document.getElementById('loading-spinner');


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
    displayPlants(data.plants);
    showLoadingSpinner(false);
}

const loadAllTrees = async () => {
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
    displayPlants(data.plants);
    showLoadingSpinner(false);
}

const displayPlants = (plants) => {
    plantCardsContainer.innerHTML = '';
    plants.forEach((plant) => {
        const plantCard = document.createElement('div');
        plantCard.className = "p-4 bg-base-100 rounded-lg shadow-md space-y-3";
        plantCard.innerHTML = `
        <img class="max-w-[298px] max-h-[178px] object-cover cursor-pointer w-full" src=${plant.image} alt="${plant.name}">
        <div class="space-y-2">
            <h3 class="font-semibold text-sm">${plant.name}</h3>
            <p class="text-[#71717A] text-xs line-clamp-2">${plant.description}</p>
            <div class="flex justify-between">
                <div class="badge badge-soft badge-success text-sm font-medium">${plant.category}</div>
                <p class="font-semibold text-sm">৳${plant.price}</p>
            </div>
         </div>
        <button class="btn w-full bg-[#15803D] text-white rounded-full">Add to Cart</button>
        `
        plantCardsContainer.appendChild(plantCard);
    })
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