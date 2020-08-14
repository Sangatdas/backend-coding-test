# backend-coding-test
Baclend Coding Test solution for Delta

# TO-DO
- Responsible for creating a microservice that keeps track of all coins being searched performed by clients
- Return a real-time sorted list of the top most popular coins in the last 24 hours
- A single user doing multiple searches for the same coin should not result in that coin being scored higher
- Keep track of the last 100 coins searched by an user, in a FIFO manner

# Approach
- Creating 1 endpoint to handle all the above scenarios. (http://localhost:8080/api/v1/search)
- Have a backend service to handle POST and GET requests to this API endpoint.
- Have backend logic to handle GET requests according to input parameters supplied.
- Using MySQL store and retrieve data
- Dockerizing the application

# Alternative Approaches
- Create 3 separate endpoints for each of the given scenarios. Since the application's overall complexity was to be kept simple, didn't need to have 3 endpoints.
- Using Redis instead of MySQL. Even though Redis is faster than MySQL, however, Redis stores data in-memory which can lead to loss of data if system crashes and also consumes valuable RAM resource. Redis is very useful if we want to cache some of the data.
- When it comes to caching, Redis is the best choice. But implementation of Redis is quite complex if you're going for a cluster based architecture.

# Service
- POST Request to insert search query into MySQL
```
# Sample Request
http://localhost:8080/api/v1/search
JSON Request Body:
{
	"userId": 14846130,
	"coinId": 12356812
}

```
- GET Request to retrieve top crypto searched in last 24 hours:
```
# Sample Request
http://localhost:8080/api/v1/search?limit=10

Query Params:
limit: 10
```

- GET Request to retrieve last 100 crypto searched by user:
```
# Sample Request
http://localhost:8080/api/v1/search?limit=100

Header Params:
userId: 14846132

Query Params:
limit: 100
```

# Further Enhancements
This section presents my views on some enhancements that can be done.
- By saving each search query in a MySQL database, we can have triggers to detect unusual activity for a particular user.
- Using Passport middleware to implement authorization mechanism for endpoint.
- Enabling casual search by a non-registered user by saving device information instead of username in the database.
- Cache data storage using Redis to store the most searched crypto currency information.
