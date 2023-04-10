const logoutBtn = document.getElementById("logoutBtn")
const changeAvtBtn = document.getElementById("changeAvt")
const uploadAvt = document.getElementById("uploadAvt")

//encode
function encodeImageFileAsURL() {



}
//log

logoutBtn.onclick = () => {
    alertFilter.style.display = "flex"
    alertText.innerText = "Bạn có chắc muốn đăng xuất!"

    alertY.onclick = () => {
        alertY.onclick = undefined;
        alertN.onclick = undefined;
        localStorage.removeItem("info")
        window.location = `${nameRes}/login.html`
    }
    alertN.onclick = () => {
        alertFilter.style.display = "none"
        alertY.onclick = undefined
        alertN.onclick = undefined
    }
}

changeAvtBtn.onclick = () => {
    //uploadAvt.click()
}