
// Profile information update
function editProfile() {
    document.getElementById("first_Name").disabled = false
    document.getElementById("last_Name").disabled = false
    document.getElementById("user_Name").disabled = false
    document.getElementById("proBtn").style.display = 'block'
    document.getElementById("proEditBtn").style.display = 'none'
    document.getElementById("proCaneclBtn").style.display = 'block'
}
function cancelBtn() {
    document.getElementById("first_Name").disabled = true
    document.getElementById("last_Name").disabled = true
    document.getElementById("user_Name").disabled = true
    document.getElementById("proBtn").style.display = 'none'
    document.getElementById("proEditBtn").style.display = 'block'
    document.getElementById("proCaneclBtn").style.display = 'none'
}

// Email & Mobile Information update fields enable and disable
function emailEdit() {
    document.getElementById('mobile_No').disabled = false
    document.getElementById('user_Email').disabled = false
    document.getElementById("emailBtn").style.display = 'block'
    document.getElementById("emailCancelBtn").style.display = 'block'
    document.getElementById("emailEditBtn").style.display = 'none'
}
function emailCancel() {
    document.getElementById('mobile_No').disabled = true
    document.getElementById('user_Email').disabled = true
    document.getElementById("emailBtn").style.display = 'none'
    document.getElementById("emailCancelBtn").style.display = 'none'
    document.getElementById("emailEditBtn").style.display = 'block'
}

// Profile Update Form
const profileUpdateForm = document.getElementById('profileUpdateForm')

profileUpdateForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const formData = new FormData(profileUpdateForm);

    //Converting the data to Json object
    const data = Object.fromEntries(formData)

    fetch('/userProfile/profile/update', {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }).then((response) => {
        window.location.reload()
    })

})

// Email and Mobile Update Form
const emailUpdateForm = document.getElementById('emailUpdateForm')
emailUpdateForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(emailUpdateForm);
    const data = Object.fromEntries(formData);

    fetch('/userProfile/email/update', {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }).then((response) => {
        window.location.reload()
    })
})

// Update Address Form
// let updateAddressForm = document.getElementById('updateAddressForm')

// updateAddressForm.addEventListener('submit', (e) => {
//     e.preventDefault();
//     const formData = new FormData(updateAddressForm);
    //Converting the data to Json object
//     const data = Object.fromEntries(formData)

//     fetch('/userProfile/address/update',{
//         method: 'put',
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify(data)
//     })
// })