
function CheckEmptyLikedList(){
    let containerLiked = modalWindow.querySelector('.liked-product-section').querySelectorAll('.catalog-item-like').length;
    
    let emptyDiv = modalWindow.querySelector('.empty-list-like');
    if(containerLiked === 0){
        emptyDiv.classList.add('empty-active');

    }
    else{
        return false;
    }
};


function CreateListLikedProduct(){
    let containerLiked = modalWindow.querySelector('.liked-product-section');
    let ArrLikeCureent = LIST_LIKED_ADD_PRODUCT.LIST_LIKED;
    let emptyDiv = modalWindow.querySelector('.empty-list-like');
    if (ArrLikeCureent.length !== 0){

        emptyDiv.classList.remove('empty-active');
        containerLiked.querySelectorAll('.catalog-item-like').forEach((element)=>{
            element.remove();
        })
        ArrLikeCureent.forEach((product) => {

            let productElement = document.createElement('div');
            productElement.classList.add('catalog-item-like');
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

            containerLiked.insertBefore(productElement, null);

            


    
        
        });

        InitButtonOfProductLike();


    }
    else{
        if ((ArrLikeCureent.length === 0) & (containerLiked.querySelectorAll('.catalog-item-like').length !==0) ){
            containerLiked.querySelectorAll('.catalog-item-like').forEach((element)=>{
                element.remove();
            })
            emptyDiv.classList.add('empty-active');

        }
        else{
            emptyDiv.classList.add('empty-active');

        }

        
        
    }

}