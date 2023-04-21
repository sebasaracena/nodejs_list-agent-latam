﻿# nodejs_list-agent-latam
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
