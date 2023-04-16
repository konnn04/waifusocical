const boxListMember = document.getElementById("boxListMember")

function syncListMemberOnline() {
    console.log("update syncListMemberOnline")
    boxListMember.innerHTML = ""
    var timeNowDefault = getTimeSecord()
    for (let k = 0; k < infoJson.length; k++) {
        if ((timeNowDefault - infoJson[k]["timenow"]) <= 20) {
            boxListMember.innerHTML += `
            <div class="itemMember">
                <div class="avtItemMember" style="background-image: url(${infoJson[k]["avt"]})">
                    <div class="itemMemberDot"></div>
                </div>
                <div class="itemNameMember">${infoJson[k]["name"]}</div>
            </div>
            `
        }
    }
    for (let k = 0; k < infoJson.length; k++) {
        if ((timeNowDefault - infoJson[k]["timenow"]) > 20) {
            boxListMember.innerHTML += `
            <div class="itemMember bright50">
                <div class="avtItemMember" style="background-image: url(${infoJson[k]["avt"]})">
                    <div class="itemMemberDot"></div>
                </div>
                <div class="itemNameMember">${infoJson[k]["name"]}</div>
            </div>
            `

        }
    }
}
