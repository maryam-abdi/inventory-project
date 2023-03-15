import Storage from "./Storage.js";
import ProductView from "./ProductView.js";
const categoryTitle = document.querySelector(".title--category");
const categorySection = document.querySelector(".category");
const categoryDescription = document.querySelector(".description--category");
const addNewCategoryBtn = document.querySelector(".add-category-btn");
const togglerCategory = document.querySelector(".toggle-category");
const cancelCategoryBtn = document.querySelector(".cancel-category-btn");
const selectCategory = document.querySelector("#category");
 class CategoryView{
constructor(){
    togglerCategory.addEventListener("click",this.actionToggle);
addNewCategoryBtn.addEventListener("click",(e)=>this.addNewCategory(e));
cancelCategoryBtn.addEventListener("click",(e)=>this.cancelCategory(e));

this.categories = [];
}
actionToggle(){
    categorySection.removeAttribute("hidden");
    togglerCategory.setAttribute("hidden", "");
}
addNewCategory(e){
e.preventDefault();
const title = categoryTitle.value;
const description = categoryDescription.value;
if(!title || !description) return;
Storage.saveCategory({title,description});
this.categories = Storage.getAllCategories();

this.createCategoriesList();
categoryTitle.value = "";
categoryDescription.value = "";
categorySection.setAttribute("hidden","");
togglerCategory.removeAttribute("hidden");
}
setApp(){
    this.categories = Storage.getAllCategories();
    //  console.log(this.categories)
}
createCategoriesList(){
    let result = `<option value="">select a category</option>`;
    
   this.categories.forEach((c)=>{
        result += `<option value=${c.id}>${c.title}</option>`
      
    });
    
    
    const categoriesList = document.getElementById("categories");
    categoriesList.innerHTML = result;
    this.listCategoryOptions();
}
cancelCategory(){
    categorySection.setAttribute("hidden","");
        togglerCategory.removeAttribute("hidden");
}
listCategoryOptions(){
let result = `<option value="all">All</option>`;
this.categories.forEach((item)=>{
    result += `<option >${item.title}</option>`;
});
selectCategory.innerHTML = result;
}

 }
export default new CategoryView();