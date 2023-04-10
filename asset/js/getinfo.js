var clientName
var clientUname
var clientId
var clientAvt
if (localStorage.getItem("info")) {
    var jsonGot = JSON.parse(localStorage.getItem("info"))
    clientName = jsonGot["name"]
    clientUname = jsonGot["username"]
    clientId = jsonGot["id"]
    clientAvt = nameRes + jsonGot["avt"]
} else {
    window.location = `${nameRes}/login.html`
}