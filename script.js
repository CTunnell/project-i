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

    var textinput = $("#text-search")

    var bookbin = $("#after-press-book")

    var moviebin = $("#after-press-movie");

    //eventlistener used to function with the navbar
    $("#search").on("submit", function (event) {
        event.preventDefault();
        moviename = textinput.val()

        keyword = textinput.val().trim()

        moviebin.empty();
        getmovie(moviename)

        bookbin.empty();

        bookmaker(keyword);


        textinput.val("");
    });




    searcher.on("click", function (event) {

        event.preventDefault();

        moviename = field.val();

        keyword = field.val().trim();

        moviebin.empty()

        getmovie(moviename);

        bookbin.empty();

        bookmaker(keyword);

    });



    // Get movie info from OMDB

    function getmovie(moviename) {

        var getURL = "http://www.omdbapi.com/?t=" + moviename + "&apikey=5acb189"


        $.ajax({
            url: getURL,
            method: 'GET'
        }).then(function (response) {

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
            var reviewURL = "https://api.nytimes.com/svc/movies/v2/reviews/search.json?query=" + movietitle + "&api-key=te0rQgoM9vfhltspkKfvFU0wZcAzmRL2"

            // Get movie from NTY time
            $.ajax({
                url: reviewURL,
                method: 'GET'
            }).then(function (response) {
                console.log(response)




                console.log(response.results.length)
                var length = response.results.length;


                for (var i = 0; i < length; i++) {
                    console.log(movietitle)

                    // Check if article title is from the same as the movie

                    if (movietitle == response.results[i].display_title) {



                        var linktext = $("<p>");
                        var linkfun = $("<a>");
                        linktext.append(linkfun);
                        ///for your review link
                        console.log(linkfun)
                        console.log(response.results[i].link.url)
                        linkfun.attr("href", response.results[i].link.url);
                        ///for your movie title
                        linkfun.text("Review");
                        info.append(linktext);


                    }
                }

            });



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
                    bookbin.append(cardbody);
                }
                else {
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
                        .then(function (response) {
                            console.log(response)
                            console.log(response.query.search[0].title)
                            var hiddenLinkURL = "https://en.wikipedia.org/wiki/" + response.query.search[0].title
                            // var bookBR = $("<br>")
                            var hiddenLinkText = $("<p>")
                            var hiddenLink = $("<a>")
                            hiddenLinkText.append(hiddenLink)
                            hiddenLink.attr("href", hiddenLinkURL)
                            hiddenLink.text(keyword + " on Wikipedia")
                            //  hiddencard.append(bookBR)
                            hiddencard.append(hiddenLink)

                        })

                }
                dbquery(keyword)


            });



    }
})

