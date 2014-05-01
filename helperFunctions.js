Parse.initialize("QcwXhisuq1pu4BqEo7PJ2mhqNb60zxTirYIhuUYq", "4k6woAZq5BaTmLFMNIv7dL4X2SshOkW5Hy4sRnmL");

    function getUrlParameter(){	
        var query = window.location.search;

        //removes ? from query, leaving only id
        if (query.substring(0, 1) == '?') {
                query = query.substring(1);
        }
        return query;
    };