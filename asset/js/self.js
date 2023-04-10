const logoutBtn = document.getElementById("logoutBtn")
const changeAvtBtn = document.getElementById("changeAvt")

logoutBtn.onclick = () => {
    alertFilter.style.display = "flex"
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

}