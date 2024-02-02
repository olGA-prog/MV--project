


function checkEmptyCorzin(){
    let ModalList_length = document.querySelector('.product-list-modal').querySelectorAll('.item-product-modal').length;
    let emptyDiv = document.querySelector('.product-list-modal').querySelector('.empty-list');
    if(ModalList_length === 0){
        emptyDiv.classList.add('empty-active');

    }
    else{
        return false;
    }


}

                                                                                            
function DeleteProductToCorzin(e){
    let currentButton = e.target;
    
    let parentItem = currentButton.closest('.item-product-modal');
    let ProductInPageFind = Array.from(document.getElementById('catalog-product-1').querySelectorAll('.item-product'));
    

    let IdCategory = Number(parentItem.dataset.generalId);
    let Idproduct = Number(parentItem.dataset.productId);
    let ourArrCategory = FindCorrectCategory(IdCategory);
    ourArrCategory.forEach((item) => {
        if (Number(item.id) === Idproduct){
            item.add = false;
            
        }
        LIST_LIKED_ADD_PRODUCT.LIST_ADDED = LIST_LIKED_ADD_PRODUCT.LIST_ADDED.filter((product) => Number(product.id) !== Idproduct);
        
    })
    LIST_LIKED_ADD_PRODUCT.LIST_ADDED = LIST_LIKED_ADD_PRODUCT.LIST_ADDED.filter((product) => Number(product.id) !== Idproduct);
    ProductInPageFind.forEach((product) =>{
        if (Number(product.dataset.GeneralCategoryProduct) === IdCategory & Number(product.dataset.IdProductMain) ===Idproduct){
            product.querySelector('.success-added').style.display = "none";
            product.querySelector('.but-add-element').classList.remove('button-product-add-clicked');
            product.querySelector('.but-add-element').innerText ="Добавить в корзину";
        }
    })
    parentItem.remove();

    checkEmptyCorzin();
    ChangeTotalInfo();



}

function ChangeTotalInfo(){
    let TotalModal = document.querySelector('.total-content-modal');
    let ListProductModal = document.querySelector('.product-list-modal');

    let countProduct = TotalModal.querySelector('.text-count-value');
    let summaAction = TotalModal.querySelector('.text-action-value');
    let summaWithoutAction = TotalModal.querySelector('.text-summa-value');
    let summaTotal = TotalModal.querySelector('.text-totalsum-value');

    let currentActionSumma = 0;
    let currentSummaWOA = 0;
    let currentCountProduct = ListProductModal.querySelectorAll('.item-product-modal').length;
    let arrProduct = Array.from(ListProductModal.querySelectorAll('.price-product-modal'));

    arrProduct.forEach((product) =>{
        currentSummaWOA += parseFloat(product.textContent);


    })

    countProduct.innerText = currentCountProduct;
    summaAction.innerText = currentActionSumma;
    summaWithoutAction.innerText = currentSummaWOA;
    summaTotal.innerText = currentSummaWOA - currentActionSumma;





}


function CountedClick(e){
    let ButtonCurrent = e.target;
    let countElement = ButtonCurrent.closest('.count-select-product').querySelector('.count-product-sim');
    let TotalCountElement = ButtonCurrent.closest('.item-product-modal').querySelector('.price-product-modal');
    let PriceMain = Number(TotalCountElement.dataset.PriceSum)
    let countValue = Number(countElement.textContent);
    if (ButtonCurrent.textContent === "+"){
        if (countValue < 30){
            countValue += 0.5;
            TotalCountElement.innerText = `${PriceMain * countValue} руб.`;
            countElement.innerText = countValue;
            ChangeTotalInfo();

        }
        else{
            alert('Максимальное количество для добавления!')
        }
        


    }
    else{
        if (countValue > 1){

            countValue -= 0.5;
            TotalCountElement.innerText = `${PriceMain * countValue} руб.`;
            countElement.innerText = countValue;

            ChangeTotalInfo();

        }
        else{
            return false;
        }

    }


}


