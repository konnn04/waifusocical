var clientName
var clientUname

if (localStorage.getItem("info")) {
    var jsonGot = JSON.parse(localStorage.getItem("info"))
    clientName = jsonGot["name"]
    clientUname = jsonGot["username"]
} else {
    window.location = `${nameRes}/login.html`
}
