const fetchHelper = {
  fetch: function(request, options, callback) {
    options["headers"] = {
      ...options["headers"],
      Authorization: window.localStorage.token
    };
    console.log(options);
    fetch(request, options)
      .then(this.checkStatus)
      .then(this.parseJSON)
      .then(callback)
      .catch(error => {
        callback(error);
      });
  },

  checkStatus: function (response) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    }
    const error = new Error(`HTTP Error ${response.statusText}`);
    error.status = response.statusText;
    error.code = response.status;
    error.response = response;
    if (error.code === 401) {
      window.location.replace("/");
    } // eslint-disable-line no-console
    throw error;
  },

  parseJSON: function(response) {
    return response.json();
  }
};

export default fetchHelper;
