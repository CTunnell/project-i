
$("#searchButton").click(function (event) {

    event.preventDefault();

    var movie = $("#searchform");
    moviename = movie.val();

    $(".reviewcontainer").empty();

    moviereview(moviename);



});


$("#searchomdb").click(function (event) {

    event.preventDefault();

    var movie = $("#searchform");
    moviename = movie.val();

    $(".reviewcontainer").empty();

    getmovie(moviename);





});




// Cors-anywhere.herokuapp.com

jQuery.ajaxPrefilter(function (options) {
    if (options.crossDomain && jQuery.support.cors) {
        options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
    }
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

        
        var reviewDiv = $("<h4>" + "Movie : " + "</h4>")
        var reviewcontainer = $(".reviewcontainer")
        reviewcontainer.append(reviewDiv)

        
        

    });
   

}


// Look up movie review give movie name from form

function moviereview(moviename) {

    var getURL = "https://api.nytimes.com/svc/movies/v2/reviews/search.json?query=" + moviename + "&api-key=te0rQgoM9vfhltspkKfvFU0wZcAzmRL2"


    $.ajax({
        url: getURL,
        method: 'GET'
        }).then(function (response) {
        console.log(response)

       
        // set number of review to five   
        var numberOfReview = 10
        console.log(response.results.length)
        var length = response.results.length;

        // set number of review equal to lenght if there are less than 5 reviews
        if (numberOfReview > length) {
        numberOfReview = length
        }
        console.log(numberOfReview);

        var reviewDiv = $("<h4>" + "Reviews : " + "</h4>")
        var reviewcontainer = $(".reviewcontainer")
        reviewcontainer.append(reviewDiv)


        for (var i = 0; i < numberOfReview; i++) {

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

   });

}

