d=document.rightPageResources
document.insertPoints=initInsertPoints()

loadingEffect("#loadtext")
if(document.rightPageResources.length<=1){
    $("#load").css("display","flex")
    $("#loadtext").text("Chat name is not defined. Please check the URL.")
} else {
    getChatDetail(document.rightPageResources[document.rightPageResources.length-1],(d)=>{
        if(d==false){
            $("#load").css("display","flex")
            $("#loadtext").text("Unable to load chat detail. [Chat ID = "+document.rightPageResources[document.rightPageResources.length-1]+"]")
        } else {
            // [TODO]
            $("#loadtext").text("Chat Info "+d.chatID+" "+d.title+" "+d.subtitle)
        }
    })
}