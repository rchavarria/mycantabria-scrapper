# mycantabria-scrapper

A scrapper for mycantabria.com

# TODO list

- take a look to the [Q](https://github.com/kriskowal/q) library for javascript promises.
It seems to be one of the best promises libraries for node and using Q.defer() seems to
be the right way to handle our case asynchronously.
x pipe the `request` result to be able to return data from the scrapped web

# Install

`npm install`

# Build with gulp

`gulp`

# Run

`node dist/assset/js/scrapper.min.js` 

This will change soon to a more friendly way of running, such as `./scrapper`
that will run the right node.js script.
