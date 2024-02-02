
const repeat = false;
const noArrows = false;
const noBullets = false;

const containerArr = Array.from(document.querySelectorAll('.slider-container'));
let countSliders = containerArr.length;




function initBullets() {
    if (noBullets) {
        return;
    }
    
    containerArr.forEach((item) => {
        const bulletContainer = document.createElement('div');
        bulletContainer.classList.add('bullet-container');
        let sliderArrsingle = item.querySelectorAll('.slider-single');
        sliderArrsingle.forEach((elem, i) => {
            const bullet = document.createElement('div');
            bullet.classList.add('bullet')
            bullet.id = `bullet-index-${i}`
            bullet.addEventListener('click', (element) => {
                goToIndexSlide(element, i);
            })
            bulletContainer.appendChild(bullet);
            elem.classList.add('proactivede');
        })
        item.appendChild(bulletContainer);
    })

    
}

function initArrows() {
    if (noArrows) {
        return;
    }
    containerArr.forEach((item) => {
        const leftArrow = document.createElement('a')
        const iLeft = document.createElement('i');
        iLeft.classList.add('fa')
        iLeft.classList.add('fa-arrow-left')
        iLeft.innerText ="<";
        leftArrow.classList.add('slider-left')
        leftArrow.appendChild(iLeft)
        leftArrow.addEventListener('click', (element) => {
            slideLeft(element);
        })
        const rightArrow = document.createElement('a')
        const iRight = document.createElement('i');
        iRight.classList.add('fa')
        iRight.classList.add('fa-arrow-right')
        iRight.innerText = ">";
        rightArrow.classList.add('slider-right')
        rightArrow.appendChild(iRight)
        rightArrow.addEventListener('click', (element) => {
            slideRight(element);
        })
        item.appendChild(leftArrow);
        item.appendChild(rightArrow);
    })
 
}

function TimeSlider(){
    containerArr.forEach((item) =>{
        let curElement = item.querySelector('.bullet');
        slideRight(curElement);
    })
}

function slideInitial() {
    initBullets();
    initArrows();
    setTimeout( TimeSlider, 500);

   
    
    
    
}

function updateBullet(e) {
    if (!noBullets) {
        if (e.target === undefined){
            var conteinerID = e.closest('.slider-container');
        }
        else{
            var conteinerID = e.target.closest('.slider-container');
        }
        let slideCurrent = Number(conteinerID.closest('.slider-container').dataset.slidecurrent);
        conteinerID.querySelector('.bullet-container').querySelectorAll('.bullet').forEach((elem, i) =>{
            elem.classList.remove('active');
                if (i === slideCurrent) {
                    elem.classList.add('active');
                }
            })
        
        
    }
    checkRepeat(e);
    
}

function checkRepeat(e) {
        if (e.target === undefined){
            var conteinerID = e.closest('.slider-container');
        }
        else{
            var conteinerID = e.target.closest('.slider-container');
        }
        
        let slideCurrent = Number(conteinerID.closest('.slider-container').dataset.slidecurrent);
        
        let slide = conteinerID.querySelectorAll('.slider-single');
        if (!repeat) {
            if (slideCurrent === slide.length - 1) {
                slide[0].classList.add('not-visible');
                slide[slide.length - 1].classList.remove('not-visible');
                if (!noArrows) {
                    conteinerID.querySelector('.slider-right').classList.add('not-visible')
                    conteinerID.querySelector('.slider-left').classList.remove('not-visible')
                }
            }
            else if (slideCurrent === 0) {
                slide[slide.length - 1].classList.add('not-visible');
                slide[0].classList.remove('not-visible');
                if (!noArrows) {
                    conteinerID.querySelector('.slider-left').classList.add('not-visible')
                    conteinerID.querySelector('.slider-right').classList.remove('not-visible')
                }
            } else {
                slide[slide.length - 1].classList.remove('not-visible');
                slide[0].classList.remove('not-visible');
                if (!noArrows) {
                    conteinerID.querySelector('.slider-left').classList.remove('not-visible')
                    conteinerID.querySelector('.slider-right').classList.remove('not-visible')
                }
            }
        }
    

    
}
    




