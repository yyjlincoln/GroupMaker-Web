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
        $("#wrapper").width($("#left-container").width()-4)
    })
    $(window).on('resize', ()=>{
        $("#right-container").width($(window).width() - $("#left-container").width())
        $("#right-container").css("left", $("#left-container").width())
        $("#wrapper").width($("#left-container").width()-8)
    })
    var x = getCookie("left")
    try {
        if (x != "" && Number(x) <= 400 && Number(x) >= 200) {
            $("#left-container").css("width", x + "px")
            $("#right-container").width($(window).width() - $("#left-container").width())
            $("#right-container").css("left", $("#left-container").width())
            $("#wrapper").width($("#left-container").width()-4)
        }
    } catch (error) {

    }

})

function search(searchValue,callback=null){
    if(callback==null){
        callback=(searchValue,result)=>{
            // Search Result Update
        }
    }
    var result="<dev> Search result of: "+searchValue
    callback(searchValue,result)
}

function presearch(searchValue){
    console.log("Presearch Started")
    search(searchValue,(searchv,result)=>{
        console.log("Presearch:",searchv,result)
    })
    console.log("Presearch Completed")
}