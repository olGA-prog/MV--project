


let ActiveProductArr;
let ActiveProductMiniList;
let CheackRepect = false;
let CheackRepect2 = false;
let CurrentCategory;
let CurrentListProductAtPage;






function CreateArrProduct(arrProduct, cheack){
    const CATALOG = document.getElementById('catalog-product-1');
    let arrCreated;
    if (cheack === null){
        ActiveProductArr = arrProduct;
        arrCreated = arrProduct;
        CurrentListProductAtPage = arrProduct;

    }
    else{
        arrCreated = arrProduct.filter((el) => el.category === cheack);
        CurrentListProductAtPage = arrCreated;
    }
    
    
    arrCreated.forEach((product) => {

        let productElement = document.createElement('div');
        productElement.classList.add('catalog-item');
        productElement.classList.add('item-product');
        productElement.classList.add('product-FS');

        productElement.dataset.IdProductMain =  product.id;
        productElement.dataset.CategoryProduct =  product.category;
        productElement.dataset.GeneralCategoryProduct =  product.general_category;




        let productPhoto = document.createElement('div');
        productPhoto.classList.add('item-product-photo');
        productPhoto.style.backgroundImage = `url(${product.img})`;
        productPhoto.style.backgroundSize = "cover";


        let productSvg = document.createElement('div');
        productSvg.classList.add('buttons-product-for-user')

        let productCorzin = document.createElement('div');
        productCorzin.classList.add('button-product-corzin');

        let CheckAddToCorzin = document.createElement('div');
        CheckAddToCorzin.classList.add('success-added');

        productCorzin.insertBefore(CheckAddToCorzin, null);
        


        let productLike = document.createElement('div');
        productLike.classList.add('but-like-element');
        
        if (product.liked === true){
            productLike.classList.add('button-product-like-clicked');
        }
        else{
            productLike.classList.add('button-product-like');
        }
        

        productSvg.insertBefore(productCorzin, null);
        productSvg.insertBefore(productLike, null);

        productPhoto.insertBefore(productSvg, null);


        let productInfo = document.createElement('div');
        productInfo.classList.add('item-product-title-info');

        let productName = document.createElement('p');
        productName.classList.add('info-element');
        productName.classList.add('info-product-name');
        productName.innerText = product.name;

        let productPrice = document.createElement('p');
        productPrice.classList.add('info-element');
        productPrice.classList.add('info-product-price');
        productPrice.innerText = `${product.price} руб/кг`;
        

        let productAdd = document.createElement('a');
        productAdd.classList.add('info-element');
        productAdd.classList.add('but-add-element');
        productAdd.classList.add('add-product');

      
        
        //productAdd.setAttribute("href", "#");

        if (product.add === true){
            CheckAddToCorzin.style.display = "block";
            productAdd.classList.add('button-product-add-clicked');
            productAdd.innerText = "Убрать из корзины";
        }
        else{
            CheckAddToCorzin.style.display = "none";
            productAdd.classList.add('button-product-add');
            productAdd.innerText = "Добавить в корзину";
        }

        
        productAdd.dataset.IdProduct =  product.id;

        productInfo.insertBefore(productName, null);
        productInfo.insertBefore(productPrice, null);
        productInfo.insertBefore(productAdd, null);

        productElement.insertBefore(productPhoto, null);
        productElement.insertBefore(productInfo, null);

        CATALOG.insertBefore(productElement, null);

        


        
    })
    InitButtonOfProduct();



}

function FindCorrectCategory(idCategory){
    switch(idCategory) {
        case 1:
            return CATALOG_MEAT;
            break;
      
        case 2:

            return CATALOG_DRINK;
            break; 
          

        case 3:

            return CATALOG_FR_AND_VEG;
            break; 
          
        
        case 4:
            return CATALOG_SNACKS;
            break;
          

        case 5:
            return CATALOG_BAKALEA;
            break; 
          

        case 6:
            return CATALOG_SWEET;
            break; 
          

        default:
            break;
      }


}


