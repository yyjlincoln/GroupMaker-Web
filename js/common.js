function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}

function flushMaterial() {
    // Apply style for .mdc-text-field
    x = $('.mdc-text-field')
    for (var n = 0; n < x.length; n++) {
        mdc.textField.MDCTextField.attachTo(x[n]);
    }

    // Apply style for .mdc-button
    x = $('.mdc-button')
    for (var n = 0; n < x.length; n++) {
        mdc.ripple.MDCRipple.attachTo(x[n])
    }


    const iconButton = new mdc.ripple.MDCRipple($('.mdc-icon-button')[0])
    iconButton.unbounded=true;
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

function verifySession(session,token,callback){
    document._verifySession_callback=callback
    // [DEV] [TODO]
    document._verifySession_callback(true)
}

function getSession(userid,token,callback){
    session="sessionid"
    document._getSession_callback=callback
    // [DEV] [TODO]
    document._getSession_callback(session)
}

flushMaterial()