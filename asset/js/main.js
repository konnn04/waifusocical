const dock = document.getElementsByClassName("dock-bar")
const itemDock = dock[0].getElementsByClassName("box-dock")

//Alert
const alertFilter = document.getElementById("filterAlert")
const alertText = document.getElementById("alertText")
const alertY = document.getElementById("alertYes")
const alertN = document.getElementById("alertNo")
const spaceMain = document.getElementById("feed-space")


const DOMfeed = document.getElementById("feedSence")
const DOMself = document.getElementById("selfSence")
const DOMmess = document.getElementById("messSence")

const toStringClean = (s) => {
    s = s.trim()
    while (s.search(/</) > -1) {
        s = s.replace('<', '&lt')
    }
    while (s.search(/>/) > -1) {
        s = s.replace('>', '&gt')
    }
    while (s.search(/&lth1&gt/) > -1) {
        s = s.replace('>', '&gt')
    }
    return s
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