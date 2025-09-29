let arrow = document.querySelector('.arrow');
let menu = document.querySelector('.menu');
let blurry = document.querySelector('.blurry');
let faXmark = document.querySelector('.fa-xmark');
let cartIcon = document.querySelector('.cartIcon');
let amount = document.querySelector('.cartAmount');
let prods = document.querySelector('.prods');
let prodsInfo = document.querySelector('.prodsInfo');
let totall = document.querySelector('.total');
let fa_list_ul = document.querySelector('.fa-list-ul');
let ul = document.querySelector('ul');


document.addEventListener('DOMContentLoaded' , function() {
    $('.slider').slick({
        dots: false,
        infinite: true,
        speed: 500,
        autoplay : true ,
        autoplaySpeed : 1500 ,
        slidesToShow: 3,
        slidesToScroll: 1 ,
        prevArrow : '.prev' ,
        nextArrow : '.next' ,
        responsive : [
            {
                breakpoint: 1255 ,
                settings: {
                    slidesToShow: 1 ,
                    prevArrow : '' ,
        nextArrow : ''
                }
            } , {
                breakpoint: 630 ,
                settings: {
                    slidesToShow: 1 ,
                    prevArrow : '' ,
        nextArrow : ''
                }
            } 
        ]
})
})

document.addEventListener('scroll' , function() {
    if(window.scrollY >= 400) {
       arrow.style.opacity = 1;
       arrow.style.visibility = 'visible';
       arrow.style.transform = 'translateY(0)';
       arrow.style.tranition = '0.3s';
    } else {
       arrow.style.opacity = 0.5;
       arrow.style.visibility = 'hidden';
       arrow.style.transform = 'translateY(-1500px)';
       arrow.style.tranition = '2s';
    }
    
})


cartIcon.onclick = ()=> openOrClose('open');
amount.onclick = ()=> openOrClose('open');
faXmark.onclick = ()=> openOrClose('close');
blurry.onclick = ()=> openOrClose('close');

function openOrClose(gate) {
    if(gate == 'open') {
         menu.style.transform = 'translateX(0)';
         blurry.style.visibility = 'visible';
         blurry.style.opacity = 1;
    } else {
        menu.style.transform = 'translateX(100%)';
        blurry.style.visibility = 'hidden';
        blurry.style.opacity = 0;
    }
}

function displayProducts() {
    let temp2 = '';
    let total = 0;
    for(let i = 0; i < arr.length; i++) {
        total+= arr[i].price * arr[i].Amount;

        temp2 += `<div class="proInCart">
        <div><img src="${arr[i].img}" alt=""></div>
        <div class="nameAndPrice">
            <p>${arr[i].name}</p>
            <p>$ ${arr[i].price.toFixed(2)}</p>
            </div>
            <div class="btns">
                <button onclick="inc(${i})">+</button>
                        <div>${arr[i].Amount}</div>
                <button onclick="dec(${i})">-</button>
                <i class="fa-solid fa-trash" onclick="deleteProduct(${i})"></i>
        </div>
        </div>`;
    }

    prodsInfo.innerHTML = temp2;
    totall.innerHTML = '$' + total.toFixed(2);
    amount.innerHTML = arr.length;
    if(arr.length > 0) {
        amount.style.color = 'yellow';
    } else {
        amount.style.color = 'red';
        prodsInfo.innerHTML = 'No products added yet!';
    }
    
}

//Delete
function deleteProduct(index) {
    arr.splice(index , 1);
    localStorage.setItem('arr' , JSON.stringify(arr))
    displayProducts();
}

function inc(index) {
    arr[index].Amount++;
    localStorage.setItem('arr' , JSON.stringify(arr));
    displayProducts();
}

function dec(index) {
    if(arr[index].Amount > 1) {
        arr[index].Amount--;
    } else {
        deleteProduct(index);
    }
    localStorage.setItem('arr' , JSON.stringify(arr));
    displayProducts();
}

let getArr = localStorage.getItem('arr')
window.onload = function() {
    arr = JSON.parse(getArr);
    displayProducts();
}

fa_list_ul.addEventListener('click' , () => {
    ul.classList.toggle('apear');
})