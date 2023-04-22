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
	"page":1,
	"search":{
      "title":"Show HN: CozoDB",
      "author":"pizza",
		  "_tags":["comment"]
	}

}
```
## DELETE Request delete_nodejs_hit

Also, this should permit the user to remove items and
these ones should not reappear when the app is restarted.
[https://nodejshits.fly.dev/api/hits/delete_hits/<objectID>](https://nodejshits.fly.dev/api/hits/delete_hits/)  is The request in Postman is of type ***DELETE***

## Insert the data with API REST from hn.algolia.com
 
 This method is used for the cron and has been configured to run every hour of the day. In this function, we use the 'nodejs_logs' collection to compare the dates of the records, so that we don't re-insert deleted data into the 'nodejs_lists' collection.
 
The code example for the cron execute method can be found in this link [cron execute method](https://github.com/sebasaracena/nodejs_list-agent-latam/blob/main/src/index.js) on line 27

# HOW IT WORK
 firts step put in your terminal
 ```
  npm install
 
 ```
next step to transform the [config.js.default](https://github.com/sebasaracena/nodejs_list-agent-latam/tree/main/src/config) file into a js file, is only to remove the *** '.default' *** in the file name


