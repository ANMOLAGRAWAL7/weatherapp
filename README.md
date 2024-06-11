# weatherapp
WEATHER WEB APPLICATION
# Skills and technologies used: Third-party API integration, caching strategy, environment variable management.
![Screenshot 2024-06-11 230323](https://github.com/ANMOLAGRAWAL7/weatherapp/assets/138976989/a0c99ef1-940f-47d8-a997-c81c555e5db2)
# API for weather Info-fetch: https://www.visualcrossing.com/weather-api
# Adding caching through the use of a quick in-memory storage: REDIS
# Client-side caching in Redis
Client-side caching is a technique used to create high performance services. It exploits the memory available on application servers, servers that are usually distinct computers compared to the database nodes, to store some subset of the database information directly in the application side.
When client-side caching is used, the application will store the reply of popular queries directly inside the application memory, so that it can reuse such replies later, without contacting the database again.
# Usually the two key advantages of client-side caching are:
1.Data is available with a very small latency.
2.The database system receives less queries, allowing it to serve the same dataset with a smaller number of nodes.
