# backend-coding-test
Baclend Coding Test solution for Delta

# TODO
- Responsible for creating a microservice that keeps track of all coins being searched performed by clients
- Return a real-time sorted list of the top most popular coins in the last 24 hours
- A single user doing multiple searches for the same coin should not result in that coin being scored higher
- Keep track of the last 100 coins searched by an user, in a FIFO manner

# Service
- POST Request to insert search into DB with Query Params: User and CryptoName
- GET Request to retrieve top crypto searched in last 24 hours
- GET Request to retrieve last 100 crypto searched by user with Query Params: User
