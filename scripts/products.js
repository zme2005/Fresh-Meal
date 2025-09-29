let arrow = document.querySelector('.arrow');
let menu = document.querySelector('.menu');
let blurry = document.querySelector('.blurry');
let faXmark = document.querySelector('.fa-xmark');
let cartIcon = document.querySelector('.cartIcon');
let amount = document.querySelector('.cartAmount');
let prods = document.querySelector('.prods');
let prodsInfo = document.querySelector('.prodsInfo');
let totall = document.querySelector('.total');
let success = document.querySelector('.success');
let fa_list_ul = document.querySelector('.fa-list-ul');
let ul = document.querySelector('ul');


let arr = [];


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

let products = [
    {
        img:"images/images/icone.png" ,
        name:"Vegetabels",
        price:30,
        Amount:1

    },
    {
        img:"images/images/jars.jpg" ,
        name:"Honey Jar",
        price:45,
        Amount:1
    },
    {
        img:"images/images/plate-2.png" ,
        name:"Cottage Salad",
        price:28,
        Amount:1
    },
    {
        img:"images/images/plate-3.png" ,
        name:"Greek Salad",
        price:28,
        Amount:1
    },
    {
        img:"images/images/plate-1.png" ,
        name:"Summer Salad",
        price:50,
        Amount:1
    },
    {
        img:"images/images/salad-table.jpg" ,
        name:"Evreyday Salad",
        price:60,
        Amount:1
    },
    {
        img:"images/images/yogurt.png" ,
        name:"Yogurt",
        price:75,
        Amount:1
    },
    {
        img:"images/images/cupcake.png" ,
        name:"Cupcake",
        price:72,
        Amount:1
    },
    {
        img:"images/images/food-table.jpg" ,
        name:"Rice with Vegetabels",
        price:80,
        Amount:1
    },
    {
        img:"images/images/coffee.jpg" ,
        name:"Coffee",
        price:100,
        Amount:1
    },
]

let temp = '';
for(let i = 0; i < products.length; i++) {
    temp += `<div class="card prod">
                <div class="cardImg">
                    <img src="${products[i].img}" alt="">
                </div>
                <div class="proInfo">
                    <p>${products[i].name}</p>
                    <div>
                        <img src="images/icons-js/start-filled.svg" alt="">
                        <img src="images/icons-js/start-filled.svg" alt="">
                        <img src="images/icons-js/start-filled.svg" alt="">
                        <img src="images/icons-js/star-grey.svg" alt="">
                        <img src="images/icons-js/star-grey.svg" alt="">
                    </div>
                    <div>
                        <span>$ ${products[i].price.toFixed(2)}</span>
                        <del>$ ${((products[i].price) + 1).toFixed(2)}</del>
                    </div>
                    <div class="btn-div">
                        <div>
                            <img src="images/icons-js/cart.svg" alt="">
                        </div>
                        <button onclick="addProduct(${i})">Add To Cart <i class="fa-solid fa-arrow-right"></i> </button>
                    </div>
                </div>
            </div>`
}

prods.innerHTML = temp;

//Create
function addProduct(index) {

    let foundedPro = arr.find((el) => {
        return el.name == products[index].name;
    })    

    if(!foundedPro) {
        arr.push(products[index]);
    }

    displayProducts();

    localStorage.setItem('arr' , JSON.stringify(arr));

    success.style.transform = 'translateX(0)';

    setTimeout(() => {
        success.style.transform = 'translateX(-400px)';
    } , 2000)
}



//Read
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
    localStorage.setItem('arr' , JSON.stringify(arr));
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

//Store

let getArr = localStorage.getItem('arr');
window.onload = function() {
    arr = JSON.parse(getArr);
    displayProducts();
}

fa_list_ul.addEventListener('click' , () => {
    ul.classList.toggle('apear');
})
