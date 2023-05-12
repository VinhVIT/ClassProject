console.log("running");
//navbar
let menu = document.querySelector('#menu-bars');
let navbar = document.querySelector('.navbar');

menu.onclick = () => {
  menu.classList.toggle('fa-times');
  navbar.classList.toggle('active');
}
window.onscroll = () => {
  menu.classList.remove('fa-times');
  navbar.classList.remove('active');
}
//search form
document.querySelector('#search-icon').onclick = () => {
  document.querySelector('#search-form').classList.toggle('active');
}
document.querySelector('#close').onclick = () => {
  document.querySelector('#search-form').classList.remove('active');
}
//add to cart
let carts = document.querySelectorAll('.add-cart');
const cartIcon = document.getElementsByClassName("a");

let product = [
  {
    name: 'Cartoon Astronaut T-Shirts 1',
    brand: 'adidas',
    tag: 'f1',
    price: 78,
    inCart: 0
  },
  {
    name: 'Cartoon Astronaut T-Shirts 2',
    brand: 'adidas',
    tag: 'f2',
    price: 78,
    inCart: 0
  },
  {
    name: 'Cartoon Astronaut T-Shirts 3',
    brand: 'adidas',
    tag: 'f3',
    price: 78,
    inCart: 0
  },
  {
    name: 'Cartoon Astronaut T-Shirts 4',
    brand: 'adidas',
    tag: 'f4',
    price: 78,
    inCart: 0
  }
];
for (let i = 0; i < carts.length; i++) {
  carts[i].addEventListener('click', () => {
    cartNumbers(product[i]);
    totalCost(product[i]);
  })
}
function onLoadCartNumbers() {
  let productNumbers = localStorage.getItem('cartNumbers');

  if (productNumbers) {
    cartIcon[0].setAttribute("class", "active");
    document.querySelector('.icons span').textContent = productNumbers;
  }
}
function cartNumbers(product) {
  let productNumbers = localStorage.getItem('cartNumbers');
  productNumbers = parseInt(productNumbers);

  if (productNumbers) {
    localStorage.setItem('cartNumbers', productNumbers + 1);
    document.querySelector('.icons span').textContent = productNumbers + 1;
  }
  else {
    localStorage.setItem('cartNumbers', 1);
    cartIcon[0].setAttribute("class", "active");
    document.querySelector('.icons span').textContent = 1;
  }
  setProducts(product);
}
function setProducts(product) {
  let cartItems = localStorage.getItem('productsInCart');
  cartItems = JSON.parse(cartItems);

  if (cartItems != null) {
    if (cartItems[product.tag] == undefined) {
      cartItems = {
        ...cartItems,
        [product.tag]: product
      }
    }
    cartItems[product.tag].inCart += 1;
  }
  else {
    product.inCart = 1;
    cartItems = {
      [product.tag]: product
    }
  }
  localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}
function totalCost(product) {
  let cartCost = localStorage.getItem('totalCost');
  if (cartCost != null) {
    cartCost = parseInt(cartCost);
    localStorage.setItem("totalCost", cartCost + product.price);
  }
  else {
    localStorage.setItem("totalCost", product.price);
  }
}
function displayCart() {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);
  let productContainer = document.querySelector('.cart-container');
  let productNumbers = localStorage.getItem('cartNumbers');
  let cartCost = localStorage.getItem('totalCost');
  let priceContainer = document.querySelector('.total-price');
  let proContainer = document.querySelector('.product-container');

  if (cartItems && productContainer) {
    priceContainer.innerHTML = '';
    productContainer.innerHTML = '';
    Object.values(cartItems).map(item => {
      productContainer.innerHTML += `<tr class="cart-product">
      <td><a href=""><i class="fa fa-trash" aria-hidden="true"></i></a></td>
      <td><img src="Img/products/${item.tag}.jpg" alt=""></td>
      <td>${item.name}</td>
      <td>$${item.price}</td>
      <td><input type="number" value="${item.inCart}" max="99" min="1"></td>
      <td>$${item.inCart * item.price}.00</td>
      </tr>`;
    });
    priceContainer.innerHTML += `
    <tr>
                        <td>NO Product</td>
                        <td>${productNumbers}</td>
                    </tr>
                    <tr>
                        <td>Shipping</td>
                        <td>Free</td>
                    </tr>
                    <tr>
                        <td><strong>Total</strong></td>
                        <td><strong>$${cartCost}.00</strong></td>
                    </tr>`
  };
  // if (proContainer) {
  //   proContainer.innerHTML = '';
  //   for (let i = 0; i < product.length; i++) {
  //     console.log(product[i].tag);
  //     proContainer.innerHTML += `
  //   <div class="product" onclick="window.location.href='product_detail.html';">
  //               <img src="Img/products/${product[i].tag}.jpg" alt="">
  //               <div class="description">
  //                   <span>${product[i].brand}</span>
  //                   <h5>${product[i].name}</h5> 
  //                   <div class="stars">
  //                       <i class="fas fa-star"></i>
  //                       <i class="fas fa-star"></i>
  //                       <i class="fas fa-star"></i>
  //                       <i class="fas fa-star"></i>
  //                       <i class="fas fa-star-half-alt"></i>
  //                   </div>
  //                   <span class="price">$${product[i].price}</span>
  //                   <button class="btn1" onclick="setProductsDetail(${product[i]})"> Buy now </button>
  //               </div>
  //           </div>`
  //   }
  // }

}
onLoadCartNumbers();
displayCart();