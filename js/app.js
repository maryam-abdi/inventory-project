
import CategoryView from "./CategoryView.js";
import ProductView from "./ProductView.js";
import Storage from "./Storage.js";
class App{
    
}

document.addEventListener("DOMContentLoaded",()=>{
    
    CategoryView.setApp();
    ProductView.setApp();
    CategoryView.createCategoriesList(CategoryView.categories);
    ProductView.CreateProductsList(ProductView.products);
})