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
        })
        categoryBtnContainer.appendChild(categoryBtn);
    })
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