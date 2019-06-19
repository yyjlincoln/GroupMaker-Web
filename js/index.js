
$(document).ready(() => {

    // Auto size

    // document.write("<p>Nickname="+getCookie("nickname")+"</p>")
    // document.write("<p>ID="+getCookie("userid")+"</p>")
    // document.write("<p>Token="+getCookie("token")+"</p>")
    // document.close()
    document.searchDisplay = false
    $("#left-container").resizable({
        // ghost: true,
        handles: 'e, w',
        maxWidth: 500,
        minWidth: 200
    });

    document.preventSlideUp = false
    document.mouseOnSearch = false

    document.showingSearchResult = false
    document.searchLock = false
    $("#searchInputTextBox").on("focus", () => {
        document.searchFocused = true
        $("#searchResultDisplay").slideDown(200)
    })

    $("#searchInputTextBox").on("focusout", () => {
        document.searchFocused = false
        if (document.preventSlideUp == false) {
            $("#searchResultDisplay").slideUp(200)
        }
    })
    $("#search").mouseover(() => {
        // console.log('mouseonsearch')
        document.mouseOnSearch = true
    })
    $("#search").mouseout(() => {
        // console.log('mouseoutof search')
        document.mouseOnSearch = false
    })
    $("#searchResultDisplay").mouseover(() => {
        document.preventSlideUp = true
    })

    $("#searchResultDisplay").mouseout(() => {
        // alert('1')
        document.preventSlideUp = false
        if (document.mouseOnSearch == false && document.searchFocused == false) {
            $("#searchResultDisplay").slideUp(200)
        }
    })


    $("#left-container").resize(() => {
        setCookie("left", $("#left-container").width(), 365)
        $("#right-container").width($(window).width() - $("#left-container").width())
        $("#right-container").css("left", $("#left-container").width())
        $("#wrapper").width($("#left-container").width() - 4)

        $("#userSlideBar").css("left", $(window).width() + $("#userSlideBar").width())

        $("#searchResultDisplay").width($("#searchBar").width())
        $("#searchResultDisplay").css("left", $("#searchBar").offset().left)
        _DEV()
    })
    $(window).on('resize', () => {
        $("#right-container").width($(window).width() - $("#left-container").width())
        $("#right-container").css("left", $("#left-container").width())
        // console.log("1",rightContainerFullScreen)
        $("#wrapper").width($("#left-container").width() - 8)
        if ($("#left-container").width() != 0) {
            $("#slideBar").width($("#left-container").width())
        }
        if (document.slideBar != true) {
            $("#slideBar").css("left", -$("#slideBar").width())
        }
        if (document.userSlideBar != true) {
            $("#userSlideBar").css("left", $(window).width() + $("#userSlideBar").width())
        } else {
            $("#userSlideBar").css("left", $(window).width() - $("#userSlideBar").width())
        }
        $("#searchResultDisplay").width($("#searchBar").width())
        $("#searchResultDisplay").css("left", $("#searchBar").offset().left)
        _DEV()
    })

    $(window).on("hashchange", onHashChange)

    // This is a bad way
    $($(".ui-resizable-handle")[0]).on("dblclick", () => {
        $("#left-container").width(320)
        setCookie("left", "")
        $("#right-container").width($(window).width() - $("#left-container").width())
        $("#right-container").css("left", $("#left-container").width())
        $("#wrapper").width($("#left-container").width() - 4)

        _DEV()
    })
    $($(".ui-resizable-handle")[1]).on("dblclick", () => {
        $("#left-container").width(320)
        setCookie("left", "")
        $("#right-container").width($(window).width() - $("#left-container").width())
        $("#right-container").css("left", $("#left-container").width())
        $("#wrapper").width($("#left-container").width() - 4)
        _DEV()
    })

})

