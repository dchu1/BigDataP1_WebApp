var request = require('request-promise');

class twitterDataDAO {
    constructor(host, apiEndpoint, functionKey) {
        this.host = host
        this.apiEndpoint = apiEndpoint
        this.functionKey = functionKey
    }

    // Retrieve Messages from my REST api for a given uid
    async getMessages(uid) {
      const uri = this.host + '/' + this.apiEndpoint + '/user/' + uid + '/messages' + '?code=' + encodeURIComponent(this.functionKey)
      console.log('Sending request to: ' + uri)
      try{
        return await request(uri)
      } catch(err) {
        console.error(err)
        throw err
      }
    }

    // Retrieve Followers from my REST api for a given uid
    async getFollowers(uid) {
      const uri = this.host + '/' + this.apiEndpoint + '/user/' + uid + '/followers' + '?code=' + encodeURIComponent(this.functionKey)
      console.log('Sending request to: ' + uri)
      try{
        return await request(uri)
      } catch(err) {
        console.error(err)
        throw err
      }
    }

    // Call my FetchPush API to get data for a given uid
    async addData(uid, query) {
      let qs = '?code=' + encodeURIComponent(this.functionKey)
      if(Object.keys(query).length > 0)
        qs += "&" + buildQuery(query)
      const uri = this.host + '/' + this.apiEndpoint + '/internal/fetchpush/' + uid + qs
      console.log('Sending request to: ' + uri)
      try{
        return await request(uri)
      } catch(err) {
        console.error(err)
        throw err
      }
    }
}

// helper function to build query string. Can be replaced with nodejs querystring class.
function buildQuery (data) {

  // If the data is already a string, return it as-is
  if (typeof (data) === 'string') return data;

  // Create a query array to hold the key/value pairs
  let query = [];

  // Loop through the data object
  for (var key in data) {
    if (data.hasOwnProperty(key)) {

      // Encode each key and value, concatenate them into a string, and push them to the array
      query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
    }
  }

  // Join each item in the array with a `&` and return the resulting string
  return query.join('&');

}

module.exports = twitterDataDAO