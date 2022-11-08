export function tabController(e) {
    if (e.target.dataset.js == "main-profile") {
       document.getElementById("main-profile").style.display = "flex";
       document.getElementById("main-extract").style.display = "none";
       elements.mainNotificationsContainer.style.display = "none";
    }
    if (e.target.dataset.js == "main-extract") {
       document.getElementById("main-profile").style.display = "none";
       document.getElementById("main-extract").style.display = "flex";
       elements.mainNotificationsContainer.style.display = "none";
    }
    if (e.target.dataset.js == "notifications-container") {
       document.getElementById("main-profile").style.display = "none";
       document.getElementById("main-extract").style.display = "none";
       elements.mainNotificationsContainer.style.display = "flex";
    }
 }