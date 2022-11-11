// Admin Login Page Animations
const section = document.querySelector(".hide-section");
const formContainer = document.querySelector(".login-container");
const loginContainer = document.querySelector(".admin-login");
const profile = document.querySelector("img");

profile.onclick = () => {
   requestAnimationFrame(() => {
      loginContainer.classList.remove("hide-login");
      formContainer.classList.remove("hide-form");

      setTimeout(() => {
         section.classList.remove("hide-section");
      }, 500);
   });
};

//Category Creation Validation
function categoryValidate() {
   let category = document.getElementById('categoryName').value.trim();
   let errorFlag = 0;

   if (category == "") {
       document.getElementById('catergoryError').innerHTML = "*Field can't Empty"
       errorFlag = 1
   } else if (category.length < 2) {
       document.getElementById('catergoryError').innerHTML = "*Must be 2 character"
       errorFlag = 1
   } else {
       document.getElementById('catergoryError').innerHTML = ""
   }
   if (errorFlag == 1) {
       return false
   }
}

//Category Creation Validation
function brandValidate() {
    let category = document.getElementById('brandName').value.trim();
    let errorFlag = 0;
 
    if (category == "") {
        document.getElementById('brandError').innerHTML = "*Field can't Empty"
        errorFlag = 1
    } else if (category.length < 2) {
        document.getElementById('brandError').innerHTML = "*Must be 2 character"
        errorFlag = 1
    } else {
        document.getElementById('brandError').innerHTML = ""
    }
    if (errorFlag == 1) {
        return false
    }
 }

//Add Category Modal Action
const myModal = document.getElementById('myModal')
const myInput = document.getElementById('myInput')

myModal.addEventListener('shown.bs.modal', () => {
    myInput.focus()
})


//Add Product Validation
function productFormValidate(){
    let productName = document.getElementById("productName").value.trim();
    let category = document.getElementById("category").value.trim();
    let brand = document.getElementById("brand").value.trim();
    let actualprice = document.getElementById("actualPrice").value.trim();
    let sellingPrice = document.getElementById("sellingPrice").value.trim();
    let stock = document.getElementById("stock").value.trim();
    let description = document.getElementById("description").value.trim();
    let specifiaction = document.getElementById("specifiaction").value.trim();

    let errorFlag=0;

    //Product Name validation
    if(productName == ""){
        document.getElementById("errorProductName").innerHTML="*Field Can't Empty"
        errorFlag=1
    }else if(productName.length <= 2){
        document.getElementById("errorProductName").innerHTML = "*Must be 2 character"
        errorFlag=1
    }else{
        document.getElementById("errorProductName").innerHTML=""
    }
    //Category Field Validation
    if(category == ""){
        document.getElementById("errorCategory").innerHTML="*Choose an Option"
        errorFlag=1
    }else{
        document.getElementById("errorCategory").innerHTML=""
    }
    //Brand Field Validation
    if(brand == ""){
        document.getElementById("errorbrand").innerHTML="*Choose an Option"
        errorFlag=1
    }else{
        document.getElementById("errorbrand").innerHTML=""
    }
    //Actual Price Validation
    if(actualprice == ""){
        document.getElementById("errorActualPrice").innerHTML="*Field Can't Empty"
        errorFlag=1
    }else if(actualprice.length <= 0){
        document.getElementById("errorActualPrice").innerHTML="*Cant allow 0 or less than 0"
        errorFlag=1
    }else{
        document.getElementById("errorActualPrice").innerHTML=""
    }
    //Selling Price Validation
    if(sellingPrice == ""){
        document.getElementById("errorSellingPrice").innerHTML="*Field Can't Empty"
        errorFlag=1
    }else if(sellingPrice.length <= 0){
        document.getElementById("errorSellingPrice").innerHTML="*Cant allow 0 or less than 0"
        errorFlag=1
    }else{
        document.getElementById("errorSellingPrice").innerHTML=""
    }
    //Stock Valiation
    if(stock == ""){
        document.getElementById("errorstock").innerHTML="*Field Can't Empty"
        errorFlag=1
    }else if(stock.length <= 0){
        document.getElementById("errorstock").innerHTML="*Cant allow 0 or less than 0"
        errorFlag=1
    }else{
        document.getElementById("errorstock").innerHTML=""
    }
    //Description Validation
    if(description == ""){
        document.getElementById("errorDescription").innerHTML="*Field Can't Empty"
        errorFlag=1
    }else if(description.length < 10){
        document.getElementById("errorDescription").innerHTML="*Must be 10 character"
        errorFlag=1
    }else{
        document.getElementById("errorDescription").innerHTML=""
    }
    //Specifiaction validation
    if(specifiaction == ""){
        document.getElementById("errorSpecifiaction").innerHTML="*Field Can't Empty"
        errorFlag=1
    }else if(specifiaction.length < 10){
        document.getElementById("errorSpecifiaction").innerHTML="*Must be 10 character"
        errorFlag=1
    }else{
        document.getElementById("errorSpecifiaction").innerHTML=""
    }

    if(errorFlag == 1){
        return false
    }    
}


