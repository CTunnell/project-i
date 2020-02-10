
    // var getURL ="https://www.omdbapi.com/?apikey=5acb189&s=batman"


   // Cors-anywhere.herokuapp.com

    jQuery.ajaxPrefilter(function(options) {
        if (options.crossDomain && jQuery.support.cors) {
            options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
        }
    });

    
    // var getURL ="https://www.goodreads.com/search.xml?key=MhYkPc3CNy5bvCefYOPkA&q=lordoftheflies"
    // var getURL="https://www.goodreads.com/search.xml&key=MhYkPc3CNy5bvCefYOPkA&q=Ender%27s+Game"

    var getURL="https://api.nytimes.com/svc/movies/v2/reviews/search.json?query=batman&api-key=te0rQgoM9vfhltspkKfvFU0wZcAzmRL2"

    // var getURL="https://www.googleapis.com/youtube/v3/videos?id=7lCDEYXw3mM&key=AIzaSyAqjuuGWZi_vl-ABKvzsasDkzTMbT3Rrds&part=snippet,contentDetails,statistics,status"
    
    $.ajax({
        url: getURL,
        method:'GET'
        }).then(function (response) {
        console.log(response)
        console.log(response.results[0].link.url)
        console.log(response.results[0].link.suggested_link_text)
        console.log(response.results[0].headline)
        
        });