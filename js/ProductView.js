import Storage from "./Storage.js";
const addNewProductBtn = document.querySelector(".add-new-product-btn");
const productTitle = document.querySelector(".title--product");
const productQuantity = document.querySelector("#quantity");
const productCategory = document.querySelector("#categories");
const searchInput = document.querySelector("#search");
const selecteSort = document.querySelector("#sort");
const selectCategory = document.querySelector("#category");
class ProductView{
constructor(){
addNewProductBtn.addEventListener("click",(e)=>this.addNewProduct(e));
searchInput.addEventListener("input",(e)=>this.searchProducts(e));
selecteSort.addEventListener("change",(e)=>this.sortProducts(e));
selectCategory.addEventListener("change",(e)=>this.sortCategory(e));
this.products = [];
}

setApp(){
    this.products = Storage.getAllProducts();

   
}
addNewProduct(e){
    e.preventDefault();
const title = productTitle.value;
const quantity = productQuantity.value;
const category = productCategory.value;
if(!title || !quantity || !category) return;
Storage.saveProduct({title,quantity,category});
this.products = Storage.getAllProducts();

this.CreateProductsList(this.products);
productTitle.value = "";
productQuantity.value = "";
productCategory.value = "";

}

CreateProductsList(products){
    

    let result = "";
    products.forEach((p)=>{

        const selectedCategoryTwe = Storage.getAllCategories().find((c) => c.id == p.category);
        
        
        result += `<div class="product">
        <p>${p.title}</p>
        <div class="product-data">
          <span>${new Date().toLocaleDateString("fa-IR")}</span>
          <span class="product--category">${selectedCategoryTwe.title}</span>
          <span class="product--quantity">${p.quantity}</span>
          <button class="delete-btn" data-id=${p.id}>delete</button>
        </div>
      </div>`;
    
    });
    const productsList = document.querySelector(".products");
    productsList.innerHTML = result;
    const deleteBtns = [...document.querySelectorAll(".delete-btn")];
    deleteBtns.forEach((item)=>{

      item.addEventListener("click",(e)=>this.removeProduct(e));
    })
}
searchProducts(e){
const value = e.target.value.trim().toLowerCase();

 const filteredProducts = this.products.filter((item)=>{
    return item.title.toLowerCase().includes(value);
});
this.CreateProductsList(filteredProducts);

}

sortProducts(e){
    const value = e.target.value;
  const sortedProducts = Storage.getAllProducts(value);
   this.CreateProductsList(sortedProducts);
}
sortCategory(e){
   const value = e.target.value;
  console.log(value);
 const sortProductsCategory = Storage.sortCategories(value);
  this.CreateProductsList(sortProductsCategory);
}

removeProduct(e){
  const id = e.target.dataset.id;
 Storage.deleteProduct(id);
 this.products = Storage.getAllProducts();
 this.CreateProductsList(this.products);
}








}
export default new ProductView();