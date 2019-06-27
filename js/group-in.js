d=document.rightPageResources
document.insertPoints=initInsertPoints()
showNavBackground(false,false)

loadingEffect("#loadtext")
if(document.rightPageResources.length<=1){
    $("#load").css("display","flex")
    $("#loadtext").text("Group name is not defined. Please check the URL.")
} else {
    getGroupDetail(document.rightPageResources[document.rightPageResources.length-1],(d)=>{
        if(d==false){
            $("#load").css("display","flex")
            $("#loadtext").text("Unable to load group detail. [Group ID = "+document.rightPageResources[document.rightPageResources.length-1]+"]")
        } else {
            // [TODO]
            console.log(d)
            $("#load").hide()
            $("#title").text(d.title)
            $("#subtitle").text(d.subtitle)
            $("#bkg").css("background-image","url(\""+d.img+"\")")
            loadGroupMembers(d.participants)
            // $("#loadtext").text("Group Info "+d.groupid+" "+d.title+" "+d.subtitle)
        }
    })
}

function loadGroupMembers(members){
    console.log(members)
}