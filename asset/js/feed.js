var cmt = `<div class="other-cmt">
<div class="avt-cmt">
    <img src="./asset/img/tus1/yuzaki_nasa_19785.jpg" alt="">
</div>
<div class="cmt-shape">
    <p class="name-cmt">
        Yuzaki Nasa
    </p>
    <p class="cmt">
        Em dep lam!
    </p>
    <img src="./asset/img/tus1/c335d665c92aaeecc7a6346fb03fc77a.jpg" alt="">
    <div class="icon-cmt">
        <i class="fa-solid fa-heart heart-cmt"></i>
        <p>2.3k</p>
    </div>
    <p class="time-cmt">
        3 giờ
    </p>
</div>
</div>`


//  <div class="img-feed">
//     <img src="./asset/img/tus1/hVS0Ay5.jpg" alt="">
// </div> 

var feedDefault = (tus) => {
    return `<div class="box feeds">
<div class="hfeed">
    <div class="hfeed-in4">
        <div class="hfeed-avt">
            <img src="${tus["avtUser"]}" alt="">
        </div>
        <div class="hfeed-name">
            ${tus["name"]}
        </div>
    </div>
    <div class="hfeed-menu">
        <i class="fa-solid fa-ellipsis"></i>
    </div>
</div>
<div class="tus">
    <p>
        ${tus["content"]}
    </p>
</div>

<div class="interact-box">
    <div class="itrc">
        <i class="fa-regular fa-heart"></i>
        <i class="fa-solid fa-heart heart-int"></i>
        <p>
            0
        </p>
    </div>
    <div class="detail">
        <p class="detail-text">
            0 bình luận
        </p>
        <p>•</p>
        <p class="detail-text">
            0 chia sẽ
        </p>
        <p>•</p>
        <p class="detail-time">
            ${tus["timetus"]}
        </p>
    </div>
</div>
<div class="cmt-box">
    <div class="my-cmt">
        <div class="avt-cmt">
            <img src="${tus["avtUser"]}" alt="">
        </div>
        <input type="text" placeholder="Bình luận của bạn...">
    </div>
    
</div>
</div>`
}

async function callAPIFeed(type, x) {
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
        await fetch("https://643266e9d0127730d2d1bce8.mockapi.io/feed", {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(x)
        }).then(res => res.json()).then(data => {
            value = data
        })
    }
    if (type == 3) {
        await fetch(`https://643266e9d0127730d2d1bce8.mockapi.io/feed/${x}`, {
            method: 'DELETE'
        }).then(res => res.json()).then(data => {
            value = data
        })
    }
    return value

}

const feedOuput = document.getElementById("feedOuput")
initFeed()
async function initFeed() {
    var myJson = await callAPIFeed(1)
    if (myJson.length > 0) {
        for (let i = myJson.length - 1; i >= 0; i--) {
            feedOuput.innerHTML += feedDefault(myJson[i])
        }
    }
}