function InitDivPosition(rightContainerFullScreen = undefined) {
    // allowCookieChange = true
    if (rightContainerFullScreen == undefined) {
        rightContainerFullScreen = false
        allowCookieChange = false
    } else {
        allowCookieChange = true
    }
    if (allowCookieChange == true) {
        setCookie("fullscreen", String(rightContainerFullScreen), 365)
    }
    document.rightContainerFullScreen = rightContainerFullScreen
    if (rightContainerFullScreen == false) {
        var x = getCookie("left")
        try {
            if (x != "" && Number(x) <= 800 && Number(x) >= 200) {
                $("#left-container").css("width", x + "px")
            } else {
                $("#left-container").width(320)
            }
            $("#right-container").width($(window).width() - $("#left-container").width())
            $("#right-container").css("left", $("#left-container").width())
            $("#wrapper").width($("#left-container").width() - 4)
            $("#left-container").fadeIn()
        } catch (error) {

        }
    } else {

        // $("#right-container").animate({
        //     width: $(window).width(),
        //     left: 0
        // }, 30)
        $("#right-container").width($(window).width())
        $("#right-container").css("left", 0)
        // $("#left-container").animate({
        //     width: 0,
        // }, 30)

        $("#left-container").width(0)
        // $("#left-container").fadeOut()
    }

    // Init Left and Right container & SlideBar + SearchDisplay
    $("#right-container").width($(window).width() - $("#left-container").width())
    $("#right-container").css("left", $("#left-container").width())
    if (document.slideBar != true) {
        $("#slideBar").css("left", -$("#slideBar").width())
    }
    $("#searchResultDisplay").width($("#searchBar").width())
    $("#searchResultDisplay").css("left", $("#searchBar").offset().left)
    if (document.userSlideBar != true) {
        $("#userSlideBar").css("left", $(window).width() + $("#userSlideBar").width())
    } else {
        $("#userSlideBar").css("left", $(window).width() - $("#userSlideBar").width())
    }
}

function search(searchValue, callback = null) {
    if (searchValue == "" && document.showingSearchResult == true) {
        document.showingSearchResult = false
        top.location = "#"
        return false
    }
    if (searchValue == "" || searchValue == undefined) {
        return false
    }
    if (callback == null) {
        callback = (result) => {
            // Search Result Update
            document.searchLock = false
            document.showingSearchResult = true
            top.location = "#!"
            top.location = "#searchResult"
        }
    }
    if (searchValue.length > 1) {
        if (searchValue[0] == ">" && searchValue[searchValue.length - 1] == ";") {
            try {
                eval(searchValue.substring(1, searchValue.length - 1))
            } catch (e) { alert(e) }
            searchBar.searchInput.value = ""
            return
        }
    }
    if (document.searchLock == false || searchValue != document.searchValue) {
        document.searchValue = searchValue
        document.searchLock = true
        getPublicGroups(searchValue, undefined, undefined, undefined, undefined, undefined, callback, () => {
            document.searchLock = false
        })
    } else {
        return false
    }
    // var result = "<dev> Search result of: " + searchValue
    // callback(result)
}

function presearch(searchValue) {
    updateSearchResult(undefined, undefined, true)
    console.log("Presearch Started")
    updateSearchResult(undefined, undefined, true)
    search(searchValue, (result) => {
        document.searchLock = false
        // console.log("Presearch:", document.searchValue, result)
        updateSearchResult(undefined, undefined, true)
        for (var x = 0; x < result.length; x++) {
            updateSearchResult(result[x].title, result[x].groupURL)
        }
        updateSearchResult("Showing results for \"" + searchValue + "\", press enter for more results.", "#", false)
    })

    if (searchValue != "") {
        if (searchValue.length > 0) {
            if (document.searchValue[0] == ">") {
                updateSearchResult("To run javascript, finish the sentence with \";\".", "#", true)
            } else {
                updateSearchResult("Searching \"" + searchValue + "\"...", "#", true)
            }
        } else {

        }
        console.log("Presearch Completed")
    }
}
function insertChats(title, subtitle, redirect = "#", clear = false) {
    try {
        if (clear) {
            document.insertPoints.Chats.html("")
        }
        var rawhtml = "<li class=\"mdc-list-item\" onclick=\"top.location=\'#redirect\'\"><span class=\"mdc-list-item__text\"><span class=\"mdc-list-item__primary-text\"><insert CHATS-TITLE></insert></span><span class=\"mdc-list-item__secondary-text\"><insert CHATS-SUBTITLE></insert></span></span></li>"
        document.insertPoints.Chats.html(document.insertPoints.Chats.html().replace("fadeIn", "") + rawhtml.replace("#redirect", redirect).replace("<insert CHATS-TITLE></insert>", title).replace("<insert CHATS-SUBTITLE></insert>", subtitle).replace("<script>", ""))
        flushMaterial()
    } catch (e) { console.log(e); return false }
}

