# BigDataP1_WebApp

A simple NodeJS Express App for calling my Rest API.

Exposes 3 of my Azure Function APIs:

1. FetchAndPush - Retrieves data from Twitter for a given twitter id. Note that this returns immediately without waiting for any processing, so task may silently fail in the background
2. GetFollowers - Retrieve followers from the DB for a given twitter id
3. GetMessages - Retrieve Messages from the DB for a given twitter id