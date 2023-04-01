// When testing locally, switch the url to the local server.
// TODO: MAKE SURE TO SWITCH BACK TO THE HEROKU SERVER BEFORE COMMITTING
// let url = 'http://localhost:3001'
let url = 'https://gridlocke.herokuapp.com'

const state = {
    // hand property is used in Gridslot and Handslot to pass card information to the server and draw cards. (From what I can gather)
    hand: new Map(),
    // serverUrl contains the domain name of the server.
    serverUrl: url
}

export default state;
