// Cors-anywhere.herokuapp.com

jQuery.ajaxPrefilter(function (options) {
    if (options.crossDomain && jQuery.support.cors) {
        options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
    }
});

$(document).ready(function(){

    console.log($);
    // main button
    var searcher= $(".searcher");

    var field= $("#search-input");
    
    var bookbin = $("#after-press-book")

    var moviebin=$("#after-press-movie");

    var textinput =$("#text-search")
    
   
    
    //eventlistener used to function with the navbar
    $("#search").on("submit", function(event){
        event.preventDefault();
        moviename=textinput.val()

        keyword = textinput.val().trim()
        moviebin.empty();
       getmovie(moviename)

        textinput.val("");
        bookbin.empty();
        bookmaker(keyword);
    

    });
    
    
   
    
  searcher.on("click", function (event) {

    event.preventDefault();

    moviename = field.val();
    
    keyword = field.val().trim();

    moviebin.empty();

    
    bookbin.empty();

    bookmaker(keyword);


});



// Get movie info from OMDB

function getmovie(moviename) {

    var getURL ="http://www.omdbapi.com/?t="+moviename+"&apikey=5acb189"
    
     
    $.ajax({
        url: getURL,
        method: 'GET'
        }).then(function (response) {
       /* console.log(response)
        console.log(response.Title)
        console.log(response.Year)
        console.log(response.Plot)
        console.log(response.Ratings[0])
        console.log(response.Ratings[1])
        console.log(response.Ratings[2])
        console.log(response.Poster) */

        
        var moviecontainer = $("<h5>" + "Movie : " + "</h5>")
      
        moviebin.append(moviecontainer)


          var movieDiv = $("<div>")
          movieDiv.addClass("movie")
          moviebin.append(movieDiv)


        // Display title

        var titleDiv = $("<div>")
        titleDiv.addClass("Title")
        movieDiv.append(titleDiv)
        titleDiv.text(response.Title);

        // Display Rated

        var ratedDiv = $("<div>")
        ratedDiv.addClass("Year")
        movieDiv.append(ratedDiv)
        ratedDiv.text("Rated : " +response.Rated);

        // Display year

        var yearDiv = $("<div>")
        yearDiv.addClass("Year")
        movieDiv.append(yearDiv)
        yearDiv.text(response.Year);

        // Display Plot
        var plotDiv = $("<div>")
        plotDiv.addClass("Plot")
        movieDiv.append(plotDiv)
        plotDiv.text("Plot: "+response.Plot);



        // Generate Critics Ratings

        var arrLength = response.Ratings.length
        console.log(arrLength)
        for ( var i=0 ; i < arrLength ; i++) {

        var ratingDiv = $("<div>")
        ratingDiv.addClass("Rating")
        movieDiv.append(ratingDiv)
        ratingDiv.text(response.Ratings[i].Source + " : Critics  " + response.Ratings[i].Value);
       
        }
             
        // add movie poster image
        var posterURL = response.Poster;
        var poster = $("<img>")
        poster.attr("src", posterURL);
        movieDiv.append(poster);

        var title = response.Title
        var year = response.Year
        console.log(title)

        // get movie review from NYTime 
        movieYearreview(title)
        

    });
   

}

// Get movie from NTY time

function movieYearreview(title) {

    console.log(title)
    var getURL = "https://api.nytimes.com/svc/movies/v2/reviews/search.json?query=" + title + "&api-key=te0rQgoM9vfhltspkKfvFU0wZcAzmRL2"


    $.ajax({
        url: getURL,
        method: 'GET'
        }).then(function (response) {
        console.log(response)

       
        // get review date   
        
        console.log(response.results.length)
        var length = response.results.length;

        
        
        
        
      

        for (var i = 0; i < length; i++) {
            console.log(title)
            
        // Check if article title is from the same as the movie

            if ( title == response.results[i].display_title) {
            
            var articlecontainer = $("<div>")
            articlecontainer.addClass("article")
            moviebin.append(articlecontainer)

            var headlineDiv = $("<div>")

            headlineDiv.addClass("headline")
            articlecontainer.append(headlineDiv)

            headlineDiv.text(response.results[i].headline);

            var suggestedDiv = $("<div>")

            suggestedDiv.addClass("suggestedLink")
            articlecontainer.append(suggestedDiv)


            suggestedDiv.text(response.results[i].link.suggested_link_text);

            var urlDiv = $("<div>")

            urlDiv.addClass("url")

            articlecontainer.append(urlDiv)

            urlDiv.append("<a href='" + response.results[i].link.url + "'>" + response.results[i].link.url + "</a>");

            
        }
    }

   });

}

function bookmaker(keyword) {

    var queryURL = "https://api.nytimes.com/svc/books/v3/reviews.json?title=" + keyword + "&api-key=Pj4xmspyjkUbgyf0JQG8gXekbgTLhcAN"
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
            console.log(keyword)
            console.log(response)

            if (response.results.length > 0) {
            var cardbody = $("<div>");
            cardbody.attr("class", "card");


            var cardeffect = $("<div>");
            cardeffect.attr("class", "card-image waves-effect waves-block waves-light")
            /* var image= $("<img>");
             image.attr("class", "activator");
             image.attr("src", "");
             image.attr("alt", "broken image");
             cardeffect.append(image); */

            var info = $("<div>");
            info.attr("class", "card-content");
            var title = $("<span>");
            title.attr("class", "card-title activator grey-text text-darken-4")
            title.text(response.results[0].book_title)
            info.append(title);

            var linktext = $("<p>");
            var linkfun = $("<a>");
            linktext.append(linkfun);
            linkfun.attr("href", response.results[0].url);
            linkfun.text(response.results[0].book_title + " (Review)");
            info.append(linktext);

            var hiddencard = $("<div>");
            hiddencard.attr("class", "card-reveal");
            var hiddentitle = $("<span>");
            hiddentitle.attr("class", "card-title grey-text text-darken-4");
            hiddentitle.text(response.results[0].book_title);
            var hiddenicon = $("<i>");
            hiddenicon.attr("class", "material-icons right");
            hiddenicon.text("close");
            hiddentitle.append(hiddenicon);
            hiddencard.append(hiddentitle);
            var hiddentext = $("<p>");
            hiddentext.text(response.results[0].summary);
            hiddencard.append(hiddentext);

            cardbody.append(cardeffect);
            cardbody.append(info);
            cardbody.append(hiddencard);
            bookbin.append(cardbody); }
            else { console.log("butt")
            var cardbody = $("<div>");
            cardbody.attr("class", "card");


            var cardeffect = $("<div>");
            cardeffect.attr("class", "card-image waves-effect waves-block waves-light")
           

            var info = $("<div>");
            info.attr("class", "card-content");
            var title = $("<span>");
            title.attr("class", "card-title activator grey-text text-darken-4")
            title.text(keyword)
            info.append(title);

            var linktext = $("<p>");
            var linkfun = $("<a>");
            linktext.append(linkfun);
            linkfun.attr("href", " ");
            linkfun.text("No reviews available");
            info.append(linktext);

            var hiddencard = $("<div>");
            hiddencard.attr("class", "card-reveal");
            var hiddentitle = $("<span>");
            hiddentitle.attr("class", "card-title grey-text text-darken-4");
            hiddentitle.text(keyword);
            var hiddenicon = $("<i>");
            hiddenicon.attr("class", "material-icons right");
            hiddenicon.text("close");
            hiddentitle.append(hiddenicon);
            hiddencard.append(hiddentitle);
            var hiddentext = $("<p>");
            hiddentext.text(" ");
            hiddencard.append(hiddentext);

            cardbody.append(cardeffect);
            cardbody.append(info);
            cardbody.append(hiddencard);
            bookbin.append(cardbody);

            }
        
            function dbquery(keyword) {
            var queryURLTwo = "https://en.wikipedia.org/w/api.php?origin=*&action=query&list=search&srlimit=20&srsearch=" + keyword + "&format=json"
                 $.ajax({
                url: queryURLTwo,
                method: "GET"
              })
              .then(function(response) {
                  console.log(response)
                  console.log(response.query.search[0].title)
                  var hiddenLinkURL = "https://en.wikipedia.org/wiki/" + response.query.search[0].title
                 // var bookBR = $("<br>")
                  var hiddenLinkText = $("<p>")
                  var hiddenLink = $("<a>")
                  hiddenLinkText.append(hiddenLink)
                 hiddenLink.attr("href", hiddenLinkURL )
                 hiddenLink.text(keyword + " on Wikipedia")
                //  hiddencard.append(bookBR)
                  hiddencard.append(hiddenLink)
            
            })
        
        }
                dbquery(keyword)
        
        
        });

       

}
})