function ClickButtonMiniList(e){
    const CATALOG = document.getElementById('catalog-product-1');
    if(CATALOG.querySelector('.catalog-item') !== null){
        let arrButtonProductRemove =  Array.from(e.target.closest('.list-button-main-2').querySelectorAll('.menu-link'));
        arrButtonProductRemove.forEach((elRemove)=>{
            elRemove.classList.remove('active_button_category');
        })
        let arrElCatalog = Array.from(CATALOG.querySelectorAll('.catalog-item'));
        arrElCatalog.forEach((el) =>{
            CATALOG.removeChild(el);
        })

        
    }

    let currentButton = e.target;
    const idButton = Number(currentButton.dataset.idminisection);
    currentButton.classList.add('active_button_category');
    CreateArrProduct(CurrentCategory, currentButton.dataset.typeproductmini);

    


}
function ClickLike(e){
    let currentlike = e.target;
    e.preventDefault();
    
    if(currentlike.classList.contains('button-product-like-clicked')){
        currentlike.classList.add('button-product-like');
        currentlike.classList.remove('button-product-like-clicked');
        let idLike = Number(currentlike.closest('.item-product').dataset.IdProductMain);
        let ourArrCategory = FindCorrectCategory(Number(currentlike.closest('.item-product').dataset.GeneralCategoryProduct));
        ourArrCategory.forEach((item) => {
            if (Number(item.id) === idLike){
                item.liked = false;
                
            }
            LIST_LIKED_ADD_PRODUCT.LIST_LIKED = LIST_LIKED_ADD_PRODUCT.LIST_LIKED.filter((product) => Number(product.id) !== idLike);
            
        })
        
    }
    else{
        currentlike.classList.add('button-product-like-clicked');
        currentlike.classList.remove('button-product-like');
        let idLike = Number(currentlike.closest('.item-product').dataset.IdProductMain);
        //let catLike = currentlike.closest('.item-product').dataset.CategoryProduct;
        let ourArrCategory = FindCorrectCategory(Number(currentlike.closest('.item-product').dataset.GeneralCategoryProduct));
        ourArrCategory.forEach((item) => {
            if (Number(item.id) === idLike){
                item.liked = true;
                LIST_LIKED_ADD_PRODUCT.LIST_LIKED.push(item);
            }
        })
    }
    
    



}
function ClickAdd(e){
    let currentAdd = e.target;
    let checkAddVariant = false;
    let currentMainListItem;
    let corzinCheckIcon;
    if (currentAdd.closest('.liked-product-section') !== null){
        checkAddVariant = true;
        corzinCheckIcon = currentAdd.closest(".catalog-item-like").querySelector(".success-added");
        let catalogArr = Array.from(document.getElementById('catalog-product-1').querySelectorAll('.but-add-element'));
        let idAdd = Number(currentAdd.closest('.catalog-item-like').dataset.IdProductMain);
        catalogArr.forEach((item)=>{
            let idCategoryItem = Number(item.closest('.item-product').dataset.GeneralCategoryProduct);
            let idProduct = Number(item.closest('.item-product').dataset.IdProductMain);

            if (idCategoryItem === Number(currentAdd.closest('.catalog-item-like').dataset.GeneralCategoryProduct) & idProduct === idAdd){
                currentMainListItem = item;
            }
            else{
                return false;
            }
        })



    }
    else{
        corzinCheckIcon = currentAdd.closest(".catalog-item").querySelector(".success-added");

    }
    
    
    if(currentAdd.classList.contains('button-product-add-clicked')){
        currentAdd.classList.add('button-product-add');
        currentAdd.classList.remove('button-product-add-clicked');

        if(checkAddVariant === true){
            currentMainListItem.classList.add('button-product-add');
            currentMainListItem.classList.remove('button-product-add-clicked');
            currentMainListItem.innerText = "Добавить в корзину";
        }

        currentAdd.innerText = "Добавить в корзину";
        

        let idAdd = Number(currentAdd.closest('.item-product').dataset.IdProductMain);
        let ourArrCategory = FindCorrectCategory(Number(currentAdd.closest('.item-product').dataset.GeneralCategoryProduct));
        ourArrCategory.forEach((item) => {
            if (Number(item.id) === idAdd){
                item.add = false;
                 
                corzinCheckIcon.style.display = "none";
                if(checkAddVariant === true){
                currentMainListItem.closest('.item-product').querySelector('.success-added').style.display = "none";
                }
                
            }
            
        })
        LIST_LIKED_ADD_PRODUCT.LIST_ADDED = LIST_LIKED_ADD_PRODUCT.LIST_ADDED.filter((product) => Number(product.id) !== idAdd);
        
    }
    else{
        currentAdd.classList.add('button-product-add-clicked');
        currentAdd.classList.remove('button-product-add');

        if(checkAddVariant === true){

        currentMainListItem.classList.remove('button-product-add');
        currentMainListItem.classList.add('button-product-add-clicked');
        currentMainListItem.innerText = "Удалить из корзины";
        }
        
        currentAdd.innerText = "Удалить из корзины";

        let idAdd = Number(currentAdd.closest('.item-product').dataset.IdProductMain);
        //let catLike = currentlike.closest('.item-product').dataset.CategoryProduct;
        let ourArrCategory = FindCorrectCategory(Number(currentAdd.closest('.item-product').dataset.GeneralCategoryProduct));
        ourArrCategory.forEach((item) => {
            if (Number(item.id) === idAdd){
                item.add = true;
                LIST_LIKED_ADD_PRODUCT.LIST_ADDED.push(item);
                
                corzinCheckIcon.style.display = "block";
                if(checkAddVariant === true){
                currentMainListItem.closest('.item-product').querySelector('.success-added').style.display = "block";
                }
            }
        })
    }
    
    e.preventDefault();


}

