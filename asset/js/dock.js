var dockStatus = 0;

itemDock[dockStatus].classList.toggle("act-dock")

DOMself.style.display = "none"
DOMmess.style.display = "none"

itemDock[0].onclick = (e) => {
    //tắt active cũ
    itemDock[dockStatus].classList.toggle("act-dock")
    dockStatus = 0;
    //bật active mới
    itemDock[dockStatus].classList.toggle("act-dock")
    DOMfeed.style.display = "block"
    DOMself.style.display = "none"
    DOMmess.style.display = "none"

}

itemDock[3].onclick = (e) => {
    //tắt active cũ
    itemDock[dockStatus].classList.toggle("act-dock")
    dockStatus = 3;
    //bật active mới
    itemDock[dockStatus].classList.toggle("act-dock")
    DOMfeed.style.display = "none"
    DOMmess.style.display = "block"
    DOMself.style.display = "none"

}

itemDock[4].onclick = (e) => {
    //tắt active cũ
    itemDock[dockStatus].classList.toggle("act-dock")
    dockStatus = 4;
    //bật active mới
    itemDock[dockStatus].classList.toggle("act-dock")
    DOMfeed.style.display = "none"
    DOMself.style.display = "block"
    DOMmess.style.display = "none"
}