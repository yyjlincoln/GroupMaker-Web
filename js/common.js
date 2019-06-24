_DEV_ = false

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
    try {
        x = $('.mdc-text-field')
        for (var n = 0; n < x.length; n++) {
            mdc.textField.MDCTextField.attachTo(x[n]);
        }

        x = $('.mdc-button')
        for (var n = 0; n < x.length; n++) {
            mdc.ripple.MDCRipple.attachTo(x[n])
        }

        var icon_buttons = [].map.call(document.querySelectorAll(".mdc-icon-button"), function (el) {
            x = new mdc.ripple.MDCRipple(el)
            x.unbounded = true
            return x;
        });

        for (var n = 0; n < x.length; n++) {
            mdc.ripple.MDCRipple.attachTo(x[n])
        }

        x = $(".mdc-list-item")
        for (var n = 0; n < x.length; n++) {
            mdc.ripple.MDCRipple.attachTo(x[n])
        }
    } catch (e) { console.log(e) }

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

    c = (callback) => {
        return (data) => {
            try {
                // djson = JSON.parse(data)
                if (data.code == 0) {
                    callback(0, data.token, data.nickname)
                } else {
                    callback(data.code)
                }
            } catch (e) {
                console.log("Error while parsing data from the server.")
                callback("Script Error on Client Side")
            }
        }
    }
    d = (callback) => {
        return (failed) => {
            switch (failed.status) {
                case 0:
                    callback(-9999)
                    break
                default:
                    callback(-failed.status - 1000)
            }
        }
    }
    $.post(servaddr, {
        action: "getToken",
        userid: user,
        pwd: pass
    }, c(callback)).fail(d(callback))
}

function sendRegister(email, nickname, user, pass, callback) {

    c = (callback) => {
        return (data) => {
            try {
                // djson = JSON.parse(data)
                if (data.code == 0) {
                    callback(0, data.token, data.nickname)
                } else {
                    callback(data.code)
                }
            } catch (e) {
                console.log("Error while parsing data from the server.")
                callback("Script Error on Client Side")
            }
        }
    }
    d = (callback) => {
        return (failed) => {
            switch (failed.status) {
                case 0:
                    callback(-9999)
                    break
                default:
                    callback(-failed.status - 1000)
            }
        }
    }
    $.post(servaddr, {
        action: "register",
        nickname: nickname,
        email: email,
        userid: user,
        pwd: pass
    }, c(callback)).fail(d(callback))

}

function encryptLogin(user, pass) {
    // [DEV] [TODO]
    return user + pass
}

function verifySession(session, token, callback) {

    c = (callback) => {
        return (data) => {
            try {
                // djson = JSON.parse(data)
                if (data.code == 0 && data.status == true) {
                    callback(true)
                } else {
                    callback(false)
                }
            } catch (e) {
                console.log("Error while parsing data from the server.", e)
                callback(false)
            }
        }
    }
    d = (callback) => {
        return (failed) => {
            callback(false)
        }
    }
    $.post(servaddr, {
        action: "verifySession",
        sessionid: session,
        token: token
    }, c(callback)).fail(d(callback))
    // [DEV] [TODO]
    // document._verifySession_callback(true)
}

function getSession(userid, token, callback) {

    c = (callback) => {
        return (data) => {
            try {
                // djson = JSON.parse(data)
                if (data.code == 0) {
                    callback(data.sessionid)
                } else {
                    callback(false)
                }
            } catch (e) {
                console.log("Error while parsing data from the server.", e)
                callback(false)
            }
        }
    }
    d = (callback) => {
        return (failed) => {
            callback(false)
        }
    }
    $.post(servaddr, {
        action: "getSession",
        userid: userid,
        token: token
    }, c(callback)).fail(d(callback))

    // [DEV] [TODO]
    // document._getSession_callback(session)
}

function getGroups(userid, sessionid, token, callback) {
    commonRequests("getGroups", {}, callback, "groups")
}

function getChats(userid, sessionid, token, callback) {
    commonRequests("getChats", {}, callback, "chats")
}

function getRecommendations(userid, sessionid, token, callback) {
    commonRequests("getRecommendations", {}, callback, "recommendations")
}

function getPublicGroups(search, cat, start, number, timeStart, timeEnd, callback, done) {
    commonRequests("getPublicGroups", {
        search: search,
        category: cat,
        start: start,
        number: number,
        timeStart: timeStart,
        timeEnd: timeEnd
    }, callback, "groups")
}

function getActivities(userid, sessionid, token, callback) {
    commonRequests("getActivities", {}, callback, "activities")
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

function commonRequests(action, requestArgs, callback, returns, auth = true) {
    requestArgs.action = action
    c = (callback) => {
        return (data) => {
            try {
                if (data.code == 0) {
                    if (returns == undefined) {
                        callback(data)
                    } else {
                        try {
                            callback(data[returns])
                        } catch (e) {
                            console.log("Depreciation: commonRequests failed to return: ", e)
                            callback(data)
                        }
                    }
                } else {
                    callback(false)
                }
            } catch (e) {
                console.log("Failed: commonRequests failed to execute: ", e)
                callback(false)
            }
        }
    }
    d = (callback) => {
        return (failed) => {
            callback(false)
        }
    }

    if (auth == true) {
        requestArgs.userid = document.userid
        requestArgs.token = document.token
        requestArgs.sessionid = document.sessionid
    }
    $.post(servaddr, requestArgs, c(callback)).fail(d(callback))
}

function getGroupDetail(groupid, callback) {
    commonRequests("getGroupDetail", { groupid: groupid }, callback)
}


function loadingEffect(l){
    rawhtml="<div id=\"loadingEffect\"><svg class=\"spinner\" style=\"margin-left: auto;margin-right:auto;\" width=\"65px\"height=\"65px\" viewBox=\"0 0 66 66\" xmlns=\"http://www.w3.org/2000/svg\"><circle class=\"circle\" fill=\"none\" stroke-width=\"6\" stroke=\"#673ab7\" stroke-linecap=\"round\"cx=\"33\" cy=\"33\" r=\"30\"></circle></svg></div><style>.material_block {width: 580px;padding: 20px;background-color: #fff;box-shadow: 0 2px 5px rgba(0, 0, 0, .4);margin: auto;}.spinner {-webkit-animation: rotation 1.35s linear infinite;animation: rotation 1.35s linear infinite;}@-webkit-keyframes rotation {0% {-webkit-transform: rotate(0deg);transform: rotate(0deg);}100% {-webkit-transform: rotate(270deg);transform: rotate(270deg);}}@keyframes rotation {0% {-webkit-transform: rotate(0deg);transform: rotate(0deg);}100% {-webkit-transform: rotate(270deg);transform: rotate(270deg);}}.circle {stroke-dasharray: 180;stroke-dashoffset: 0;-webkit-transform-origin: center;-ms-transform-origin: center;transform-origin: center;-webkit-animation: turn 1.35s ease-in-out infinite;animation: turn 1.35s ease-in-out infinite;}@-webkit-keyframes turn {0% {stroke-dashoffset: 180;}50% {stroke-dashoffset: 45;-webkit-transform: rotate(135deg);transform: rotate(135deg);}100% {stroke-dashoffset: 180;-webkit-transform: rotate(450deg);transform: rotate(450deg);}}@keyframes turn {0% {stroke-dashoffset: 180;}50% {stroke-dashoffset: 45;-webkit-transform: rotate(135deg);transform: rotate(135deg);}100% {stroke-dashoffset: 180;-webkit-transform: rotate(450deg);transform: rotate(450deg);}}</style>"
    $(l).html(rawhtml)
}
flushMaterial()