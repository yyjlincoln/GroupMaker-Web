_DEV_ = true

if (_DEV_ == true) {
    servaddr = "http://localhost/api"
} else {
    servaddr = "https://pm.yyjlincoln.xyz:4430/api"
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date()
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000))
    var expires = "expires=" + d.toGMTString()
    document.cookie = cname + "=" + cvalue + "; " + expires
}

function getCookie(cname) {
    var name = cname + "="
    var ca = document.cookie.split(';')
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i].trim()
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length)
    }
    return ""
}

function deleteAllCookies() {
    var cookies = document.cookie.split(";")

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=")
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT"
    }
}

function flushMaterial() {
    // Apply style for .mdc-text-field
    try {
        x = $('.mdc-text-field')
        for (var n = 0; n < x.length; n++) {
            mdc.textField.MDCTextField.attachTo(x[n]);
        }

        // Apply style for .mdc-button
        x = $('.mdc-button')
        for (var n = 0; n < x.length; n++) {
            mdc.ripple.MDCRipple.attachTo(x[n])
        }

        // x = $('.mdc-icon-button')
        // for (var n = 0; n < x.length; n++) {
        //     mdc.ripple.MDCRipple.attachTo(x[n])
        // }

        var icon_buttons = [].map.call(document.querySelectorAll(".mdc-icon-button"), function (el) {
            x = new mdc.ripple.MDCRipple(el)
            x.unbounded = true
            return x;
        });


        // const iconButton = new mdc.ripple.MDCRipple($('.mdc-icon-button')[0])
        // iconButton.unbounded = true;
        for (var n = 0; n < x.length; n++) {
            mdc.ripple.MDCRipple.attachTo(x[n])
        }

        // Apply style for .mdc-list

        // x = $(".mdc-list")
        // for (var n = 0; n < x.length; n++) {
        //     mdc.list.MDCList.attachTo(x[n])
        // }

        x = $(".mdc-list-item")
        for (var n = 0; n < x.length; n++) {
            mdc.ripple.MDCRipple.attachTo(x[n])
        }
    } catch (e) { console.log(e) }

    // .mdc-card__primary-action
    x = $('.mdc-card__primary-action')
    for (var n = 0; n < x.length; n++) {
        mdc.ripple.MDCRipple.attachTo(x[n])
    }

    x = $('.ripple')
    for (var n = 0; n < x.length; n++) {
        mdc.ripple.MDCRipple.attachTo(x[n])
    }
}

function sendlogin(user, pass, callback) {
    console.log("Login", user, pass)
    // encrypted = encryptLogin(user, pass)
    // [TODO] Send encrypted login
    // [TODO] Encryption. Encryption has been cancelled, and login will be sent on HTTPS.

    $.post(servaddr, {
        action: "getToken",
        userid: user,
        pwd: pass
    }, (data) => {
        try {
            // djson = JSON.parse(data)
            if (data.code == 0) {
                document._getTokenCallback(0, data.token, data.nickname)
            } else {
                document._getTokenCallback(data.code)
            }
        } catch (e) {
            console.log("Error while parsing data from the server.")
            document._getTokenCallback("Script Error on Client Side")
        }
    }).fail((failed) => {
        switch (failed.status) {
            case 0:
                document._getTokenCallback(-9999)
                break
            default:
                document._getTokenCallback(-failed.status - 1000)
        }
    })
    document._getTokenCallback = callback
}

function sendRegister(email, nickname, user, pass, callback) {
    console.log("Register", email, user, pass)
    // encrypted = encryptLogin(user, pass)
    // [TODO] Send encrypted login
    // [TODO] Encryption. Encryption has been cancelled, and login will be sent on HTTPS.

    $.post(servaddr, {
        action: "register",
        nickname: nickname,
        email: email,
        userid: user,
        pwd: pass
    }, (data) => {
        try {
            // djson = JSON.parse(data)
            if (data.code == 0) {
                document._getTokenCallback(0, data.token, data.nickname)
            } else {
                document._getTokenCallback(data.code)
            }
        } catch (e) {
            console.log("Error while parsing data from the server.")
            document._getTokenCallback("Script Error on Client Side")
        }
    }).fail((failed) => {
        switch (failed.status) {
            case 0:
                document._getTokenCallback(-9999)
                break
            default:
                document._getTokenCallback(-failed.status - 1000)
        }
    })
    document._getTokenCallback = callback
}

function encryptLogin(user, pass) {
    // [DEV] [TODO]
    return user + pass
}

function verifySession(session, token, callback) {
    document._verifySessionCallback = callback
    $.post(servaddr, {
        action: "verifySession",
        sessionid: session,
        token: token
    }, (data) => {
        try {
            // djson = JSON.parse(data)
            if (data.code == 0 && data.status == true) {
                document._verifySessionCallback(true)
            } else {
                document._verifySessionCallback(false)
            }
        } catch (e) {
            console.log("Error while parsing data from the server.", e)
            document._verifySessionCallback(false)
        }
    }).fail((failed) => {
        document._verifySessionCallback(false)
    })
    // [DEV] [TODO]
    // document._verifySession_callback(true)
}

