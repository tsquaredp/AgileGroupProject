

    function getUrlParameter(){	
        var query = window.location.search;

        //removes ? from query, leaving only id
        if (query.substring(0, 1) == '?') {
                query = query.substring(1);
        }
        return query;
    };