function ClickLikeForModal(e){
    let currentlike = e.target;
    e.preventDefault();
    
    if(currentlike.classList.contains('button-product-like-clicked')){
        let catalogArr = Array.from(document.getElementById('catalog-product-1').querySelectorAll('.but-like-element'));
        let idLike = Number(currentlike.closest('.catalog-item-like').dataset.IdProductMain);
        catalogArr.forEach((item)=>{
            let idCategoryItem = Number(item.closest('.item-product').dataset.GeneralCategoryProduct);
            let idProduct = Number(item.closest('.item-product').dataset.IdProductMain);

            if (idCategoryItem === Number(currentlike.closest('.catalog-item-like').dataset.GeneralCategoryProduct) & idProduct === idLike){
                item.classList.remove('button-product-like-clicked');
                item.classList.add('button-product-like');
            }
            else{
                return false;
            }
        })
        let ourArrCategory = FindCorrectCategory(Number(currentlike.closest('.item-product').dataset.GeneralCategoryProduct));
        ourArrCategory.forEach((item) => {
            if (Number(item.id) === idLike){
                item.liked = false;
                
            }
            LIST_LIKED_ADD_PRODUCT.LIST_LIKED = LIST_LIKED_ADD_PRODUCT.LIST_LIKED.filter((product) => Number(product.id) !== idLike);
            
        })

        currentlike.closest('.catalog-item-like').remove();
        CheckEmptyLikedList();



        
    }
    

}