function InitButtonDeleteProduct(){
    let ButtonsDeleteElements = Array.from(document.querySelector('.product-list-modal').querySelectorAll('.delete-product-but'));
    ButtonsDeleteElements.forEach((button) =>{
        button.addEventListener("click", DeleteProductToCorzin)
    })



}

function InitButtonCount(){
    let ButtonsMinusElements = Array.from(document.querySelector('.product-list-modal').querySelectorAll('.minus-button-product'));
    ButtonsMinusElements.forEach((button) =>{
        button.addEventListener("click", CountedClick)
    })
    let ButtonsPlusElements = Array.from(document.querySelector('.product-list-modal').querySelectorAll('.plus-button-product'));
    ButtonsPlusElements.forEach((button) =>{
        button.addEventListener("click", CountedClick)
    })


}







function AddCardToCorzinPage(){
    

    let ListCorzininModal = document.querySelector('.product-list-modal');
    let emptyDiv = ListCorzininModal.querySelector('.empty-list');
    let ArrAddCureent = LIST_LIKED_ADD_PRODUCT.LIST_ADDED;
    if (ArrAddCureent.length !== 0){

        emptyDiv.classList.remove('empty-active');
        ListCorzininModal.querySelectorAll('.item-product-modal').forEach((element)=>{
            element.remove();
        })
        ArrAddCureent.forEach((element) => {
            let ItemModal = document.createElement('div');
            ItemModal.classList.add('item-product-modal');

            ItemModal.dataset.generalId = element.general_category;
            ItemModal.dataset.productId = element.id;
    
            let DeleteItem = document.createElement('div');
            DeleteItem.classList.add('delete-product-but');
            DeleteItem.innerHTML = "&times;";
    
            let ImageItem = document.createElement('div');
            ImageItem.classList.add('img-product-modal');
            ImageItem.style.backgroundImage = `url(${element.img})`;
            ImageItem.style.backgroundSize = "cover";
    
            let TextItem = document.createElement('div');
            TextItem.classList.add('text-modal-product');
    
            let TextP1 = document.createElement('p');
            TextP1.classList.add('title-product-modal');
            TextP1.innerText = element.name;
            let TextP2 = document.createElement('p');
            TextP2.classList.add('discription-product-modal');
    
            TextItem.insertBefore(TextP1, null);
            TextItem.insertBefore(TextP2, null);
    
            let SelectCountItem = document.createElement('div');
            SelectCountItem.classList.add('count-select-product');
    
            let Select1 = document.createElement('button');
            Select1.classList.add('button-count');
            Select1.classList.add('minus-button-product');
            Select1.type = "button";
            Select1.innerText = "-";
    
            let Select2 = document.createElement('button');
            Select2.classList.add('button-count');
            Select2.classList.add('plus-button-product');
            Select2.type = "button";
            Select2.innerText = "+";
    
            let CountText = document.createElement('p');
            CountText.classList.add('count-product-sim');
            CountText.innerText = "1";
    
            SelectCountItem.insertBefore(Select1, null);
            SelectCountItem.insertBefore(CountText, null);
            SelectCountItem.insertBefore(Select2, null);
    
    
            let PriceItem = document.createElement('div');
            PriceItem.classList.add('price-product-modal');
            PriceItem.innerText = `${element.price} руб.`
            PriceItem.dataset.PriceSum = element.price;
    
            ItemModal.insertBefore(DeleteItem, null);
            ItemModal.insertBefore(ImageItem, null);
            ItemModal.insertBefore(TextItem, null);
            ItemModal.insertBefore(SelectCountItem, null);
            ItemModal.insertBefore(PriceItem, null);

            ListCorzininModal.insertBefore(ItemModal, null);


            


    
        
        });

        InitButtonDeleteProduct();
        InitButtonCount();


    }
    else{
        if ((ArrAddCureent.length === 0) & (ListCorzininModal.querySelectorAll('.item-product-modal').length !==0) ){
            ListCorzininModal.querySelectorAll('.item-product-modal').forEach((element)=>{
                element.remove();
            })
            emptyDiv.classList.add('empty-active');

        }
        else{
            emptyDiv.classList.add('empty-active');

        }

        
        
    }

    

    

}






    
