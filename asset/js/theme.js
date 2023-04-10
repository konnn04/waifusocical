const tme = document.getElementById("dark-light")
var vRoot = document.documentElement
var likedCmtColor = document.getElementsByClassName("heart-cmt")
let likedColor = document.getElementsByClassName("heart-int")

function light() {
    vRoot.style.setProperty('--bg', '#ddd')
    vRoot.style.setProperty('--bg-dock', '#eeeeee')
    vRoot.style.setProperty('--actice-dock', '#d5d5d5')
    vRoot.style.setProperty('--dock-hvr', '#e3e3e3')
    vRoot.style.setProperty('--bg-lr', '#fafafa')
    vRoot.style.setProperty('--border', '#eeeeee')
    vRoot.style.setProperty('--menu-hvr', '#e1e1e1')
    vRoot.style.setProperty('--box', '#eee')
    vRoot.style.setProperty('--box-hvr', '#ccc')
    vRoot.style.setProperty('--bg-box', '#efefef')
    vRoot.style.setProperty('--bg-box2', '#fff')
    vRoot.style.setProperty('--text', '#0a0a0a')
}

function dark() {
    vRoot.style.setProperty('--bg', '#2e2e2e')
    vRoot.style.setProperty('--bg-dock', '#313131')
    vRoot.style.setProperty('--actice-dock', '#3c3c3c')
    vRoot.style.setProperty('--dock-hvr', '#525252')
    vRoot.style.setProperty('--bg-lr', '#353535')
    vRoot.style.setProperty('--border', '#404040')
    vRoot.style.setProperty('--menu-hvr', '#525252')
    vRoot.style.setProperty('--box', '#4f4f4f')
    vRoot.style.setProperty('--box-hvr', '#2d2d2d')
    vRoot.style.setProperty('--bg-box', '#3f3f3f')
    vRoot.style.setProperty('--bg-box2', '#3d3d3d')
    vRoot.style.setProperty('--text', '#fff')
}
//

var stdTheme = localStorage.getItem("theme")
if (stdTheme == "1") {
    tme.classList.toggle('dark-white-w')
    light()
}

if (localStorage.getItem("theme")) {
    localStorage.getItem("theme", "0")
}

tme.onclick = () => {
    tme.classList.toggle('dark-white-w')
    if (stdTheme == "0") {
        stdTheme = "1"
        light()
        localStorage.setItem("theme", stdTheme)
    } else {
        stdTheme = "0"
        dark()
        localStorage.setItem("theme", stdTheme)

    }
}


for (i = 0; i < likedColor.length; i++) {
    likedColor[i].onclick = function() {
        this.classList.toggle('liked')
    }
}
for (i = 0; i < likedCmtColor.length; i++) {
    likedCmtColor[i].onclick = function() {
        this.classList.toggle('liked')
    }
}