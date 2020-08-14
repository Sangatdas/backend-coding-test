CREATE DATABASE searchdb;
USE searchdb;

CREATE TABLE searches (
    userId VARCHAR(255) NOT NULL,
    coinId VARCHAR(255) NOT NULL,
    searched_on DATETIME NOT NULL
);

CREATE OR REPLACE VIEW distinct_search_last_24_hours AS
SELECT DISTINCT userId, coinId
FROM searches
WHERE searched_on >= NOW() - INTERVAL 1 DAY;