
const main_page = document.getElementById('main-page')
const home = document.getElementById('home')
const inpUsername = document.getElementById('Username')
const inpPhone = document.getElementById('Phonenumber')
const inpPass = document.getElementById('password')
const inpEmail = document.getElementById('email')
const sendLoginBtn = document.getElementById('login-send')
const loginError = document.getElementById('login-error')
const showUsers = document.getElementById('show-user')
const showCats = document.getElementById('show-products')
const catItems = document.getElementById('dropdown-cats')
const productContainer = document.getElementById('P-container')
const catTitle = document.getElementById('catTitle')
const productSec = document.getElementById('products-sec')
const Basket = document.getElementById('basket')
const priceFilter = document.getElementById('priceRange')
const priceSpan = document.getElementById('priceSpan')

let users =[]
let prices =[]
let itemSet=[]
let user_exist = false 
let priceRnage = 3000
let currentCat

loginError.style.display='none'
Basket.style.display='none'
productContainer.style.display='none'


home.addEventListener('click',function(){
    productContainer.style.display='none'
    main_page.style.display='block'
})


//===========================bug => ============================================


let login_error=(c,t) =>{

    loginError.style.display='block'
    if(c=='ph'){
        inpPhone.style.color ='red'
        inpPhone.style.borderBlockColor = 'red'
    }
    else if(c=='p'){
        inpPass.style.color ='red'
        inpPass.style.borderBlockColor = 'red'
    }
    else if(c=='e'){
        inpEmail.style.color ='red'
        inpEmail.style.borderBlockColor = 'red'
    }
    else{
        loginError.style.display='block'
        loginError.style.color='red'
        loginError.innerHTML=`<p> ${t} </p>`
    }
    loginError.style.display='block'
    loginError.style.color='red'
    loginError.innerHTML=`<p> ${t} </p>`

}

let Users = function(userName, phone, pass, email){

    this.name = inpUsername.value;
    this.phone = inpPhone.value;
    this.pass = inpPass.value;
    this.email = inpEmail.value;
    

    this.membersip= function(){
        
        for(const user of users){
            if(this.email == user.email){
                login_error('d','This email already registered!')
                user_exist = true
                if(user_exist){
                    break
                }

            }
            else if(this.phone == user.phone){
                login_error('d','This phonenumber already registered!')
                user_exist = true
                if(user_exist){
                    break
                }
            }
            else{
                loginError.style.display='none'
            }
        }
    }

}


sendLoginBtn.addEventListener('click', function(e){

    e.preventDefault()
    
    if(inpUsername.value ==''|| inpPhone.value =='' || inpPass.value =='' || inpEmail.value ==''){
        login_error('em','Please fill all the tabs!')
    }
    else if(isNaN(inpPhone.value) || inpPhone.value.length != 11){
        
        login_error('ph','Invalid phonenumber!')
    }
    else if(inpPass.value.length < 8){
      
        login_error('p','Invalid password!')
    }
    else if(inpEmail.value.includes('@')!= true || inpEmail.value.slice(-4)!='.com' ){

        login_error('e','Invalid email address!')
    }
    else{
        loginError.style.display='none'
        let user = new Users(inpUsername.value, inpPhone.value, inpPass.value, inpEmail.value );
        user.membersip()
        if(user_exist == false){
            users.push(user)
            // console.log(users)
            inpUsername.value=''
            inpPhone.value=''
            inpPass.value=''
            inpEmail.value=''
            
        }
        
        
    }
})

showUsers.addEventListener('click',function(){
    let usresText = JSON.stringify(users) 
    localStorage.setItem('Users',usresText)
})

//=============================================================================================

priceFilter.addEventListener('change',function(e){
    priceRnage =e.target.value
    priceSpan.innerHTML = `${priceRnage}$`
    showCatProduct(currentCat,priceRnage);

})


showCats.addEventListener('click',function(e){
    e.preventDefault()
    catItems.innerHTML=''
    fetch('https://dummyjson.com/products/categories')
    .then(res => res.json())
    .then(cats =>{
        // shoes 
        console.log(cats)
        cats.forEach(element => {

            if(element.slug != 'furniture' && element.slug != 'groceries' && element.slug != "home-decoration" &&
                element.slug != "kitchen-accessories" && element.slug != "laptops" && element.slug != "motorcycle" &&
                element.slug !="smartphones" && element.slug !="tablets" && element.slug !="vehicle" &&
                element.slug !="mobile-accessories")
            {
                let catItem = document.createElement('a')
                catItem.classList.add('dropdown-item')
                catItem.innerText = element.name;
                catItem.style.cursor='pointer'
                catItem.addEventListener('click',()=>showCatProductSec(element.slug))
                catItems.append(catItem)
            }  
            
        });
        
    });
})

let showCatProductSec=(n)=>{

    main_page.style.display='none'
    productContainer.style.display='block'
    
    catTitle.innerHTML=`${n} products:`
    currentCat = n
    showCatProduct(n,priceRnage);
    
}

let showCatProduct =(n,prange)=>{
    fetch(`https://dummyjson.com/products/category/${n}`)
    .then(res => res.json())
    .then(products =>{
        productSec.innerHTML=''
        let productsArray = products.products
        // console.log(productsArray)
        productsArray.forEach(element => {

            let secCol =document.createElement('section')
            secCol.classList.add('col-4')
            secCol.classList.add('mt-1')
            secCol.setAttribute('id','P-element')

            let sec = document.createElement('section')
            sec.setAttribute('id','P-bg')


            let limitation = document.createElement('span')
            limitation.classList.add('badge')
            limitation.classList.add('bg-danger')
            limitation.innerText='limited stock'
            
            let productTitlesec =document.createElement('section')
            productTitlesec.classList.add('row')

            let productTitle = document.createElement('h3')
            productTitle.innerText = element.title
            productTitlesec.append(productTitle)

            let productDiscriptionSec =document.createElement('section')
            productDiscriptionSec.classList.add('row')
          
            let productDiscription = document.createElement('p')
            productDiscription.innerText = element.description
            productDiscriptionSec.append(productDiscription)
            
            let img_div = document.createElement('section')
            img_div.classList.add('row')
            img_div.setAttribute('id','img-div')
            
            let productPhoto = document.createElement('img')
            productPhoto.setAttribute('src' , `${element.images[0]}`)

            let productPrice = document.createElement('button')
            productPrice.classList.add('priceBtn')
            productPrice.setAttribute('title',`${element.title}`)
            productPrice.setAttribute('onclick', 'priceHandler(this)')
            productPrice.innerText=`${element.price}$`
            if(element.price <= prange){
                if(element.stock <= 10){
                    productTitle.append(limitation)
                    productTitle.style.backgroundColor='#f8576791'
                }
                sec.append(productTitlesec)
                img_div.append(productPhoto)
                sec.append(img_div)
                sec.append(productDiscriptionSec)
                sec.append(productPrice)
                secCol.append(sec)
                productSec.append(secCol)
            }
           
        });
    })
}

priceHandler = (e) => {
    
    Basket.style.display = 'block'
    e.style.backgroundColor='lightslategray'
    let thePrice = e.innerText.slice(0,-1);
    
    prices.push(thePrice)
    itemSet.push(e.title)
    console.log(prices)
    
}

Basket.addEventListener('click' , function(){
    
    let priceTxt = JSON.stringify(prices)
    let items = JSON.stringify(itemSet)
    localStorage.setItem('Prices' , priceTxt)
    localStorage.setItem('Items',items)
})
