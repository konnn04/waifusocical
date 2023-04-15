var cooldownInteract = false
async function likeTus(i, clientUname) {
    if (cooldownInteract == false) {
        cooldownInteract = true
        setTimeout(() => {
            cooldownInteract = false
        }, 3000)
        var ii = feedJsonData.length - 1 - i
        var idTus = feedJsonData[ii]["id"]
        likedColor[i].classList.toggle('liked')

        var feedJsonData2 = await callAPIFeed(4, idTus)
        var userInteract = feedJsonData2["interact"]

        if (userInteract.length == 0) {
            userInteract.push(clientUname)
        } else {
            var vt = userInteract.indexOf(clientUname)

            if (vt >= 0) {
                userInteract.splice(vt, 1)
            } else {
                userInteract.push(clientUname)
            }
        }
        await callAPIFeed(3, { "interact": userInteract }, idTus)
        numHeart[i].innerText = userInteract.length

    } else {
        alert("Sống chậm lại 5 giây được không???")
    }

}

async function cmtTus(i, clientUname, text) {
    if (cooldownInteract == false) {
        cooldownInteract = true
        setTimeout(() => {
            cooldownInteract = false
        }, 3000)
        var ii = feedJsonData.length - 1 - i
        var idTus = feedJsonData[ii]["id"]

        var feedJsonData2 = await callAPIFeed(4, idTus)
        var userCmt = feedJsonData2["cmt"]
        userCmt.push({
            "username": clientUname,
            "name": clientName,
            "time": gettime(),
            "text": toStringClean(text)
        })
        await callAPIFeed(3, { "cmt": userCmt }, idTus)
        boxCmtG[i].innerHTML = feedDefaultCmt({
            "username": clientUname,
            "name": clientName,
            "time": gettime(),
            "text": toStringClean(text)
        }, clientAvt) + boxCmtG[i].innerHTML
        numCmt[i].innerText = userCmt.length + " bình luận"

    } else {
        alert("Sống chậm lại 5 giây được không???")
    }

}