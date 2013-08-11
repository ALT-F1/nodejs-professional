//if you use http://www.mongoqh.com db services 
//list all databases

curl -X GET https://api.mongohq.com/databases?_apikey=<api key>

// get specific database info
curl -X GET https://api.mongohq.com/databases/<database name>?_apikey=<api key>

//get collections from certain database
curl -X GET https://api.mongohq.com/databases/<database name>/collections?_apikey=<api key>