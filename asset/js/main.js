const dock = document.getElementsByClassName("dock-bar")
const itemDock = dock[0].getElementsByClassName("box-dock")

// đồng bộ avt

var DOMavtClient

function syncAvt() {
    DOMavtClient = document.getElementsByClassName("avt-client")
    for (let i = 0; i < DOMavtClient.length; i++) {
        DOMavtClient[i].src = clientAvt
    }
}

//Alert
const alertFilter = document.getElementById("filterAlert")
const alertText = document.getElementById("alertText")
const alertY = document.getElementById("alertYes")
const alertN = document.getElementById("alertNo")
const spaceMain = document.getElementById("feed-space")



const DOMfeed = document.getElementById("feedSence")
const DOMself = document.getElementById("selfSence")
const DOMmess = document.getElementById("messSence")

//Get info
var infoJson

//lấy avatar qua id
function getAvtById(id) {
    for (let i = 0; i < infoJson.length; i++) {
        if (infoJson[i]["id"] == id) {
            return infoJson[i]["avt"]
        }
    }
}

function getAvtByUName(u) {
    for (let i = 0; i < infoJson.length; i++) {
        if (infoJson[i]["username"] == u) {
            return infoJson[i]["avt"]
        }
    }
}

async function callApiInfo() {
    var value
    await fetch("https://643266e9d0127730d2d1bce8.mockapi.io/a1/", {
        method: 'GET',
        headers: { 'content-type': 'application/json' }
    }).then(res => res.json()).then(data => {
        value = data
    })
    for (let i = 0; i < value.length; i++) {
        value[i]["pass"] = null
    }
    infoJson = value
    return value
}
//Kiểm tra link hình ảnh
function isImage(url) {
    return /\.(gif|jpe?g|png|svg|webp)$/i.test(url);
}

//Kiểm tra url hợp lệ
async function isUrl(url) {
    try {
        const response = await fetch(url);
        return response.ok;
    } catch (error) {
        return false;
    }
}
//Get time (secord)
function getTimeSecord() {
    var date = new Date
    var timeSecord = Math.round((date.getTime() / 1000) - 1681313794)
    return timeSecord
}
//Đồng bộ thời gian hành động
async function syncTimenowActive(id) {
    var timenowUpdate = { "timenow": getTimeSecord() }
    await fetch(`https://643266e9d0127730d2d1bce8.mockapi.io/a1/${id}`, {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(timenowUpdate)
    }).then(res => res.json()).then(data => {
        value = data
    })
}

const toStringClean = (s) => {
    s = s.trim()
    while (s.search(/</) > -1) {
        s = s.replace('<', '&lt')
    }
    while (s.search(/>/) > -1) {
        s = s.replace('>', '&gt')
    }

    return s
}

//callAPI
async function callAPIFeed(type, x, id) {
    var value
    if (type == 1) {
        await fetch("https://643266e9d0127730d2d1bce8.mockapi.io/feed", {
            method: 'GET',
            headers: { 'content-type': 'application/json' }
        }).then(res => res.json()).then(data => {
            value = data
        })

    }
    if (type == 2) {
        var value

        await fetch("https://643266e9d0127730d2d1bce8.mockapi.io/feed", {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(x)
        }).then(res => res.json()).then(data => {
            value = data
        })
    }
    if (type == 4) {
        var value
        await fetch(`https://643266e9d0127730d2d1bce8.mockapi.io/feed/${x}`, {
            method: 'GET'
        }).then(res => res.json()).then(data => {
            value = data
        })
    }
    if (type == 3) {
        var value
        await fetch(`https://643266e9d0127730d2d1bce8.mockapi.io/feed/${id}`, {
            method: 'PUT',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(x)
        }).then(res => res.json()).then(data => {
            value = data
        })
    }

    return value

}

const DOMselfname = document.getElementById("infoMyselfName")
const DOMselfuname = document.getElementById("infoMyselfUname")
var tempImg

function gettime() {
    var s = ""
    var date = new Date
    var h = Math.round(date.getHours())
    if (h < 10) {
        s += "0" + h
    } else {
        s += h
    }
    s += ":"
    var m = Math.round(date.getMinutes())
    if (m < 10) {
        s += "0" + m
    } else {
        s += m
    }
    s += " | "
    var dd = Math.round(date.getDate())
    if (dd < 10) {
        s += "0" + dd
    } else {
        s += dd
    }
    s += "/"
    var mm = Math.round(date.getMonth() + 1)
    if (mm < 10) {
        s += "0" + mm
    } else {
        s += mm
    }
    s += "/"
    var yy = Math.round(date.getUTCFullYear())
    s += yy
    return s
}

DOMselfname.innerText = clientName
DOMselfuname.innerText = "@" + clientUname