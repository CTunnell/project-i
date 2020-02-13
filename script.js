// Cors-anywhere.herokuapp.com

jQuery.ajaxPrefilter(function (options) {
    if (options.crossDomain && jQuery.support.cors) {
        options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
    }
});


$("#searchomdb").click(function (event) {

    event.preventDefault();

    var movie = $("#searchform");
    moviename = movie.val();

    $(".reviewcontainer").empty();

    getmovie(moviename);


});



// Get movie info from OMDB

function getmovie(moviename) {

    var getURL ="http://www.omdbapi.com/?t="+moviename+"&apikey=5acb189"
    
     
    $.ajax({
        url: getURL,
        method: 'GET'
        }).then(function (response) {
        console.log(response)
        console.log(response.Title)
        console.log(response.Year)
        console.log(response.Plot)
        console.log(response.Ratings[0])
        console.log(response.Ratings[1])
        console.log(response.Ratings[2])
        console.log(response.Poster)

        
        var moviecontainer = $("<h5>" + "Movie : " + "</h5>")
        var reviewcontainer = $(".reviewcontainer")
        reviewcontainer.append(moviecontainer)


          var movieDiv = $("<div>")
          movieDiv.addClass("movie")
          reviewcontainer.append(movieDiv)


        // Display title

        var titleDiv = $("<div>")
        titleDiv.addClass("Title")
        movieDiv.append(titleDiv)
        titleDiv.text(response.Title);

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

        
        
        
        
        var reviewcontainer = $(".reviewcontainer")

        for (var i = 0; i < length; i++) {
            console.log(title)
            
        // Check if aricle year is from the same as movie

            if ( title == response.results[i].display_title) {
            
            var articlecontainer = $("<div>")
            articlecontainer.addClass("article")
            reviewcontainer.append(articlecontainer)

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

