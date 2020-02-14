$(document).ready(function(){

console.log($);
var searcher= $(".searcher");
var field= $("#search-input");
var bookbin= $("#after-press-book");
var moviebin=$("#after-press-movie");

searcher.on("click", function(){
$("main").remove();
});

//eventlistener used to function with the navbar
$("#search").on("submit", function(){
    $("main").remove();
    $("#text-search").val("");
});


});