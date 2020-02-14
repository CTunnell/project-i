$(document).ready(function(){

console.log($);
var searcher= $(".searcher");
var field= $("#search-input");
var bookbin= $("#after-press-book");
var moviebin=$("#after-press-movie");

searcher.on("click", function(){
$("main").remove();
bookmaker();
moviemaker();
});

//eventlistener used to function with the navbar
$("#search").on("submit", function(){
    event.preventDefault();
    $("main").remove();
    bookmaker();
    moviemaker();
    $("#text-search").val("");
});

//rough shot code meant to demenstrate how to create the needed card containers
function bookmaker(){
/// only focus on the indented code
    var cardbody= $("<div>");
    cardbody.attr("class", "card");
    

    var cardeffect= $("<div>");
    cardeffect.attr("class", "card-image waves-effect waves-block waves-light")
    var image= $("<img>");
    image.attr("class", "activator");
/// for your movie or book image
        image.attr("src", "");
    image.attr("alt", "broken image");
    cardeffect.append(image);

    var info= $("<div>");
    info.attr("class", "card-content");
    var title= $("<span>");
    title.attr("class", "card-title activator grey-text text-darken-4")
/// for your book or movie title 
        title.text("Card Title")
    info.append(title);

    var linktext= $("<p>");
    var linkfun= $("<a>");
    linktext.append(linkfun);
/// for your book or movie review
        linkfun.attr("href", "");
/// for your book or movie title
        linkfun.text("Hyperlink");
    info.append(linktext);

    var hiddencard= $("<div>");
    hiddencard.attr("class", "card-reveal");
    var hiddentitle= $("<span>");
    hiddentitle.attr("class", "card-title grey-text text-darken-4");
/// for you book or movie title 
        hiddentitle.text("Card Title");
    var hiddenicon= $("<i>");
    hiddenicon.attr("class", "material-icons right");
    hiddenicon.text("close");
    hiddentitle.append(hiddenicon);
    hiddencard.append(hiddentitle);
    var hiddentext= $("<p>");
/// for your book or movie plot or summary
    hiddentext.text("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.");
    hiddencard.append(hiddentext);
    
    cardbody.append(cardeffect);
    cardbody.append(info);
    cardbody.append(hiddencard);
    bookbin.append(cardbody);
}

function moviemaker(){
    var cardbody= $("<div>");
    cardbody.attr("class", "card");
    

    var cardeffect= $("<div>");
    cardeffect.attr("class", "card-image waves-effect waves-block waves-light")
    var image= $("<img>");
    image.attr("class", "activator");
    image.attr("src", "");
    image.attr("alt", "broken poster");
    cardeffect.append(image);

    var info= $("<div>");
    info.attr("class", "card-content");
    var title= $("<span>");
    title.attr("class", "card-title activator grey-text text-darken-4")
    title.text("Card Title")
    info.append(title);

    var linktext= $("<p>");
    var linkfun= $("<a>");
    linktext.append(linkfun);
    linkfun.attr("href", "");
    linkfun.text("Hyperlink");
    info.append(linktext);

    var hiddencard= $("<div>");
    hiddencard.attr("class", "card-reveal");
    var hiddentitle= $("<span>");
    hiddentitle.attr("class", "card-title grey-text text-darken-4");
    hiddentitle.text("Card Title");
    var hiddenicon= $("<i>");
    hiddenicon.attr("class", "material-icons right");
    hiddenicon.text("close");
    hiddentitle.append(hiddenicon);
    hiddencard.append(hiddentitle);
    var hiddentext= $("<p>");
    hiddentext.text("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.");
    hiddencard.append(hiddentext);
    
    cardbody.append(cardeffect);
    cardbody.append(info);
    cardbody.append(hiddencard);
    moviebin.append(cardbody);
}

});