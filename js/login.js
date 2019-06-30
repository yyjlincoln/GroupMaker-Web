// This is js for login PAGE, not the login procedure.

function login(user, pass) {
    $("#loginbtn").text("Loading...")
    $("#loginbtn").attr("disabled", true)
    loginform.password.value = ""
    if (user == "" || pass == "") {
        Err('User name / password can not be blank.')
        $("#loginbtn").text("Login")
        $("#loginbtn").attr("disabled", false)
        return
    }
    console.log("Login", user, pass)
    // [TODO] Encryption, etc
    sendlogin(user, pass, (stat, token, nickname, icon, imgURL, imgType, userid = user) => {
        console.log("Login stat", stat, "Token", token)
        switch (stat) {
            case 0:
                Success("Welcome back, " + String(nickname))
                loginSuccess(token, userid, nickname, icon, imgURL, imgType)
                break
            case -103:
                Err("Failed to log in. Please check your username and password.")
                break
            case -100:
                Err("Failed to login. Invalid User ID.")
                break
            case -9:
                Err("Internal server error. Please try again later.")
                break
            // 4 digits for Internet related
            case -1404:
                Err("Failed to login. Server responded with error code 404 (Not Found)")
                break
            case -1500:
                Err("Internal server error. Please try again later.")
                break
            case -9999:
                Err("Internet connection error. Please check your internet connection and try again.")
                break
            default:
                Err("Unspecific error. Please <a href='login.html'>Refresh</a> and try again. [Code:" + String(stat) + "]")
                break
        }
        $("#loginbtn").text("Login")
        $("#loginbtn").attr("disabled", false)
    })
}

function loginSuccess(token, userid, nickname,icon,imgURL,imgType) {
    // [TODO] Do something with token
    console.log(token)
    setCookie("token", token, 3)
    setCookie("userid", userid, 3)
    setCookie("nickname", nickname, 3)
    setCookie("icon",icon,3)
    setCookie("imgURL",imgURL,3)
    setCookie("imgType",imgType,3)
    if (getCookie("fullscreen") == "") {
        setCookie("fullscreen", "false", 3)
    }
    $("#loginbtn").text("Redirecting...")
    $("#loginbtn").attr("disabled", true)
    setTimeout(() => {
        top.location = "./"
    }, 1000);
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

function switchToRegister() {
    $("#registerField").slideDown()
    $("#loginform").attr("onsubmit", "try{register(loginform.email.value,loginform.nickname.value,loginform.username.value,loginform.password.value)}catch(e){console.log(e)}finally{return false}")
    $("#loginbtn").text("Sign Up")
    $("#signupText").html("Already have an account? <a id=\"signupLink\" style=\"cursor: pointer;text-decoration: none;font-style: italic;font-weight: bold;\" onclick=\"switchToLogin();\">Sign In.</a>")
}

function switchToLogin() {
    $("#registerField").slideUp()
    $("#loginform").attr("onsubmit", "try{login(loginform.username.value,loginform.password.value)}catch(e){console.log(e)}finally{return false}")
    $("#loginbtn").text("Login")
    $("#signupText").html("Don't have an account? <a id=\"signupLink\" style=\"cursor: pointer;text-decoration: none;font-style: italic;font-weight: bold;\" onclick=\"switchToRegister();\">Sign Up.</a>")
}

function register(email, nickname, user, pass) {
    sendRegister(email, nickname, user, pass, (stat, token, nickname, icon, imgURL, imgType, userid = user) => {
        switch (stat) {
            case 0:
                Success("Welcome to PaceMaker, " + String(nickname))
                loginSuccess(token, userid, nickname, icon, imgURL, imgType)
                break
            case -103:
                Err("Failed to register. Please check your username and password.")
                break
            case -100:
                Err("Failed to register. Username already taken.")
                break
            case -9:
                Err("Internal server error. Please try again later.")
                break
            // 4 digits for Internet related
            case -1404:
                Err("Failed to login. Server responded with error code 404 (Not Found)")
                break
            case -1500:
                Err("Internal server error. Please try again later.")
                break
            case -9999:
                Err("Internet connection error. Please check your internet connection and try again.")
                break
            default:
                Err("Unspecific error. Please <a href='login.html#reg'>Refresh</a> and try again. [Code:" + String(stat) + "]")
                break
        }
        $("#loginbtn").text("Sign Up")
        $("#loginbtn").attr("disabled", false)
    })
}

if (top.location.hash == "#reg") {
    switchToRegister()
}
