document.insertPoints=initInsertPoints()
document.showingSearchResult=true

$("#SRTitle").text("Search Result for \"" + document.searchValue + "\"")
search(document.searchValue, (result) => {
    document.searchLock=false
    for (var x = 0; x < result.length; x++) {
        insertResult(result[x].title, result[x].subtitle, result[x].description, result[x].bottomline, result[x].imgURL, result[x].groupURL)
        console.log(result[x])
    }
    $("#resultnum").text(String(result.length)+" result was found.")
})

function insertResult(title, subtitle, description, bottomline, imgurl, redirect = "#") {
    try {
        console.log('1')
        var rawhtml = "<div class=\"cards\"><div class=\"mdc-card info-card\"><div class=\"mdc-card__primary-action info-card__primary-action\" tabindex=\"0\" onclick=\"top.location='#redirect'\"><div class=\"mdc-card__media mdc-card__media--16-9 info-card__media\"style=\"background-image: url(&quot;$img$&quot;);\"></div><div class=\"info-card__primary\"><h2 class=\"info-card__title mdc-typography mdc-typography--headline6\">$title$</h2><h3 class=\"info-card__subtitle mdc-typography mdc-typography--subtitle2\">$subtitle$</h3></div><div class=\"info-card__secondary mdc-typography mdc-typography--body2\">$description$</div></div><div class=\"mdc-card__actions\"><div class=\"mdc-typography--body\" style=\"width: 100%;padding-right: 15px;text-align: right;\">$bottomline$</div></div></div></div>"
        document.insertPoints.searchResultCards.html(document.insertPoints.searchResultCards.html() + rawhtml.replace("<script>", "</script>").replace("$img$", imgurl).replace("$title$", title).replace("$subtitle$", subtitle).replace("$description$", description).replace("$bottomline$", bottomline).replace("#redirect", redirect))
        flushMaterial()
    } catch (e) { console.log(e); return false }
}