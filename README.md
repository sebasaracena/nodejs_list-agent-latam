﻿# nodejs_list-agent-latam
The server, once an hour, should connect to the API [nodejsApi](https://hn.algolia.com/api/v1/search_by_date?query=nodejs) which shows
recently posted articles about Node.js on Hacker News. It should insert the data from the
API into a database and also define a REST API  which the client (e.g. Postman) will be used
to retrieve the data.