function updateSearchResult(title, redirect = "#", clear = false) {
    try {
        var rawhtml = "<ul class=\"mdc-list\" style=\"padding: 0px;\" onclick=\"top.location='#redirect'\"><li class=\"mdc-list-item\" tabindex=\"0\"><span class=\"mdc-list-item__text\">$content$</span></li>"
        if (!clear) {
            document.insertPoints.searchResult.html(document.insertPoints.searchResult.html() + rawhtml.replace("#redirect", redirect).replace("$content$", title).replace("<script>", ""))
        } else {
            if (title != undefined) {
                document.insertPoints.searchResult.html(rawhtml.replace("#redirect", redirect).replace("$content$", title).replace("<script>", ""))
            } else {
                document.insertPoints.searchResult.html("")
            }
        }
        flushMaterial()
    } catch (e) { console.log(e); return false }
}

function insertGroups(title, subtitle, redirect = "#", clear = false) {
    try {
        if (clear) {
            document.insertPoints.Groups.html("")
        }
        var rawhtml = "<li class=\"mdc-list-item\" onclick=\"top.location=\'#redirect\'\"><span class=\"mdc-list-item__text\"><span class=\"mdc-list-item__primary-text\"><insert CHATS-TITLE></insert></span><span class=\"mdc-list-item__secondary-text\"><insert CHATS-SUBTITLE></insert></span></span></li>"
        document.insertPoints.Groups.html(document.insertPoints.Groups.html().replace("fadeIn", "") + rawhtml.replace("#redirect", redirect).replace("<insert CHATS-TITLE></insert>", title).replace("<insert CHATS-SUBTITLE></insert>", subtitle).replace("<script>", ""))
        flushMaterial()
    } catch (e) { console.log(e); return false }
}


function showSlideBar() {
    if (!document.slideBar) {
        $("#slideBar").animate({ left: 0 }, 200)
        $("#cover").fadeIn(200)
        document.slideBar = true
    } else {
        $("#slideBar").animate({ left: -$("#slideBar").width() }, 200)
        document.slideBar = false
        if (document.userSlideBar != true) {
            $("#cover").fadeOut(200)
        }
    }
}


$("#slideBar").css("left", -$("#slideBar").width())
// const drawer = mdc.drawer.MDCDrawer.attachTo(document.querySelector('.mdc-drawer'));

document.slideBar = false
document.userSlideBar = false
document.loggedIn = false
document.insertPoints = initInsertPoints()

function loginStatusCheck(loggedin, loggedout) {
    document.token = getCookie("token")
    document.nickname = getCookie("nickname")
    document.userid = getCookie("userid")

    session_trial = getCookie("sessionid")

    // 1) Get session from cookie
    // 2) If Yes verify()
    // 3)     Verify Yes, OK
    // 4)     Verify No, getSession()
    // 5)         GetSession Yes, OK
    // 6)         GetSession No, <Token Expired, Login Expired>
    // 7) If No getSession()
    // 8)     No Token:
    // 9)         <Not logged in>
    // 10)    Have Token getSession():
    // 11)        GetSession Yes, OK
    // 12)        GetSession No, <Token Expired>


    if (document.userid != "" && document.token != "") {
        if (session_trial != "") {
            verifySession(session_trial, document.token, (stat) => {
                if (stat == true) {
                    document.loggedIn = true // valid token, valid sessionid
                    document.sessionid = session_trial
                    loggedin(session_trial)
                } else {
                    // invalid sessionid, unknown token
                    getSession(document.userid, document.token, (sessionid) => {
                        if (sessionid != false) {
                            // valid token, valid session id
                            document.sessionid = sessionid
                            setCookie("sessionid", sessionid)
                            document.sessionid = sessionid
                            loggedin(sessionid)
                        } else {
                            // Invalid token, invalid session id
                            loggedout()
                        }
                    })
                }
            })
        } else {
            getSession(document.userid, document.token, (sessionid) => {
                if (sessionid != false) {
                    // valid token, valid session id
                    document.sessionid = sessionid
                    setCookie("sessionid", sessionid)
                    loggedin(sessionid)
                } else {
                    // Invalid token, invalid session id
                    loggedout()
                }
            })
        }
    } else {
        loggedout()
    }
}

