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

        $("#slideBar").width($("#left-container").width())
        $("#slideBar").css("left", -$("#slideBar").width())

        $("#searchResultDisplay").width($("#searchBar").width())
        $("#searchResultDisplay").css("left", $("#searchBar").offset().left)
        _DEV()
    })
    $(window).on('resize', () => {
        $("#right-container").width($(window).width() - $("#left-container").width())
        $("#right-container").css("left", $("#left-container").width())
        $("#wrapper").width($("#left-container").width() - 8)

        $("#slideBar").width($("#left-container").width())
        $("#slideBar").css("left", -$("#slideBar").width())

        $("#searchResultDisplay").width($("#searchBar").width())
        $("#searchResultDisplay").css("left", $("#searchBar").offset().left)
        _DEV()
    })
    var x = getCookie("left")
    try {
        if (x != "" && Number(x) <= 400 && Number(x) >= 200) {
            $("#left-container").css("width", x + "px")
            $("#right-container").width($(window).width() - $("#left-container").width())
            $("#right-container").css("left", $("#left-container").width())
            $("#wrapper").width($("#left-container").width() - 4)
        }
    } catch (error) {

    }

    // Init Left and Right container & SlideBar + SearchDisplay
    $("#right-container").width($(window).width() - $("#left-container").width())
    $("#right-container").css("left", $("#left-container").width())
    $("#slideBar").width($("#left-container").width())
    $("#slideBar").css("left", -$("#slideBar").width())
    $("#searchResultDisplay").width($("#searchBar").width())
    $("#searchResultDisplay").css("left", $("#searchBar").offset().left)

    // This is a bad way
    $($(".ui-resizable-handle")[0]).on("dblclick", () => {
        $("#left-container").width(320)
        setCookie("left", "")
        $("#right-container").width($(window).width() - $("#left-container").width())
        $("#right-container").css("left", $("#left-container").width())
        $("#wrapper").width($("#left-container").width() - 4)

        $("#slideBar").width($("#left-container").width())
        $("#slideBar").css("left", -$("#slideBar").width())
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

function search(searchValue, callback = null) {
    if (callback == null) {
        callback = (searchValue, result) => {
            // Search Result Update
        }
    }
    var result = "<dev> Search result of: " + searchValue
    callback(searchValue, result)
}

function presearch(searchValue) {
    console.log("Presearch Started")
    search(searchValue, (searchv, result) => {
        console.log("Presearch:", searchv, result)
    })
    if (searchValue != "") {
        updateSearchResult("Showing results for \"" + searchValue + "\"", "#", true)
    } else {
        updateSearchResult(undefined,undefined,true)
    }
    console.log("Presearch Completed")
}

function insertChats(title, subtitle, redirect = "#") {
    try {
        var rawhtml = "<li class=\"mdc-list-item fadeIn\" onclick=\"top.location=\'#redirect\'\"><span class=\"mdc-list-item__text\"><span class=\"mdc-list-item__primary-text\"><insert CHATS-TITLE></insert></span><span class=\"mdc-list-item__secondary-text\"><insert CHATS-SUBTITLE></insert></span></span></li>"
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

function insertGroups(title, subtitle, redirect = "#") {
    try {
        var rawhtml = "<li class=\"mdc-list-item fadeIn\" onclick=\"top.location=\'#redirect\'\"><span class=\"mdc-list-item__text\"><span class=\"mdc-list-item__primary-text\"><insert CHATS-TITLE></insert></span><span class=\"mdc-list-item__secondary-text\"><insert CHATS-SUBTITLE></insert></span></span></li>"
        document.insertPoints.Groups.html(document.insertPoints.Groups.html().replace("fadeIn", "") + rawhtml.replace("#redirect", redirect).replace("<insert CHATS-TITLE></insert>", title).replace("<insert CHATS-SUBTITLE></insert>", subtitle).replace("<script>", ""))
        flushMaterial()
    } catch (e) { console.log(e); return false }
}

function insertToInsertPoint(point, html) {
    try {
        document.insertPoints[point].append(html)
    } catch (error) {
        return false
    }
    return true
}

function initInsertPoints() {
    var insertPoints = {}
    var x = $("insertPoint")
    for (var n = 0; n < x.length; n++) {
        d = String($(x[n]).attr("what"))
        insertPoints[d] = $(x[n])
    }
    return insertPoints
}

function showSlideBar() {
    if (!document.slideBar) {
        $("#slideBar").animate({ left: 0 }, 300)
        $("#cover").fadeIn(300)
        document.slideBar = true
    } else {
        $("#slideBar").animate({ left: -$("#slideBar").width() }, 200)
        document.slideBar = false
        $("#cover").fadeOut(200)
    }
}


$("#slideBar").css("left", -$("#left-container").width())
// const drawer = mdc.drawer.MDCDrawer.attachTo(document.querySelector('.mdc-drawer'));

document.slideBar = false
document.loggedIn = false
document.insertPoints = initInsertPoints()
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
            } else {
                // Invalid token, invalid session id
                loggedout()
            }
        })
    }
} else {
    loggedout()
}

function loggedin(sessionid) {
    console.log('Logged in')
    document.loggedIn = true
    document.sessionid = sessionid
}

function loggedout() {
    $("#left-top-banner").text("Please log in to continue.")
}

// Dev Start
_DEV = () => {
    $("#inner-right-container").html("<p>Cookie Info</p><p>Userid:" + getCookie("userid") + "</p><p>Nickname:" + getCookie("nickname") + "</p><p>Token:" + getCookie("token") + "</p><p>Left:" + getCookie("left") + "</p>" + "</p><p>Sessionid:" + getCookie("sessionid") + "</p>")
}
// Dev End

_DEV()