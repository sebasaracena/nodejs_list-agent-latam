# nodejs_list-agent-latam
The server, once an hour, should connect to the API [nodejsApi](https://hn.algolia.com/api/v1/search_by_date?query=nodejs) which shows
recently posted articles about Node.js on Hacker News. It should insert the data from the
API into a database and also define a REST API  which the client (e.g. Postman) will be used
to retrieve the data.

# Provide a link to try out the API-Rest and solve the issue
## POST Request nodejs_list_hits

The service should return paginated results with a maximum of 5 items and should be able
to be filtered by author, _tags, title.
[https://nodejshits.fly.dev/api/hits/list_hits](https://nodejshits.fly.dev/api/hits/list_hits)  is The request in Postman is of type ***POST***
input parameters
```
{
	"page":1,//you can call without 
      "limit":5,
	"search":{
      "title":"Show HN: CozoDB",
      "author":"pizza",
		  "_tags":["comment"]
	}

}
```
If you want call with out json body the request work it because have a default value for varaible page and limit. 
## DELETE Request delete_nodejs_hit

Also, this should permit the user to remove items and
these ones should not reappear when the app is restarted.
[https://nodejshits.fly.dev/api/hits/delete_hits/<objectID>](https://nodejshits.fly.dev/api/hits/delete_hits/)  is The request in Postman is of type ***DELETE***

## Insert the data with API REST from hn.algolia.com
 
 This method is used for the cron and has been configured to run every hour of the day. In this function, we use the 'nodejs_logs' collection to compare the dates of the records, so that we don't re-insert deleted data into the 'nodejs_lists' collection.
 
The code example for the cron execute method can be found in this link [cron execute method](https://github.com/sebasaracena/nodejs_list-agent-latam/blob/main/src/index.js) on line 27

## POST Request nodejs_logs (Optional)

This Request shows every single log so that you can understand a little bit about the reason why I am using the "nodejs_logs" collection in MongoDB, and get it the algorithms used in the function [serverConectHits](https://github.com/sebasaracena/nodejs_list-agent-latam/blob/main/src/api/nodejs_list/hits.services.js) on line 138 untill 150.

```
{
	"page":1,
      "limit":5,
	"search":{
		"lastid_date": "2023-04-22T03:52:10.000Z",
		"type":"delete"
	}
}

```
If you want call with out json body the request work it because have a default value for varaible page "1" and limit "5". 

# HOW IT WORK
 firts step put in your terminal
 ```
  npm install
 
 ```
next step to transform the [config.js.default](https://github.com/sebasaracena/nodejs_list-agent-latam/tree/main/src/config) file into a js file, is only to remove the ***'.default'*** in the file name

Last Step put in your terminal or use doker this aplication have ***Dockerfile**
 ```
  npm start
 
 ```
 ## Explaining the data bases
 we have two collections in mongoDB one to have the record of the hits [nodejs_lists](https://github.com/sebasaracena/nodejs_list-agent-latam/blob/main/src/models/nodejs_list.model.js) of the REST API and the other as a log [nodejs_logs](https://github.com/sebasaracena/nodejs_list-agent-latam/blob/main/src/models/nodejs_logs.model.js) record for two purposes, history of which element was inserted or deleted in a given process and to compare the last date of the elements. This way, when connecting again with the API, it does not allow to insert again data already deleted and thus not to be comparing by element through a search array which one should be inserted or not again.