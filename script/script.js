// All selectors
const categoryBtnContainer = document.getElementById('all-category-btns');
const allCategoryBtn = document.getElementsByClassName('category-btn');
const plantCardsContainer = document.getElementById('plant-card-container');


const loadCategories = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/categories');
    const data = await res.json();
    displayCategories(data.categories)
}

const loadAllPlants = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/plants');
    const data = await res.json();
    displayPlants(data.plants);
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

loadCategories();
loadAllPlants();