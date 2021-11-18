window.addEventListener("load", (event)=>{
    console.log("hello from javascript!")
})

// ----- when dropdown option is clicked, boardGame is added to gameShelf -------

// boardgame is the h1 element
const boardGame = document.querySelector('.boardGameTitle')
const gameShelves = document.getElementById('gameShelves').children
const playedStatus = document.getElementById('gameShelvesSelect').children


Array.from(gameShelves).forEach(shelf => {
    // console.log(shelf)
    shelf.addEventListener("change", async (event)=>{
        const gameShelfId = event.target.id  // this gets the checked game (id)
        const boardGameId = boardGame.id // this gets the boardGame id from h1 class
        const checked = event.target.checked // gives true or false if its checked
        console.log('---------- clicked! -----------')
        // fetch request
        // Default options are marked with *
        const res = await fetch(`/boardgames/${boardGameId}/${gameShelfId}/${checked}`, {
            method: 'PUT', // *GET, POST, PUT, DELETE, etc.
            headers: {'Content-Type': 'application/json'}, // 'Content-Type': 'application/x-www-form-urlencoded',
        });
        return res.json(); // parses JSON response into native JavaScript objects
    })
});

Array.from(playedStatus).forEach(shelf => {
    // console.log(shelf)
    shelf.addEventListener("change", async (event)=>{
        const gameShelfId = event.target.value  // this gets the checked game (id)
        const boardGameId = boardGame.id // this gets the boardGame id from h1 class
        const checked = event.target.selected // gives true or false if its checked
        console.log('---------- clicked! -----------')
        console.log(event.target)
        // fetch request
        // Default options are marked with *
        const res = await fetch(`/boardgames/${boardGameId}/${gameShelfId}/${checked}`, {
            method: 'PUT', // *GET, POST, PUT, DELETE, etc.
            headers: {'Content-Type': 'application/json'}, // 'Content-Type': 'application/x-www-form-urlencoded',
        });
        return res.json(); // parses JSON response into native JavaScript objects
    })
});


// ----- when "add game shelf" is clicked, an input box will appear -------
// const addShelfBtn = document.getElementById('addShelfBtn')
// addShelfBtn.addEventListener("click", (event)=>{
//     let inputShelf = document.createElement("input");
//     inputShelf.name = "shelfName";
//     inputShelf.type = 'text'

//     console.log(event.target)

// })

// ----- when "submit game shelf" is clicked, game shelf is added to shelves -------
addShelfBtn = document.getElementById('addShelfBtn')
addShelfBtn.addEventListener("click", async (event)=>{
    // const gameShelfId = event.target.value  // this gets the checked game (id)
    console.log('---------- clicked! -----------')
    console.log(event.target)
    // fetch request
    // Default options are marked with *
    const res = await fetch(`/gameshelves/:newshelf`, {
        method: 'PUT', // *GET, POST, PUT, DELETE, etc.
        headers: {'Content-Type': 'application/json'}, // 'Content-Type': 'application/x-www-form-urlencoded',
    });
    return res.json(); // parses JSON response into native JavaScript objects
})

// ----- when "x" is clicked, the boardgame/list is deleted (with potential alert) -------
