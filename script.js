$(document).ready(function(){

console.log($);
var searcher= $(".searcher");
var field= $("#search-input");
var bookbin= $("#after-press-book");
var moviebin=$("#after-press-movie");

//eventlistener used to function with the front page search bar
searcher.on("click", function(){
event.preventDefault();
$("main").remove();

});

//eventlistener used to function with the navbar
$("#search").on("submit", function(){
    event.preventDefault();
    $("main").remove();

    $("#text-search").val("");
});

});