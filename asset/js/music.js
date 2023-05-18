const Btn = document.getElementsByClassName("btn-control-music")
const diskMusic = document.getElementById("disk-music")
const thumImg = diskMusic.querySelector("img")
const timenow = document.getElementById("music-now")
const timeend = document.getElementById("music-end")
const timelinenow = document.getElementById("prog-music-now")
const timeline = document.getElementById("prog-music")
const timelinehover = document.getElementById("prog-hover")
const moreBtn = document.getElementById("music-more")
const iconMore = moreBtn.querySelector("i")
const plistbox = document.getElementById("plist-box")
const nameSong = document.getElementById("song-name")
const nameSinger = document.getElementById("artist-name")
const ctrlvol = document.getElementById("ctrl-vol")
const closeMusic = document.getElementById("close-music")
const boxMusic = document.getElementById("music-box")
const inBoxMusic = boxMusic.querySelectorAll("div")
var plItem = document.getElementsByClassName("item-song")
const screen = document.getElementById("feed-space")
var root = document.documentElement

let keepMove = false
let playlistOn = false;
var checkPlay = false
var udtime
let audioPlay
let sizeSong = 0
let nSong = 0
let vol = 0.25;
let closeBox = false
ctrlvol.value = 5;
let firstEvent = true
readJSON();

closeMusic.onclick = (e) => {
    if (!closeBox) {
        boxMusic.style.minWidth = "80px"
        boxMusic.style.width = "80px"
        boxMusic.style.minHeight = "80px"
        boxMusic.style.padding = "5px"
        diskMusic.style = ""
        diskMusic.style.margin = "0"
        diskMusic.style.cursor = "pointer"
        for (let i = 0; i < inBoxMusic.length; i++) {
            inBoxMusic[i].style.display = "none"
        }
        diskMusic.style.display = "block"
        closeBox = true
        if (playlistOn == true) { moreBtn.onclick() }
    }
}

diskMusic.onclick = (e) => {
    if (closeBox && (keepMove == false)) {
        for (let i = 0; i < inBoxMusic.length; i++) {
            inBoxMusic[i].style.removeProperty("display")
        }
        boxMusic.style = ""
        diskMusic.style = ""
        closeBox = false
    }
}

ctrlvol.oninput = (e) => {
    vol = (ctrlvol.value / 20)
    audioPlay.volume = vol
}

Btn[0].onclick = (e) => {
    firstEvent = false
    if (nSong > 0) {
        plItem[nSong].classList.remove("item-song-now")
        nSong--
        readJSON()
    }
}
Btn[2].onclick = (e) => {
    firstEvent = false
    if (nSong < sizeSong - 1) {
        plItem[nSong].classList.remove("item-song-now")
        nSong++
        readJSON()

    }
}

async function readJSON() {
    if (checkPlay == true) pauseMusic()
    fetch(`https://64425c0376540ce2258a2255.mockapi.io/v1/Music`)
        .then(res => res.json())
        .then(data => {
            setSong(data);
            if (firstEvent == false) {
                playMusic()
            } else {
                diskActive(false)
                showplaylist(data)
                closeMusic.onclick()
                for (let i = 0; i < sizeSong; i++) {
                    plItem[i].onclick = (e) => {
                        plItem[nSong].classList.remove("item-song-now")
                        nSong = i
                        firstEvent = false
                        readJSON()
                    }
                }
            }
        })
}

//=====================
async function setSong(song) {
    audioPlay = new Audio(song[nSong]["link"]);
    nameSong.innerText = song[nSong]["name"];
    nameSinger.innerText = song[nSong]["singer"];
    thumImg.src = `${song[nSong]["img"]}`;
    audioPlay.volume = vol;
    sizeSong = song.length
    root.style.setProperty('--bgBoxMusic', `url("${song[nSong]["img"]}")`)

}



function updateCur() {
    udtime = setInterval(() => {
        timeend.innerText = fommatTime(audioPlay.duration);
        timenow.innerText = fommatTime(audioPlay.currentTime);
        var line = (audioPlay.currentTime * 100 / audioPlay.duration) + '%'
        timelinenow.style.width = line
        if (audioPlay.currentTime == audioPlay.duration) {
            pauseMusic()
            if (nSong < sizeSong - 1) {
                plItem[nSong].classList.remove("item-song-now")
                nSong++;
                //suffle & loop

                readJSON()
            }
            audioPlay.currentTime = 0
        }
    }, 200)
}
updateCur()
timeline.onclick = (e) => {
    audioPlay.currentTime = audioPlay.duration * (e.offsetX / timeline.offsetWidth)
}

timeline.onmousemove = (e) => {
    timelinehover.style.width = e.offsetX + 'px'
}

function pauseMusic() {

    audioPlay.pause()
    checkPlay = false
    diskActive(false)
    Btn[1].innerHTML = `<i class="fa-solid fa-play"></i>`
}

function playMusic() {
    plItem[nSong].classList.add("item-song-now")
    plItem[nSong].scrollIntoView()
    audioPlay.play()
    checkPlay = true
    diskActive(true)
    Btn[1].innerHTML = `<i class="fa-solid fa-pause"></i>`
}
Btn[1].onclick = () => {
    firstEvent = false
    if (checkPlay) {
        pauseMusic()
            // clearInterval(udtime)

    } else {
        // updateCur()
        playMusic()

    }
}

function fommatTime(n) {
    n = Math.round(n);
    var m = Math.floor(n / 60);
    var s = n % 60;
    if (m < 10) { m = '0' + m }
    if (s < 10) { s = '0' + s }
    return m + ':' + s
}

function diskActive(inp) {
    if (inp == false) {
        thumImg.style.animationPlayState = 'paused'

    } else {
        thumImg.style.animationPlayState = 'running'
    }
}


moreBtn.onclick = (e) => {
    if (playlistOn == false) {
        playlistOn = true;
        iconMore.style.rotate = '180deg'
        plistbox.style.display = 'block'
        setTimeout(() => {
            plistbox.style.opacity = 1
        }, 300)
        diskMusic.style.width = '0%'
        diskMusic.style.border = '0'
    } else {
        playlistOn = false;
        plistbox.style.opacity = 0
        setTimeout(() => {
            plistbox.style.display = 'none'
        }, 300)
        iconMore.style.rotate = '0deg'
        diskMusic.style.width = '100%'
        diskMusic.style.border = '2px solid #343434'
    }
}

function showplaylist(song) {
    song.forEach((e, i) => {
        plistbox.innerHTML += `
        <div class="item-song">
        <div class="pl-img">
        <img src="${e.img}" alt="">
    </div>
    <div class="pl-info">
        <p class="pl-name">${e.name}</p>
        <p class="pl-singer">${e.singer}</p>    
    </div></div>`
    })

}

let boxMusicX
let boxMusicY


// screen.onmousemove = (e) => {
//     if (closeBox == true && keepMove == true) {
//         boxMusic.style.top = (e.pageY - boxMusicY) + "px"
//         boxMusic.style.right = (screen.offsetWidth - e.pageX - boxMusicX) + "px"
//     }
// }

// boxMusic.onclick = (e) => {
//     if (closeBox == true) {
//         if (keepMove == true) {
//             keepMove = false
//             boxMusicX = 0
//             boxMusicY = 0

//         } else {
//             keepMove = true
//             boxMusicX = e.offsetX
//             boxMusicY = e.offsetY

//         }
//     }
// }
