api = function() {

    function validateResponse(res) {
        if (res.status == 200 || res.status == 201) {
            return res.json();
        } if (res.status == 204) {
            return;
        } else {
            throw res.status;
        }
    }

    async function _fetchJSON(method, url, body, headers) {

        function addHeaders(headers) {
            let newHeaders = {...headers};
            newHeaders['Accept'] = 'application/json';
            if (method == 'POST' || method == 'PUT' || method == 'PATCH')
              newHeaders['Content-Type'] = 'application/json';
            return newHeaders;
          }

        if (method === 'POST' || method == 'PUT' || method == 'PATCH') {
            body = JSON.stringify(body);
        }

        const res = await fetch(url, { method, headers: addHeaders(headers), body });
        return validateResponse(res);

    }

    async function _fetchFORM(method, url, body, headers) {

        function addHeaders(headers) {
            let newHeaders = {...headers};
            newHeaders['Accept'] = 'application/json';
            return newHeaders;
          }

        const res = await fetch(url, { method, headers: addHeaders(headers), body });
        return validateResponse(res);

    }

    function save_results(data) {
        return _fetchJSON("POST", "/save", data)
    }

    return {
        save_results
    }

}();