function slideRight(e) {
    if (e.target === undefined){
        var slideTotal = Array.from(e.closest('.slider-container').querySelectorAll('.slider-single')).length - 1;
        var slide = Array.from(e.closest('.slider-container').querySelectorAll('.slider-single'));
        var slideCurrent = Number(e.closest('.slider-container').dataset.slidecurrent);
    }
    else{
        var slideTotal = Array.from(e.target.closest('.slider-container').querySelectorAll('.slider-single')).length - 1;
        var slide = Array.from(e.target.closest('.slider-container').querySelectorAll('.slider-single'));
        var slideCurrent = Number(e.target.closest('.slider-container').dataset.slidecurrent);
    }
    

    if (slideCurrent < slideTotal) {
         slideCurrent++;
    } else {
        slideCurrent = 0;
    }
    
    if (slideCurrent > 0) {
        var preactiveSlide = slide[slideCurrent - 1];
    } else {
        var preactiveSlide = slide[slideTotal];
    }
    var activeSlide = slide[slideCurrent];
    if (slideCurrent < slideTotal) {
        var proactiveSlide = slide[slideCurrent + 1];
    } else {
        var proactiveSlide = slide[0];

    }
    if (e.target === undefined){
        e.closest('.slider-container').dataset.slidecurrent = slideCurrent;
    }
    else{
        e.target.closest('.slider-container').dataset.slidecurrent = slideCurrent;
    }

    

    slide.forEach((elem) => {
        var thisSlide = elem;
        if (thisSlide.classList.contains('preactivede')) {
            thisSlide.classList.remove('preactivede');
            thisSlide.classList.remove('preactive');
            thisSlide.classList.remove('active');
            thisSlide.classList.remove('proactive');
            thisSlide.classList.add('proactivede');
        }
        if (thisSlide.classList.contains('preactive')) {
            thisSlide.classList.remove('preactive');
            thisSlide.classList.remove('active');
            thisSlide.classList.remove('proactive');
            thisSlide.classList.remove('proactivede');
            thisSlide.classList.add('preactivede');
        }
    });
    preactiveSlide.classList.remove('preactivede');
    preactiveSlide.classList.remove('active');
    preactiveSlide.classList.remove('proactive');
    preactiveSlide.classList.remove('proactivede');
    preactiveSlide.classList.add('preactive');

    activeSlide.classList.remove('preactivede');
    activeSlide.classList.remove('preactive');
    activeSlide.classList.remove('proactive');
    activeSlide.classList.remove('proactivede');
    activeSlide.classList.add('active');

    proactiveSlide.classList.remove('preactivede');
    proactiveSlide.classList.remove('preactive');
    proactiveSlide.classList.remove('active');
    proactiveSlide.classList.remove('proactivede');
    proactiveSlide.classList.add('proactive');

    updateBullet(e);
}

function slideLeft(e) {

    if (e.target === undefined){
        var slideTotal = Array.from(e.closest('.slider-container').querySelectorAll('.slider-single')).length - 1;
        var slide = Array.from(e.closest('.slider-container').querySelectorAll('.slider-single'));
        var slideCurrent = Number(e.closest('.slider-container').dataset.slidecurrent);
    }
    else{
        var slideTotal = Array.from(e.target.closest('.slider-container').querySelectorAll('.slider-single')).length - 1;
        var slide = Array.from(e.target.closest('.slider-container').querySelectorAll('.slider-single'));
        var slideCurrent = Number(e.target.closest('.slider-container').dataset.slidecurrent);
    }
    if (slideCurrent > 0) {
        slideCurrent-=1;
    } else {
        slideCurrent = slideTotal;
    }

    if (slideCurrent < slideTotal) {
        var proactiveSlide = slide[slideCurrent + 1];
    } else {
        var proactiveSlide = slide[0];
    }
    var activeSlide = slide[slideCurrent];
    if (slideCurrent > 0) {
        var preactiveSlide = slide[slideCurrent - 1];
    } else {
        var preactiveSlide = slide[slideTotal];
    }

    if (e.target === undefined){
        e.closest('.slider-container').dataset.slidecurrent = slideCurrent;
    }
    else{
        e.target.closest('.slider-container').dataset.slidecurrent = slideCurrent;
    }
    slide.forEach((elem) => {
        var thisSlide = elem;
        if (thisSlide.classList.contains('proactive')) {
            thisSlide.classList.remove('preactivede');
            thisSlide.classList.remove('preactive');
            thisSlide.classList.remove('active');
            thisSlide.classList.remove('proactive');
            thisSlide.classList.add('proactivede');
        }
        if (thisSlide.classList.contains('proactivede')) {
            thisSlide.classList.remove('preactive');
            thisSlide.classList.remove('active');
            thisSlide.classList.remove('proactive');
            thisSlide.classList.remove('proactivede');
            thisSlide.classList.add('preactivede');
        }
    });

    preactiveSlide.classList.remove('preactivede');
    preactiveSlide.classList.remove('active');
    preactiveSlide.classList.remove('proactive');
    preactiveSlide.classList.remove('proactivede');
    preactiveSlide.classList.add('preactive');

    activeSlide.classList.remove('preactivede');
    activeSlide.classList.remove('preactive');
    activeSlide.classList.remove('proactive');
    activeSlide.classList.remove('proactivede');
    activeSlide.classList.add('active');

    proactiveSlide.classList.remove('preactivede');
    proactiveSlide.classList.remove('preactive');
    proactiveSlide.classList.remove('active');
    proactiveSlide.classList.remove('proactivede');
    proactiveSlide.classList.add('proactive');

    updateBullet(e);
}
function goToIndexSlide(element, index) {
    let slideCurrent1 = element.target.closest('.slider-container');
    let slideCurrent = Number(slideCurrent1.dataset.slidecurrent);

    function sliding(element, index){
        let slideCurrent1 = element.target.closest('.slider-container');
        let slideCurrent = Number(slideCurrent1.dataset.slidecurrent);
        
        slideRight(element);
       
           
    }
    while (Number(element.target.closest('.slider-container').dataset.slidecurrent)!== index) {
        sliding(element, index);
    }
}


slideInitial();