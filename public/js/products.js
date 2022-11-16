
// let productList = document.getElementById('prosList')
// productList.onload = products()

// function products() {
//     fetch('/shop/products', {
//         method: 'get',
//         headers: { 'Content-Type': 'application/json' }
//     }).then(res => res.json()).then(data => {
//         console.log(data);
        // if (data.length == 0) {
        //     console.log("cac");
        // } else {
        //     let productsDetails = ``
        //     for (values of data) {
        //         productsDetails +=
        //             `<div class="col-lg-4 col-md-6 col-sm-6 pb-1 pe-3">
        //       <div class="product-item mb-4 pb-4">
        //           <div class="product-img position-relative overflow-hidden">
        //               <img class="img-fluid w-100" src="${values.file_url}" alt="">
        //           </div>
        //           <div class="text-center py-4" style="overflow: hidden;">
        //               <a class="h6 text-decoration-none product_Name "
        //                   href="/product/showDetail?id=${values._id}">
        //                   <p for="" style="height: 40px; overflow: hidden;">
        //                       ${values.product_Name}
        //                   </p>
        //               </a>
        //               <div class="d-flex align-items-center justify-content-center mt-2">
        //                   <h5 style="font-weight: bold;">Rs. ${values.selling_Price}
        //                   </h5>
        //                   <h6 class="text-muted ms-2" style="text-decoration: line-through;">Rs.
        //                       ${values.actual_Price}
        //                   </h6>
        //               </div>
        //               <div class="d-flex align-items-center mb-4 pt-2"
        //                   style="justify-content: center;">
        //                   <button class="btn pro-button"
        //                       style="color: #3D464D; background-color: #FFD333; font-weight: bold; border-color: #FFD333;"
        //                       onclick="addtoWhislist('${values._id}')">
        //                       <i class="fa-sharp fa-solid fa-heart"></i>
        //                   </button>
        //                   <button
        //                       onclick="addToCart('${values._id}','${values.selling_Price}')"
        //                       class="btn pro-button"
        //                       style="color: #3D464D; background-color: #FFD333; font-weight: bold; border-color: #FFD333;">
        //                       <i class="fa-sharp fa-solid fa-cart-shopping"></i>
        //                   </button>
        //               </div>
        //           </div>
        //       </div>
        //   </div>`
        //     }
        //     productsDetails +=
        //         ``


        //     productList.innerHTML = productsDetails
        // }


//     })
// }