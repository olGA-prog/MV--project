

let ButtonOpenCorzin = document.getElementById('but-open-corzin');

let overlay = document.querySelector('#overlay-modal');

let closeButton = document.getElementById('close-but-modal');

let modalWindow = document.getElementById('modal-window-1');

let ButtonCorzinSelect = modalWindow.querySelector('.button-corzin-product-modal');
let ButtonLikeSelect = modalWindow.querySelector('.button-liked-product-modal');



function ClickLikedText(e){
    let containerCorzin = modalWindow.querySelector('.main-content-window');
    let containerLiked = modalWindow.querySelector('.liked-product-section');
    containerCorzin.classList.add('section-nonactive');
    containerLiked.classList.remove('section-nonactive');
    ButtonLikeSelect.style.borderBottom = '2px #00000069 solid';
    ButtonCorzinSelect.style.borderBottom = '0';
    CreateListLikedProduct();


}

function ClickCardText(e){
    let ContainSection1 = e.target.closest('.modal-window').querySelector('.main-content-window');
    let ContainSection2 = e.target.closest('.modal-window').querySelector('.liked-product-section');

    if (ContainSection1.classList.contains('section-nonactive')){
        ContainSection1.classList.remove('section-nonactive');
        ContainSection2.classList.add('section-nonactive');
        ButtonCorzinSelect.style.borderBottom = '2px #00000069 solid'
        ButtonLikeSelect.style.borderBottom = '0';


    }
    else{
        return false;
    }
    AddCardToCorzinPage();

}

function InitButtonSelect(){
    ButtonCorzinSelect.addEventListener('click', ClickCardText);
    ButtonLikeSelect.addEventListener('click', ClickLikedText);

};


function OpenWindow(e){
    e.preventDefault();
    modalWindow.classList.add('active-modal');
    overlay.classList.add('active-modal');
    document.body.style.overflowY ="hidden";
    ButtonCorzinSelect.style.borderBottom = '2px #00000069 solid'
    AddCardToCorzinPage();
    InitButtonSelect();
    ChangeTotalInfo();

    
    
}
function CloseWindow(e){
    modalWindow.classList.remove('active-modal');
    overlay.classList.remove('active-modal');
    document.body.style.overflowY ="auto";
    modalWindow.querySelector('.liked-product-section').classList.add('section-nonactive');
    modalWindow.querySelector('.main-content-window').classList.remove('section-nonactive');
    ButtonLikeSelect.style.borderBottom = '0';


}
function ClickOverlay(){
    modalWindow.classList.remove('active-modal');
    this.classList.remove('active-modal');
    document.body.style.overflowY ="auto";
    modalWindow.querySelector('.liked-product-section').classList.add('section-nonactive');
    modalWindow.querySelector('.main-content-window').classList.remove('section-nonactive');
    ButtonLikeSelect.style.borderBottom = '0';
}
    
ButtonOpenCorzin.addEventListener('click', OpenWindow);
closeButton.addEventListener('click', CloseWindow);
overlay.addEventListener('click', ClickOverlay);
