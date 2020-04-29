const request = require('request');

var options = {
    // url: 'https://api.lyrics.ovh/v1/kanye west/famous',

    /* This line means that search for the album 'Reputation' and
     * get only the first 15 items from the results returned.
     */
    url: 'https://itunes.apple.com/search?term=reputation&limit=15',
    headers: {
        /* temporary name for our web app */
        'User-Agent': 'ShareMyMuzik/0.0.1 ( https://github.com/csc309-18s )',
        'Content-Type': 'application/json'
    }
};


/*
 * Accept a callback, send a request to retrieve the
 * full collection from 'iTunes Search' API.
 *
 * In this example, 15 items are returned.
 */
function getCollection(callback) {

    request(options, function (err, res, body) {
        if (err) {
            console.log(err);
        } else {
            data = JSON.parse(body);
            callback(data.results); // Access the 'results' field of the
        }                           // returned data.
    });
}

/*
 * Accept a callback, send a request to retrieve the
 * full collection, and sort the collection using the
 * trackNumber.
 */
function getSortedCollection(callback) {

    request(options, function (err, res, body) {
        if (err) {
            console.log(err);
        } else {
            data = JSON.parse(body);
            callback (data.results.sort(function(a, b) {
              num1 = parseInt(a.trackNumber, 10); // Sort the array using trackNumber
              num2 = parseInt(b.trackNumber, 10); // in ascending order.

              return num1 - num2;
            }));
        }
    });
}

// use the following to test the functions
getCollection(function(array){
  console.log("Total items in collection ",array.length);
  console.log("First item in collection ",array[0]);
});

// getSortedCollection(function(array) {
//   console.log("Collection sorted ",array);
// });