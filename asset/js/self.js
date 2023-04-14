const logoutBtn = document.getElementById("logoutBtn")
const changeAvtBtn = document.getElementById("changeAvt")
const uploadAvt = document.getElementById("uploadAvt")


//Đổi Avt
const filterChangeAvt = document.getElementById("filterChangeAvt")
const cancelChangeAvt = document.getElementById("cancelChangeAvt")
const comformChangeAvt = document.getElementById("comformChangeAvt")
let previewAvtSrc = document.getElementById("previewAvtSrc")
const noiceChangeAvt = document.getElementById("noiceChangeAvt")
const inputChangeAvt = document.getElementById("inputChangeAvt")

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


var imgAvtOk = false


changeAvtBtn.onclick = () => {
    filterChangeAvt.style.display = "flex"
}
var imgAvtOk2 = false
inputChangeAvt.oninput = () => {
    imgAvtOk2 = false
    previewAvtSrc.addEventListener('load', () => {
        imgAvtOk2 = true
    })
    if (isImage(inputChangeAvt.value.trim())) {
        imgAvtOk = true
        noiceChangeAvt.innerText = "Ảnh hợp lệ!"
        noiceChangeAvt.style.color = "#00ff00"
        previewAvtSrc.src = inputChangeAvt.value.trim()
    } else {
        imgAvtOk = false
        noiceChangeAvt.innerText = "Đường dẫn không hợp lệ!"
        noiceChangeAvt.style.color = "#ff0000"
        previewAvtSrc.src = nameRes + "/asset/img/errorImg.gif"

    }
}

async function callAPItoChangeAvt(id, url) {
    var update = { "avt": url }
    await fetch(`https://643266e9d0127730d2d1bce8.mockapi.io/a1/${id}`, {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(update)
    }).then(res => res.json()).then(data => {
        value = data
    })
}


comformChangeAvt.onclick = async(e) => {
    if (inputChangeAvt.value.trim() == "") {
        noiceChangeAvt.innerText = "Nhập liệu trống!!!"
    } else if (imgAvtOk == false || imgAvtOk2 == false) {
        noiceChangeAvt.innerText = "Vui lòng đổi đường dẫn khác!"
        noiceChangeAvt.style.color = "#ff0000"

    } else {
        noiceChangeAvt.innerText = "Lưu thành công!"

        await callAPItoChangeAvt(clientId, inputChangeAvt.value.trim())
        imgAvtOk = false
        setTimeout(() => {
            var localJson = {
                "name": clientName,
                "username": clientUname,
                "id": clientId,
                "avt": inputChangeAvt.value.trim()
            }

            localStorage.setItem("info", JSON.stringify(localJson))
            filterChangeAvt.style.display = "none"
        }, 2000)
    }
}
cancelChangeAvt.onclick = (e) => {
    filterChangeAvt.style.display = "none"
}