$(document).ready(() => {

    // Auto size

    // document.write("<p>Nickname="+getCookie("nickname")+"</p>")
    // document.write("<p>ID="+getCookie("userid")+"</p>")
    // document.write("<p>Token="+getCookie("token")+"</p>")
    // document.close()
    $("#left-container").resizable({
        // ghost: true,
        handles: 'e, w',
        maxWidth: 500,
        minWidth: 200
    });
    $("#left-container").resize(() => {
        setCookie("left", $("#left-container").width())
        $("#right-container").width($(window).width() - $("#left-container").width())
        $("#right-container").css("left", $("#left-container").width())
        $("#wrapper").width($("#left-container").width() - 4)
        _DEV()
    })
    $(window).on('resize', () => {
        $("#right-container").width($(window).width() - $("#left-container").width())
        $("#right-container").css("left", $("#left-container").width())
        $("#wrapper").width($("#left-container").width() - 8)
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
    console.log("Presearch Completed")
}

function insertChats(title, subtitle, redirect="#") {
    try {
        var rawhtml = "<li class=\"mdc-list-item fadeIn\" onclick=\"top.location=\'#redirect\'\"><span class=\"mdc-list-item__text\"><span class=\"mdc-list-item__primary-text\"><insert CHATS-TITLE></insert></span><span class=\"mdc-list-item__secondary-text\"><insert CHATS-SUBTITLE></insert></span></span></li>"
        document.insertPoints.Chats.html(document.insertPoints.Chats.html().replace("fadeIn", "") + rawhtml.replace("#redirect",redirect).replace("<insert CHATS-TITLE></insert>", title).replace("<insert CHATS-SUBTITLE></insert>", subtitle).replace("<script>", ""))
        flushMaterial()
    } catch (e) { console.log(e); return false }
}

function insertGroups(title, subtitle,redirect="#") {
    try {
        var rawhtml = "<li class=\"mdc-list-item fadeIn\" onclick=\"top.location=\'#redirect\'\"><span class=\"mdc-list-item__text\"><span class=\"mdc-list-item__primary-text\"><insert CHATS-TITLE></insert></span><span class=\"mdc-list-item__secondary-text\"><insert CHATS-SUBTITLE></insert></span></span></li>"
        document.insertPoints.Groups.html(document.insertPoints.Groups.html().replace("fadeIn", "") + rawhtml.replace("<insert CHATS-TITLE></insert>", title).replace("<insert CHATS-SUBTITLE></insert>", subtitle).replace("<script>", ""))
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

document.insertPoints = initInsertPoints()

// Dev Start
_DEV = () => {
    $("#inner-right-container").html("<p>Cookie Info</p><p>Userid:" + getCookie("userid") + "</p><p>Nickname:" + getCookie("nickname") + "</p><p>Token:" + getCookie("token") + "</p><p>Left:" + getCookie("left") + "</p>")
}
// Dev End

_DEV()