loginStatusCheck(loggedin, loggedout)

function loggedin(sessionid) {
    console.log('Logged in')
    flushChats()
    flushGroups()
    document.loggedIn = true
    document.sessionid = sessionid
    // $("#loginbutton").text("My Profile")
    $("#loginbutton").hide()
    $("#right-top-icon").show()
    $("#userinfo").attr("onclick", "showUserSlideBar()")
    $("nickname").text(document.nickname)
    $("userid").text(document.userid)
    $("token").text(document.token)
    $("sessionid").text(document.sessionid)
    // flushRightPage("explore-in.html")
    onHashChange(top.location.href, true)
    getImgURL('infobackground', (url) => {
        $(".userInfoBackground").css("background-image", "url(" + url + ")")
        $("userInfoBackground").css("background-image", "url(" + url + ")")
    })
    getImgURL('usericon', (url) => {
        $(".userIcon").css("background-image", "url(" + url + ")")
        $("userIcon").css("background-image", "url(" + url + ")")
    })

    x = getCookie("fullscreen")
    if (x == "") {
        InitDivPosition(false)
    } else {
        InitDivPosition((x)==="true")
    }
}

function flushGroups() {
    getGroups(document.userid, document.sessionid, document.token, (groups) => {
        for (var x = 0; x < groups.length; x++) {
            insertGroups(groups[x].title, groups[x].subtitle, groups[x].groupURL)
        }
    })
}

function flushChats() {
    getChats(document.userid, document.sessionid, document.token, (chats) => {
        for (var x = 0; x < chats.length; x++) {
            insertChats(chats[x].title, chats[x].subtitle, chats[x].chatURL)
        }
    })
}

function loggedout() {
    $("#left-top-banner").text("Please log in to continue.")
    // Init rightPage
    flushRightPage("introduction-in.html")
}

function showUserSlideBar() {
    if (!document.userSlideBar) {
        $("#userSlideBar").animate({ left: $(window).width() - $("#userSlideBar").width() }, 200)
        $("#cover").fadeIn(200)
        document.userSlideBar = true
    } else {
        $("#userSlideBar").animate({ left: $(window).width() }, 200)
        document.userSlideBar = false
        if (document.slideBar != true) {
            $("#cover").fadeOut(200)
        }
    }
}

function onHashChange(ev, directURLMode = false) {
    // console.log(ev, ev.originalEvent.newURL)
    // console.log('HashChange')
    if (!directURLMode) {
        url = ev.originalEvent.newURL.split("#")
    } else {
        url = ev.split("#")
    }
    // console.log(url)
    if (url.length != 1 && document.loggedIn == true) {
        hash = url[url.length - 1].split("@")
        document.rightPageResources = hash
        switch (hash[0]) {
            case "Group":
                flushRightPage("group-in.html")
                break
            case "Chat":
                flushRightPage("chat-in.html")
                break
            case "Story":
                flushRightPage("story-in.html")
                break
            case "allGroups":
                flushRightPage("allGroups-in.html")
                break
            case "allChats":
                flushRightPage("allChats-in.html")
                break
            case "searchResult":
                flushRightPage("searchResult-in.html")
                break
            case "plaza":
                flushRightPage("plaza-in.html")
                break
            case "chats":
                flushRightPage("chats-in.html")
                break
            case "!":
                break
            case "":
                flushRightPage("explore-in.html")
                break
        }
    } else {
        flushRightPage("explore-in.html")
    }
}

