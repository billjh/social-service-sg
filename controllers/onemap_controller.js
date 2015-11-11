var request = require('request');

var accessKEY = require('../config').onemap_key;
var searchToken = '';

/* Get a search token */
var getSearchToken = function(callback) {
  if (searchToken)
    return callback(null, searchToken);
  request.get('http://www.onemap.sg/API/services.svc/getToken?accessKEY='+accessKEY, function(err, httpRes, body) {
    token = JSON.parse(body).GetToken[0].NewToken;
    if(!err && token) {
      if (!searchToken)
        searchToken = token;
      console.log('Search token queried. ')
      callback(null, token);
    } else {
      callback('Search token not found. ', null);
    }
  });
}

/*
 * GET address search API endpoint:
 *   address search using OneMap API
 */
exports.getAddressSearch = function(req, res) {
  getSearchToken(function(err, token) {
    if(err) {
      console.log(err);
      return res.json({results: []});
    }
    var results = [];
    request.get('http://www.onemap.sg/API/services.svc/basicSearch?token=' + token +
                '&searchVal=' + req.query.q + '&returnGeom=1&rset=1',
      function(err, httpRes, body) {
        onemapResults = JSON.parse(body).SearchResults;
        for (i in onemapResults) {
          if (onemapResults[i].SEARCHVAL) {
            if (req.query.type == 'search') {
              results.push({
                'title': onemapResults[i].SEARCHVAL,
                'url': '/search?loc=' + onemapResults[i].SEARCHVAL +
                       '&x=' + onemapResults[i].X + '&y=' + onemapResults[i].Y
              });
            }
            if(req.query.type =='publish') {
              results.push({
                'name': onemapResults[i].SEARCHVAL,
                'value': JSON.stringify([Number(onemapResults[i].X), Number(onemapResults[i].Y)])
              });
            }
          }
        }
        res.json({
          success: true,
          results: results});
      });
  });
};
