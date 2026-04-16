function toggleMenu(){
    document.querySelector(".nav-menu").classList.toggle("active");
    }
    
    /* TOAST SYSTEM */
    function showToast(message){
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerText = message;
    
    document.body.appendChild(toast);
    
    setTimeout(()=>toast.classList.add("show"),100);
    
    setTimeout(()=>{
    toast.classList.remove("show");
    setTimeout(()=>toast.remove(),300);
    },3000);
    }
    
/* ADD TO CART TOAST */
document.addEventListener("click", (e) => {
  if (e.target.matches(".add-btn, .btn-cart")) {
    e.preventDefault();
    showToast("Added to Cart 🛒 " + (e.target.closest('.product-page') ? 'Size: ' + document.getElementById("selectedSize")?.value || 'M' : ''));
    setTimeout(() => {
      window.location.href = "/cart/";
    }, 1200);
  }
});
    
    /* SEND MESSAGE ONLY */
    document.addEventListener("click",(e)=>{
    if(e.target.classList.contains("send-btn")){
    e.preventDefault();
    showToast("Message Sent Successfully ✅");
    }
    });
 
    let slides = document.querySelectorAll(".slide");
    let index = 0;
    
    function showSlide(){
    slides.forEach(slide => slide.classList.remove("active"));
    slides[index].classList.add("active");
    }
    
    function nextSlide(){
    index = (index + 1) % slides.length;
    showSlide();
    }
    
    showSlide();
    setInterval(nextSlide, 3000);
 
 const bg = document.querySelector(".sparkle-bg");
 
 
 window.addEventListener("load", () => {
 
   const bg = document.createElement("div");
   bg.className = "sparkle-bg";
   document.body.appendChild(bg);
 
   for (let i = 0; i < 50; i++) {
     const span = document.createElement("span");
 
     span.style.left = Math.random() * 100 + "vw";
     span.style.animationDuration = (3 + Math.random() * 5) + "s";
     span.style.opacity = Math.random();
 
     bg.appendChild(span);
   }
 
 });
 function showToast(message){
    const toast = document.getElementById("toast");
    toast.innerText = message;
    toast.classList.add("show");
    
    setTimeout(() => {
      toast.classList.remove("show");
    }, 2000);
    }
 // ADD TO CART BUTTON
 document.querySelectorAll("btn-cart").forEach(btn => {
    btn.addEventListener("click", () => {
    showToast("Added to Cart 🛒");
    addToCart();
    });
    });
    
    function addToCart(){
       let cart = JSON.parse(localStorage.getItem("cart")) || [];
       
       cart.push({
       name: "Hoodie",
       price: 50
       });
       
       localStorage.setItem("cart", JSON.stringify(cart));
       }   
 
 
       document.querySelectorAll(".btn-cart").forEach(btn => {
          btn.addEventListener("click", () => {
          
            showToast("Added to Cart 🛒");
          
            addToCart();
          
            // 🔥 REDIRECT TO CART PAGE
            setTimeout(() => {
              window.location.href = "cart.html";
            }, 800);
          
          });
          });
 
 
          function showToast(message){
             const toast = document.getElementById("toast");
             toast.innerText = message;
             toast.classList.add("show");
           
             setTimeout(() => {
               toast.classList.remove("show");
             }, 2000);
           }
           
           function addToCart(){
             let cart = JSON.parse(localStorage.getItem("cart")) || [];
           
             cart.push({
               name: "Hoodie",
               price: 50
             });
           
             localStorage.setItem("cart", JSON.stringify(cart));
           }
 
           document.addEventListener("DOMContentLoaded", () => {
 
             console.log("DOM LOADED");
           
             const buttons = document.querySelectorAll(".btn-cart");
           
             console.log("Buttons found:", buttons.length);
           
             buttons.forEach(btn => {
               btn.addEventListener("click", () => {
           
                 console.log("BUTTON CLICKED");
           
                 showToast("Added to Cart 🛒");
           
                 addToCart();
           
                 setTimeout(() => {
                   window.location.href = "cart.html";
                 }, 800);
           
               });
             });
           
           });
 
           document.addEventListener("DOMContentLoaded", () => {
 
             const btn = document.querySelector(".btn-cart");
           
             btn.addEventListener("click", () => {
           
               const qty = parseInt(document.getElementById("qty").value) || 1;
           
               let cart = JSON.parse(localStorage.getItem("cart")) || [];
           
               cart.push({
                 id: Date.now(),
                 name: "Premium Hoodie",
                 price: 50,
                 qty: qty,
                 total: 50 * qty
               });
           
               localStorage.setItem("cart", JSON.stringify(cart));
           
               alert("Added to Cart 🛒");
             });
           
           });
           
           function showToast(msg){
             let toast = document.getElementById("toast");
           
             if(!toast){
               toast = document.createElement("div");
               toast.id = "toast";
               toast.className = "toast";
               document.body.appendChild(toast);
             }
           
             toast.innerText = msg;
             toast.classList.add("show");
           
             setTimeout(() => {
               toast.classList.remove("show");
             }, 2000);
           }
           document.querySelectorAll(".size-btn").forEach(btn => {
             btn.addEventListener("click", () => {
           
               document.querySelectorAll(".size-btn").forEach(b => b.classList.remove("active"));
           
               btn.classList.add("active");
           
               document.getElementById("selectedSize").value = btn.dataset.size;
             });
           });
 
           document.querySelector(".btn-cart").addEventListener("click", () => {
 
             const qty = parseInt(document.getElementById("qty").value) || 1;
             const size = document.getElementById("selectedSize").value;
           
             let cart = JSON.parse(localStorage.getItem("cart")) || [];
           
             cart.push({
               id: Date.now(),
               name: "Premium Hoodie",
               price: 50,
               qty: qty,
               size: size,
               total: 50 * qty
             });
           
             localStorage.setItem("cart", JSON.stringify(cart));
           
             showToast(`Added to Cart 🛒 (${size})`);
           });
 
           const sizeBtns = document.querySelectorAll(".size-btn");
 const sizeInput = document.getElementById("selectedSize");
 
 sizeBtns.forEach(btn => {
   btn.addEventListener("click", () => {
 
     // remove active from all
     sizeBtns.forEach(b => b.classList.remove("active"));
 
     // add active to clicked
     btn.classList.add("active");
 
     // store value
     sizeInput.value = btn.dataset.size;
   });
 });
 
  
