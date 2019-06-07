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

        var icon_buttons=[].map.call(document.querySelectorAll(".mdc-icon-button"), function(el) {
            x=new mdc.ripple.MDCRipple(el)
            x.unbounded=true
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
}

function sendlogin(user, pass, callback) {
    console.log("Login", user, pass)
    encrypted = encryptLogin(user, pass)
    // [TODO] Send encrypted login


    // [DEV] Environment START
    var stat = 0
    var token = "123123123"
    var nickname = "Dev Test Nickname"
    document._callback = callback
    document._callback(stat, token, nickname)
    // [DEV] Environment END
}

function encryptLogin(user, pass) {
    // [DEV] [TODO]
    return user + pass
}

function verifySession(session, token, callback) {
    document._verifySession_callback = callback
    // [DEV] [TODO]
    document._verifySession_callback(true)
}

function getSession(userid, token, callback) {
    session = "sessionid"
    document._getSession_callback = callback
    // [DEV] [TODO]
    document._getSession_callback(session)
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