function getSession(userid, token, callback) {
    // session = "sessionid"
    document._getSessionCallback = callback

    $.post(servaddr, {
        action: "getSession",
        userid: userid,
        token: token
    }, (data) => {
        try {
            // djson = JSON.parse(data)
            if (data.code == 0) {
                document._getSessionCallback(data.sessionid)
            } else {
                document._getSessionCallback(false)
            }
        } catch (e) {
            console.log("Error while parsing data from the server.", e)
            document._getSessionCallback(false)
        }
    }).fail((failed) => {
        document._getSessionCallback(false)
    })

    // [DEV] [TODO]
    // document._getSession_callback(session)
}

function getGroups(userid, sessionid, token, callback) {
    document._getGroupsCallback = callback
    $.post(servaddr, {
        action: "getGroups",
        userid: userid,
        token: token,
        sessionid: sessionid
    }, (data) => {
        try {
            // djson = JSON.parse(data)
            if (data.code == 0) {
                document._getGroupsCallback(data.groups)
            } else {
                document._getGroupsCallback(false)
            }
        } catch (e) {
            console.log("Error while parsing data from the server.", e)
            document._getGroupsCallback(false)
        }
    }).fail((failed) => {
        document._getGroupsCallback(false)
    })
}

function getChats(userid, sessionid, token, callback) {
    document._getChatsCallback = callback
    $.post(servaddr, {
        action: "getChats",
        userid: userid,
        token: token,
        sessionid: sessionid
    }, (data) => {
        try {
            // djson = JSON.parse(data)
            if (data.code == 0) {
                document._getChatsCallback(data.chats)
            } else {
                document._getChatsCallback(false)
            }
        } catch (e) {
            console.log("Error while parsing data from the server.", e)
            document._getChatsCallback(false)
        }
    }).fail((failed) => {
        document._getChatsCallback(false)
    })
}

function getRecommendations(userid, sessionid, token, callback) {
    document._getRecommendationsCallback = callback
    $.post(servaddr, {
        action: "getRecommendations",
        userid: userid,
        token: token,
        sessionid: sessionid
    }, (data) => {
        try {
            // djson = JSON.parse(data)
            if (data.code == 0) {
                document._getRecommendationsCallback(data.recommendations)
            } else {
                document._getRecommendationsCallback(false)
            }
        } catch (e) {
            console.log("Error while parsing data from the server.", e)
            document._getRecommendationsCallback(false)
        }
    }).fail((failed) => {
        document._getRecommendationsCallback(false)
    })
}



function getPublicGroups(search, cat, start, number, timeStart, timeEnd, callback, done) {
    document._getPublicGroupsCallback = callback
    $.post(servaddr, {
        action: "getPublicGroups",
        search: search,
        category: cat,
        start: start,
        number: number,
        timeStart: timeStart,
        timeEnd: timeEnd
    }, (data) => {
        try {
            // djson = JSON.parse(data)
            if (data.code == 0) {
                document._getPublicGroupsCallback(data.groups)
            } else {
                document._getPublicGroupsCallback(false)
            }
        } catch (e) {
            console.log("Error while parsing data from the server.", e)
            document._getPublicGroupsCallback(false)
        }
    }).fail((failed) => {
        document._getPublicGroupsCallback(false)
    }).done(done)
}


function getActivities(userid, sessionid, token, callback) {
    document._getActCallback = callback
    $.post(servaddr, {
        action: "getActivities",
        userid: userid,
        token: token,
        sessionid: sessionid
    }, (data) => {
        try {
            // djson = JSON.parse(data)
            if (data.code == 0) {
                document._getActCallback(data.activities)
            } else {
                document._getActCallback(false)
            }
        } catch (e) {
            console.log("Error while parsing data from the server.", e)
            document._getActCallback(false)
        }
    }).fail((failed) => {
        document._getActCallback(false)
    })
}

function appendToInsertPoint(point, html) {
    try {
        document.insertPoints[point].append(html)
    } catch (error) {
        return false
    }
    return true
}

function insertToInsertPoint(point, html) {
    try {
        document.insertPoints[point].html(html)
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

function logout(switchAccount = false) {
    deleteAllCookies()
    if (switchAccount == true) {
        top.location = "login.html"
    } else {
        top.location = ""
    }
}

function getImgURL(type, callback) {
    var session = document.sessionid
    var token = document.token
    var userid = document.userid

    // [DEV] [TODO]

    switch (type) {
        case "infobackground":
            callback('https://yyjlincoln.github.io/istweb/Media/1.jpg')
            break
        case "usericon":
            callback('https://yyjlincoln.github.io/istweb/Media/uparrow.svg')
    }
}

flushMaterial()