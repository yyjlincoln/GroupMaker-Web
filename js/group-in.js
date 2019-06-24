d=document.rightPageResources
document.insertPoints=initInsertPoints()

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
            $("#loadtext").text("Group Info "+d.groupid+" "+d.title+" "+d.subtitle)
        }
    })
}