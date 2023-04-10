const creFeedBtn = document.getElementById("cre-status")
const filterCreTusAct = document.getElementById("filterCreTus")
const contentCreTus = document.getElementById("contentCreTus")
const placeholderCreTus = document.getElementById("placeholderCreTus")
const okCreTus = document.getElementById("comformCreTus")
const koCreTus = document.getElementById("cancelCreTus")
const noiceCreTus = document.getElementById("noiceCreTus")



contentCreTus.oninput = () => {
    if (contentCreTus.innerText.trim() != "") {
        placeholderCreTus.style.display = "none"
    } else {
        placeholderCreTus.style.display = "block"
    }
}

creFeedBtn.onclick = () => {
    filterCreTusAct.style.display = "flex"
}

koCreTus.onclick = () => {
    filterCreTusAct.style.display = "none"
    contentCreTus.innerText = ""
}

okCreTus.onclick = () => {
    if (contentCreTus.innerText.trim() != "") {
        if (contentCreTus.innerText.trim().length > 350) {
            noiceCreTus.innerText = `Giới hạn chữ là 350, \n Đang có ${contentCreTus.innerText.trim().length}`
        } else {
            var tus = {
                "avtUser": `${nameRes}/asset/img/avt.jpg`,
                "username": clientUname,
                "name": clientName,
                "content": toStringClean(contentCreTus.innerText),
                "timetus": gettime()
            }
            filterCreTusAct.style.display = "none"

            noiceCreTus.innerText = ""
            contentCreTus.innerText = ""
            feedOuput.innerHTML = feedDefault(tus) + feedOuput.innerHTML
            callAPIFeed(2, tus)
        }
    } else {
        noiceCreTus.innerText = "Chưa có nội dung!"
    }
}