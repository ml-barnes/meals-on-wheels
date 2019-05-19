const fetchHelper = {
  fetch: function(request, options, callback) {
    fetch(request, options)
      .then(this.checkStatus)
      .then(this.parseJSON)
      .then(callback);
  },

  checkStatus: function(response) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    }
    const error = new Error(`HTTP Error ${response.statusText}`);
    error.status = response.statusText;
    error.response = response;
    console.log(error); // eslint-disable-line no-console
    throw error;
  },

  parseJSON: function(response) {
    console.log("Parse");
    return response.json();
  }
};

export default fetchHelper;
