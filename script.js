// Cors-anywhere.herokuapp.com

jQuery.ajaxPrefilter(function (options) {
    if (options.crossDomain && jQuery.support.cors) {
        options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
    }
});

$(document).ready(function () {

    console.log($);
    // main button
    var searcher = $(".searcher");

    var field = $("#search-input");

    var moviebin = $("#after-press-movie");

    var textinput = $("#text-search")



    //eventlistener used to function with the navbar
    $("#search").on("submit", function (event) {
        event.preventDefault();
        $("main").remove();
        moviename = textinput.val()

        moviebin.empty();
        getmovie(moviename)

        textinput.val("");



    });




    searcher.on("click", function (event) {

        event.preventDefault();
        $("main").remove();


        moviename = field.val();

        moviebin.empty();

        getmovie(moviename);


    });



    // Get movie info from OMDB

    function getmovie(moviename) {

        var getURL = "http://www.omdbapi.com/?t=" + moviename + "&apikey=5acb189"


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

            // add movie poster image
            var posterURL = response.Poster;

            var cardbody = $("<div>");
            cardbody.attr("class", "card");


            var cardeffect = $("<div>");
            cardeffect.attr("class", "card-image waves-effect waves-block waves-light")
            var image = $("<img>");
            image.attr("class", "activator");
            image.attr("src", posterURL);
            image.attr("alt", "broken poster");
            cardeffect.append(image);

            var movietitle = response.Title

            console.log(movietitle)

            var info = $("<div>");
            info.attr("class", "card-content");
            var title = $("<span>");
            title.attr("class", "card-title activator grey-text text-darken-4")
            title.text(movietitle)
            info.append(title);

            // get movie review from NYTime 
            // movieYearreview(movietitle)

              // Get movie from NTY time

    function movieYearreview(movietitle) {

        console.log(movietitle)
        var getURL = "https://api.nytimes.com/svc/movies/v2/reviews/search.json?query=" +movietitle+ "&api-key=te0rQgoM9vfhltspkKfvFU0wZcAzmRL2"


        $.ajax({
            url: getURL,
            method: 'GET'
        }).then(function (response) {
            console.log(response)


            

            console.log(response.results.length)
            var length = response.results.length;


            for (var i = 0; i < length; i++) {
                console.log(movietitle)

                // Check if article title is from the same as the movie

                if (movietitle == response.results[i].display_title) {

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

            var linktext = $("<p>");
            var linkfun = $("<a>");
            linktext.append(linkfun);
            ///for your review link
            linkfun.attr("href", "");
            ///for your movie title
            linkfun.text("Hyperlink");
            info.append(linktext);

            ///for your movie title
            var hiddencard = $("<div>");
            hiddencard.attr("class", "card-reveal");
            var hiddentitle = $("<span>");
            hiddentitle.attr("class", "card-title grey-text text-darken-4");

            hiddentitle.text(movietitle);




            var hiddenicon = $("<i>");
            hiddenicon.attr("class", "material-icons right");
            hiddenicon.text("close");
            hiddentitle.append(hiddenicon);
            hiddencard.append(hiddentitle);


            //  Movie Year 
            var yearDiv = $("<div>")
            yearDiv.addClass("Year")
            yearDiv.text(response.Year);
            hiddencard.append(yearDiv)
            var hiddentext = $("<p>");


            ///for your movie plot or summary
            var moviePlot = response.Plot
            console.log(moviePlot)
            hiddentext.text(moviePlot)
            hiddencard.append(hiddentext)


            // Display Rated

            var ratedDiv = $("<div>")
            ratedDiv.text("Rated : " + response.Rated);
            hiddencard.append(ratedDiv)

            // Generate Critics Ratings

            var arrLength = response.Ratings.length
            console.log(arrLength)
            for (var i = 0; i < arrLength; i++) {

                var ratingDiv = $("<div>")
                ratingDiv.addClass("Rating")

                ratingDiv.text(response.Ratings[i].Source + " : Critics  " + response.Ratings[i].Value);
                hiddencard.append(ratingDiv)

            }




            cardbody.append(cardeffect);
            cardbody.append(info);
            cardbody.append(hiddencard);
            moviebin.append(cardbody);

         


        });


    }

  

});
