function login(user, pass) {
    loginform.password.value = ""
    console.log("Login", user, pass)
    // [TODO] Encryption, etc
    sendlogin("<encrypted login>", (stat, token, nickname, userid = user) => {
        console.log("Login stat", stat, "Token", token)
        switch (stat) {
            case 0:
                Success("Welcome back, " + String(nickname))
                loginSuccess(token, userid, nickname)
                break
            case -1:
                Err("Failed to log in. Please check your username and password.")
                break
            case -2:
                Err("Failed to login. Can not connect to the internet.")
                break
            case -99:
                Err("There is a problem on our side causing compatibility issues. Please try again later.")
                break
            case -404:
                Err("Failed to login. Server responded with error code 404 (Not Found)")
                break
            case -500:
                Err("Internal server error. Please try again later.")
                break
            default:
                Err("Unspecific error. Please <a href='login.html'>Refresh</a> and try again. [Code:" + String(stat) + "]")
                break
        }
    })
}

function loginSuccess(token, userid, nickname) {
    // [TODO] Do something with token
    console.log(token)
    setCookie("token", token, 3)
    setCookie("userid", userid, 3)
    setCookie("nickname", nickname, 3)
    $("#loginbtn").text("Redirecting...")
    $("#loginbtn").attr("disabled",true)
    setTimeout(() => {
        top.location="main.html"
    }, 1000);
}

function sendlogin(encryptedLogin, callback) {
    console.log("Encrypted login", encryptedLogin)
    // [TODO] Send encrypted login


    // [DEV] Environment START
    var stat = 0
    var token = "123123123"
    var nickname = "Dev Test Nickname"
    document._callback = callback
    document._callback(stat, token, nickname)
    // [DEV] Environment END

}

function Success(msg) {
    // $('#notification-no-material-banner').slideUp()
    $('#notification-no-material-banner').css("background-color", "#C8E6C9")
    $('#notification-no-material-banner').text(msg) // Used text instead of html to prevent from <script></script> attack.
    $('#notification-no-material-banner').slideDown()
    setTimeout(() => {
        $('#notification-no-material-banner').css("transition", "all ease 0.8s")
    }, 1000)
}

function Err(errmsg) {
    // $('#notification-no-material-banner').slideUp()
    $('#notification-no-material-banner').css("background-color", "#FFCDD2")
    $('#notification-no-material-banner').html(errmsg) // Used html instead of text to enable <a></a>
    $('#notification-no-material-banner').slideDown()
    setTimeout(() => {
        $('#notification-no-material-banner').css("transition", "all ease 0.8s")
    }, 1000)
}