function ClickButtonLine1(e){
    const CATALOG = document.getElementById('catalog-product-1');
    if(CATALOG.querySelector('.catalog-item') !== null){
        let arrButtonProductRemove =  Array.from(e.target.closest('.list-button-main-1').querySelectorAll('.menu-link'));
        arrButtonProductRemove.forEach((elRemove)=>{
            elRemove.classList.remove('active_button_category');
        })
        let arrElCatalog = Array.from(CATALOG.querySelectorAll('.catalog-item'));
        arrElCatalog.forEach((el) =>{
            CATALOG.removeChild(el);
        })

        
    }
    const miniListArr = Array.from(document.querySelector('.line-2').querySelectorAll('.list-button-main-2'));
    miniListArr.forEach((list) => {
        list.classList.add('non-active-line2');

    })


    let currentButton = e.target;
    const idButton = Number(currentButton.dataset.idsectionfirst);
    currentButton.classList.add('active_button_category');
    switch(idButton) {
        case 1:

            document.getElementById('list-mini-1').classList.remove('non-active-line2');
            ActiveProductMiniList = document.getElementById('list-mini-1');
            CurrentCategory = CATALOG_MEAT;
            CreateArrProduct(CATALOG_MEAT, null);
            InitMiniListButton(1);


            break;
      
        case 2:
            document.getElementById('list-mini-2').classList.remove('non-active-line2');
            ActiveProductMiniList = document.getElementById('list-mini-2');
            CurrentCategory = CATALOG_DRINK;
            CreateArrProduct(CATALOG_DRINK, null);
            InitMiniListButton(2);
            break; 
          

        case 3:
            document.getElementById('list-mini-3').classList.remove('non-active-line2');
            ActiveProductMiniList = document.getElementById('list-mini-3');
            CurrentCategory = CATALOG_FR_AND_VEG;
            CreateArrProduct(CATALOG_FR_AND_VEG, null);
            InitMiniListButton(3);
            break; 
          
        
        case 4:
            document.getElementById('list-mini-4').classList.remove('non-active-line2');
            ActiveProductMiniList = document.getElementById('list-mini-4');
            CurrentCategory = CATALOG_SNACKS;
            CreateArrProduct(CATALOG_SNACKS, null);
            InitMiniListButton(4);
            break;
          

        case 5:
            document.getElementById('list-mini-5').classList.remove('non-active-line2');
            ActiveProductMiniList = document.getElementById('list-mini-5');
            CurrentCategory = CATALOG_BAKALEA;
            CreateArrProduct(CATALOG_BAKALEA, null);
            InitMiniListButton(5);
            break; 
          

        case 6:
            document.getElementById('list-mini-6').classList.remove('non-active-line2');
            ActiveProductMiniList = document.getElementById('list-mini-6');
            CurrentCategory = CATALOG_SWEET;
            CreateArrProduct(CATALOG_SWEET, null);
            InitMiniListButton(6);
            break; 
          

        default:
            break;
      }

}

function InitMiniListButton(idList){
    if (ActiveProductMiniList !== null){
        if (CheackRepect === false){
            CheackRepect = true;
            let arrMiniList = Array.from(ActiveProductMiniList.querySelectorAll('.menu-link'));
            arrMiniList.forEach((elList) =>{
                elList.addEventListener('click', ClickButtonMiniList);

            })

        }
        else{
            if(Number(ActiveProductMiniList.dataset.idminilist) !== idList){
                let arrMiniList = Array.from(ActiveProductMiniList.querySelectorAll('.menu-link'));
                arrMiniList.forEach((elList) =>{
                    elList.addEventListener('click', ClickButtonMiniList);
                })
                


            }
            else{
                let arrButtonProductRemove =  Array.from(document.querySelector('.line-2').querySelectorAll('.menu-link'));
                arrButtonProductRemove.forEach((elRemove)=>{
                    elRemove.classList.remove('active_button_category');
                })

            }
        }

    }
    else{
        return;
    }




}

function InitButtonOfProduct(){
    if(CurrentListProductAtPage !== null){
        
            let arrCurrentproductListinPageLike = Array.from(document.getElementById('catalog-product-1').querySelectorAll('.but-like-element'));
            let arrCurrentproductListinPageAdd = Array.from(document.getElementById('catalog-product-1').querySelectorAll('.but-add-element'));

            arrCurrentproductListinPageLike.forEach((element) =>{
                element.addEventListener("click", ClickLike );
            })
            arrCurrentproductListinPageAdd.forEach((element) =>{
                element.addEventListener("click", ClickAdd );
            })

}
}

function InitButtonOfProductLike(){
    let containerLiked = modalWindow.querySelector('.liked-product-section');
    if(containerLiked.querySelectorAll('.catalog-item-like').length !==0){
        let arrButtonLike = Array.from(containerLiked.querySelectorAll('.but-like-element'));
        let arrButtonAdd = Array.from(containerLiked.querySelectorAll('.but-add-element'));

        arrButtonLike.forEach((element) =>{
            element.addEventListener("click", ClickLikeForModal );
        })
        arrButtonAdd.forEach((element) =>{
            element.addEventListener("click", ClickAdd );
        })
        
    }
}

    





const list_Button = document.querySelector('.line-1');
const arr_Button_line1 = Array.from(list_Button.querySelectorAll('.menu-link'));

//const list_Button2 = document.querySelector('.line-2');
//const arr_Button_line2 = Array.from(list_Button2.querySelectorAll('.menu-link'));





arr_Button_line1.forEach((button) =>{
    button.addEventListener('click', ClickButtonLine1);
})


