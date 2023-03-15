import ProductView from "./ProductView.js";

const products=[
    {
        id:1,
        title:"css",
       
        category:"frontend",
        createdAt:"2021-11-9T10:30:27.88Z",
    },
    {
        id:2,
        title:"html",
 
        category:"frontend",
        createdAt:"2020-11-9T10:30:27.88Z",
    }
  ]
  const categories=[
  {
    id:1,
    title:"frontend",
  
    description:"front of web",
    createdAt:"2021-11-9T10:30:27.88Z",
  },
  {
    id:1,
    title:"backend",
  
    description:"back of web",
    createdAt:"2019-11-9T10:30:27.88Z",
  }
  ]

export default class Storage{
static getAllCategories(){
  const  savedCategories = JSON.parse(localStorage.getItem("category")) || [];
 const sortedCategories = savedCategories.sort((a,b)=>{
    return new Date(a.createdAt) > new Date(b.createdAt) ? -1 : 1 ;
  });
  return sortedCategories;
}
static saveCategory(categoryToSave){
    const savedCategories = Storage.getAllCategories();
   const existedItem = savedCategories.find((c)=>c.id === categoryToSave.id);
   if(existedItem){
    existedItem.title = categoryToSave.title;
    existedItem.description = categoryToSave.description;
   }else{
categoryToSave.id = new Date().getTime();
categoryToSave.createdAt = new Date().toISOString();
savedCategories.push(categoryToSave);
   }
   localStorage.setItem("category",JSON.stringify(savedCategories));
}
static getAllProducts(sort="latest"){
    const  savedProducts = JSON.parse(localStorage.getItem("products")) || [];
    return savedProducts.sort((a,b)=>{
      if(sort === "latest"){

        return new Date(a.createdAt) > new Date(b.createdAt) ? -1 : 1 ;
      }else if(sort === "earliest"){
        return new Date(a.createdAt) > new Date(b.createdAt) ? 1 : -1 ;
      }
     });
    
}
static saveProduct(productToSave){
    const savedProducts = Storage.getAllProducts();
    const existedItem = savedProducts.find((c)=>c.id === productToSave.id);
    if(existedItem){
     existedItem.title = productToSave.title;
     existedItem.quantity = productToSave.quantity;
     existedItem.category = productToSave.category;
    }else{
 productToSave.id = new Date().getTime();
 productToSave.createdAt = new Date().toISOString();
 savedProducts.push(productToSave);
    }
    localStorage.setItem("products",JSON.stringify(savedProducts));  
}
static sortCategories(value ,sort="All"){
  const savedProducts = Storage.getAllProducts();
  
 return savedProducts.sort((a)=>{
    if(sort === "All"){
      return ProductView.products;
    }
    else if(sort === value){
      return a.category.toLowerCase().includes(value);
    }
  })

}
static deleteProduct(id){
  const savedProducts = Storage.getAllProducts();
 const filterProducts = savedProducts.filter((item)=>item.id != id);
 localStorage.setItem("products",JSON.stringify(filterProducts));
}
}
