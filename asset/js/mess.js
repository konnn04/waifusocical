const inputChatMes = document.getElementById("chatInput")
const inputChatMesBtn = document.getElementById("chatInputBtn")
const showChatBox = document.getElementById("showChatBox")
var itemChat
var messJson = {
    "time": gettime(),
    "username": clientUname,
    "name": clientName,
    "avt": clientAvt,
    "content": inputChatMes.innerText.trim()
}
var sampleChat1 = `<div class="itemChat">
<div class="timeChat">${messJson["time"]}</div>
<div class="avtChat">
    <img src="${messJson["avt"]}" alt="">
</div>
<div class="contentChatBox">
    <div class="nameChat">${messJson["name"]}</div>
    <div class="contentChat">${messJson["content"]}</div>
</div>
</div>
`

var sampleChat2 = `<div class="itemChat1">
<div class="contentChatBox">
    <div class="contentChat">${messJson["content"]}</div>
</div>
</div>`
const callAPIMess = async(type, x, y) => {
    var dat
    if (type == 1) {
        await fetch(`https://6433dc771c5ed06c95889a06.mockapi.io/mes/mess`, {
            method: 'GET',
            headers: { 'content-type': 'application/json' }
        }).then(res => {
            if (res.ok) {
                return res.json();
            }
        }).then(data => dat = data).catch(error => {
            alert("Lỗi!")
        })
    }
    if (type == 2) {
        await fetch(`https://6433dc771c5ed06c95889a06.mockapi.io/mes/mess`, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(x)
        }).then(res => {
            if (res.ok) {
                return res.json();
            }
        }).then(data => dat = data).catch(error => {
            alert("Lỗi!")
        })
    }
    if (type == 3) {
        await fetch(`https://6433dc771c5ed06c95889a06.mockapi.io/mes/mess/${x}`, {
            method: 'DELETE',
        }).then(res => {
            if (res.ok) {
                return res.json();
            }
        }).then(data => dat = data).catch(error => {
            alert("Lỗi!")
        })
    }
    if (type == 4) {
        await fetch(`https://6433dc771c5ed06c95889a06.mockapi.io/mes/mess/${y}`, {
            method: 'PUT',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(x)
        }).then(res => {
            if (res.ok) {
                return res.json();
            }
        }).then(data => dat = data).catch(error => {
            alert("Lỗi!")
        })
    }
    return dat

}

const initChat = async() => {
    showChatBox.innerHTML = ""
    var downJson = await callAPIMess(1)
    if (downJson.length > 50) {
        var id = downJson[50]["id"] - 50
        callAPIMess(3, id)
    }
    var userSame = ""
    var DOMchat = ""

    if (downJson.length > 0) {
        if (downJson.length > 30) {
            for (let i = downJson.length - 30; i < 30; i++) {

                if (userSame != downJson[i]["name"]) {
                    userSame = downJson[i]["name"]
                    DOMchat += `<div class="itemChat">
                    <div class="timeChat">${downJson[i]["time"]}</div>
                    <div class="avtChat">
                        <img src="${downJson[i]["avt"]}" alt="">
                    </div>
                    <div class="contentChatBox">
                        <div class="nameChat">${downJson[i]["name"]}</div>
                        <div class="contentChat">${downJson[i]["content"]}</div>
                    </div>
                    </div>
                    `
                } else {
                    DOMchat += `<div class="itemChat1">
                    <div class="timeChat">${downJson[i]["time"]}</div>
                    <div class="contentChatBox">
                        <div class="contentChat">${downJson[i]["content"]}</div>
                    </div>
                    </div>`
                }

            }
        } else {
            for (let i = 0; i < downJson.length; i++) {

                if (userSame != downJson[i]["name"]) {
                    userSame = downJson[i]["name"]
                    DOMchat += `<div class="itemChat">
                    <div class="timeChat">${downJson[i]["time"]}</div>
                    <div class="avtChat">
                        <img src="${downJson[i]["avt"]}" alt="">
                    </div>
                    <div class="contentChatBox">
                        <div class="nameChat">${downJson[i]["name"]}</div>
                        <div class="contentChat">${downJson[i]["content"]}</div>
                    </div>
                    </div>
                    `
                } else {
                    DOMchat += `<div class="itemChat1">
                    <div class="timeChat">${downJson[i]["time"]}</div>
                    <div class="contentChatBox">
                        <div class="contentChat">${downJson[i]["content"]}</div>
                    </div>
                    </div>`
                }
            }
        }
        showChatBox.innerHTML = DOMchat
        showChatBox.scrollTo({
            top: 99999999,
            behavior: "smooth"
        })
    }
}

initChat()

inputChatMes.oninput = () => {
    if (inputChatMes.innerText.trim() == "") {
        inputChatMesBtn.innerHTML = `<i class="fa-solid fa-arrows-spin"></i>`
    } else {
        inputChatMesBtn.innerHTML = `<i class="fa-solid fa-paper-plane"></i>`
    }
}
var cooldown = false
inputChatMesBtn.onclick = async() => {
    if (cooldown == true) {
        alert("Sống chậm lại sẽ thấy ý nghĩa hơn đó!")
    } else {
        if (inputChatMes.innerText.trim() != "") {
            if (inputChatMes.innerText.trim().length > 250) {
                alert(`Giới hạn tin nhắn là 250 chữ, hiện tại đang có ${inputChatMes.innerText.trim().length}`)
            } else {
                inputChatMesBtn.style.backgroundImage = "radial-gradient(#bc0000, #d40000)"
                inputChatMesBtn.innerHTML = `<i class="fa-solid fa-arrows-spin"></i>`
                cooldown = true
                setTimeout(() => {
                    cooldown = false
                    inputChatMesBtn.style.backgroundImage = ""
                }, 4000)

                messJson = {
                    "time": gettime(),
                    "name": clientName,
                    "username": clientUname,
                    "avt": clientAvt,
                    "content": inputChatMes.innerText.trim(),
                }
                inputChatMes.innerText = ""
                await callAPIMess(2, messJson)
                await initChat()
            }
        } else {
            await initChat()
            inputChatMesBtn.style.backgroundImage = "radial-gradient(#bc0000, #d40000)"
            cooldown = true
            setTimeout(() => {
                cooldown = false
                inputChatMesBtn.style.backgroundImage = ""
            }, 4000)


        }
    }
}