//User SignUp validation
function signupValidate(){
    let fname = document.getElementById('first_Name').value.trim();
    let lname = document.getElementById('last_Name').value.trim();
    let username = document.getElementById('user_Name').value.trim();
    let email = document.getElementById('user_Email').value.trim();
    let mobileNo = document.getElementById('mobile_No').value.trim();
    let password = document.getElementById('password').value.trim();
    let confirmPasword = document.getElementById('confirm_Password').value.trim();
    // let emailCheck = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
    errorFlag=0

    // For First Name
    if(fname==""){
        document.getElementById('fnameError').innerHTML = "*Required";
        errorFlag=1;
    }else if(fname.length < 2){
        document.getElementById('fnameError').innerHTML = "*First Name is too Short";
        errorFlag=1;
    }else{
        document.getElementById('fnameError').innerHTML = "";
    }

    // For Last Name
    if(lname==""){
        document.getElementById('lnameError').innerHTML = "*Required";
        errorFlag=1;
    }else if(lname.length < 2){
        document.getElementById('lnameError').innerHTML = "*Last Name is too Short";
        errorFlag=1;
    }else{
        document.getElementById('lnameError').innerHTML = "";
    }

    // For User Name
    if(username==""){
        document.getElementById('unameError').innerHTML = "*Required";
        errorFlag=1;
    }else if(username.length < 2){
        document.getElementById('unameError').innerHTML = "*User Name is too Short";
        errorFlag=1;
    }else{
        document.getElementById('unameError').innerHTML = "";
    }

    // For Email
    if (email == ""){
        document.getElementById('emailError').innerHTML = "*Email Require";
        errorFlag = 1;
    }
    // else if (email.test != emailCheck){
    //     document.getElementById('emailError').innerHTML = "*Email Invalid";
    //     errorFlag =1
    // }
    else{
        document.getElementById('emailError').innerHTML = "";
    }

    // For Mobile
    if(mobileNo == ""){
        document.getElementById('mobileError').innerHTML = "*Mobile No. Required";
        errorFlag=1
    }else if(mobileNo.length<10){
        document.getElementById('mobileError').innerHTML = "*Invalid Mobile No.";
        errorFlag=1
    }else{
        document.getElementById('mobileError').innerHTML = "";
    }

    // For Password
    if(password == ""){
        document.getElementById('passwordError').innerHTML ="*Password Required";
        errorFlag=1
    }else if(password.length < 6){
        document.getElementById('passwordError').innerHTML = "*Password lenth must 6";
        errorFlag =1
    }else{
        document.getElementById('passwordError').innerHTML = "";
    }

    //For Confirm Password
    if(confirmPasword == ""){
        document.getElementById('confirmPaswordError').innerHTML = "*Confirm Pasword Required";
        errorFlag=1
    }else if (confirmPasword != password){
        document.getElementById('confirmPaswordError').innerHTML = "*Password does not Match";
        errorFlag=1
    }else{
        document.getElementById('confirmPaswordError').innerHTML = "";
    }

    if(errorFlag==1){
        return false
    }
}


//User Login Validate
function loginValidate(){
    let email = document.getElementById('user_Email').value.trim();
    let password = document.getElementById('password').value.trim();
    errorFlag=0;

    if(email == ""){
        document.getElementById('emailError').innerHTML = "*Email Required";
        document.getElementById('user_Email').style.borderColor ="red"
        errorFlag=1
    }
    // else if(email.match(/^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/)){
    //     document.getElementById('emailError').innerHTML = "*Invalid Email";
    //     errorFlag=1
    // }
    else{
        document.getElementById('emailError').innerHTML = "";
        document.getElementById('user_Email').style.borderColor ="green"
    }

    if(password == ""){
        document.getElementById('passwordError').innerHTML = "*Password Required";
        document.getElementById('password').style.borderColor ="red"
        errorFlag=1
    }else{
        document.getElementById('passwordError').innerHTML = "";
        document.getElementById('password').style.borderColor ="green"
    }

    if(errorFlag==1){
        return false
    }
}


//Add product to cart
function addToCart(productID,price){
    $.ajax({
        url:'/product/showDetail/add-tocart',
        data: {price:price,
            productID:productID},
        method: 'post',
        success: (response)=>{
            if(response.status){
                let count = $('#cartCount').html()
                count = parseInt(count)+1
                $("#cartCount").html(count)
            }
        }
    })
}

