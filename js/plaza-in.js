showNavBackground(false)
commonRequests("dailyPictureAddr", {}, (addr) => {
    if (addr != false) {
        $("#bkg").css("background-image", "url(\""+addr+"\"")
        $("#bkg").css("height",350)
    }
}, "addr")