function flushRightPage(requestedURL) {
    preventDefalut = false
    if (requestedURL == "plaza-in.html") {
        $("#pageSwitch").text("Groups Plaza")
        preventDefalut = true
    } else if (requestedURL == "chats-in.html") {
        $("#pageSwitch").text("Chats Centre")
        preventDefalut = true
    } else {
        $("#pageSwitch").text("Dashboard")
    }
    if (preventDefalut == false && requestedURL != "explore-in.html" && requestedURL != "#" && requestedURL != "introduction-in.html" && requestedURL != "") {
        if (history.length > 2) {
            $("#listicon").text("navigate_before")
            $("#listicon").attr("onclick", "history.back()")
        }
    } else if (preventDefalut == true) {

    } else {
        // alert('list')
        $("#listicon").text("menu")
        $("#listicon").attr("onclick", "showSlideBar()")
    }
    insertToInsertPoint("rightPage", "<div id=\"loadingEffect\"><svg class=\"spinner\" style=\"margin-left: auto;margin-right:auto;\" width=\"65px\" height=\"65px\" viewBox=\"0 0 66 66\" xmlns=\"http://www.w3.org/2000/svg\"><circle class=\"circle\" fill=\"none\" stroke-width=\"6\" stroke=\"#673ab7\" stroke-linecap=\"round\" cx=\"33\" cy=\"33\" r=\"30\"></circle></svg></div><style>.material_block{  width: 580px;  padding: 20px;  background-color: #fff;  box-shadow: 0 2px 5px rgba(0,0,0,.4);  margin: auto;}.spinner{  -webkit-animation: rotation 1.35s linear infinite;  animation: rotation 1.35s linear infinite;}@-webkit-keyframes rotation{  0% {    -webkit-transform: rotate(0deg);    transform: rotate(0deg);  }  100% {    -webkit-transform: rotate(270deg);    transform: rotate(270deg);  }}@keyframes rotation{  0% {    -webkit-transform: rotate(0deg);    transform: rotate(0deg);  }  100% {    -webkit-transform: rotate(270deg);    transform: rotate(270deg);  }}.circle{  stroke-dasharray: 180;  stroke-dashoffset: 0;  -webkit-transform-origin: center;  -ms-transform-origin: center;  transform-origin: center;  -webkit-animation: turn 1.35s ease-in-out infinite;  animation: turn 1.35s ease-in-out infinite;}@-webkit-keyframes turn{  0% {    stroke-dashoffset: 180;  }  50% {    stroke-dashoffset: 45;    -webkit-transform: rotate(135deg);    transform: rotate(135deg);  }  100% {    stroke-dashoffset: 180;    -webkit-transform: rotate(450deg);    transform: rotate(450deg);  }}@keyframes turn{  0% {    stroke-dashoffset: 180;  }  50% {    stroke-dashoffset: 45;    -webkit-transform: rotate(135deg);    transform: rotate(135deg);  }  100% {stroke-dashoffset: 180;    -webkit-transform: rotate(450deg);    transform: rotate(450deg);}}</style>")
    $.get(requestedURL, (text) => {
        if (insertToInsertPoint("rightPage", text) == false) {
            alert("Error occured when trying to insert page")
        }
    }).fail(() => {
        console.log("Failed to insert right page: " + requestedURL)
        insertToInsertPoint("rightPage", "<div id=\"errhtml\" class=\"ihtml\">    <div id=\"err\">        Oops, Page load error.    </div></div><style>    #errhtml{        display: flex;        flex-direction: column;        justify-content: center;    }    #err{     text-align: center;       }</style>")
    })
}
// Dev Start
_DEV = () => {
    $("#debug").html("<p>Cookie Info</p><p>Userid:" + getCookie("userid") + "</p><p>Nickname:" + getCookie("nickname") + "</p><p>Token:" + getCookie("token") + "</p><p>Left:" + getCookie("left") + "</p>" + "</p><p>Sessionid:" + getCookie("sessionid") + "</p>")
    // console.log("DEV was called due to event.")
}
// Dev End

// __DEV = () => {
//     insertGroups("Blah Blah Blah Competition", "Categorized in \"Studies\"", "#")
//     insertGroups("Another Competition", "Categorized in \"Studies\"", "#")
//     insertGroups("Debug Mode On", "Warning", "#")
//     insertChats("John Lee", "1 shared group")
//     insertChats("Dan Tong", "3 shared group")
//     insertChats("Debug Mode On", "Warning", "#")
// }
_DEV()
// __DEV()