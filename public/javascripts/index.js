window.addEventListener("load", (event)=>{
    console.log("hello from javascript!")
})

// ----- when dropdown option is clicked, boardGame is added to gameShelf -------

const gameShelves = document.getElementById('gameShelves').children

// boardgame is the h1 element
const boardGame = document.querySelector('.boardGameTitle')

Array.from(gameShelves).forEach(shelf => {
    // console.log(shelf)
    shelf.addEventListener("change", (event)=>{
        const gameShelfId = event.target.id  // this gets the checked game (id)
        const boardGameId = boardGame.id // this gets the boardGame id from h1 class
        const checked = event.target.checked // gives true or false if its checked
        
    })
});


// ----- when "add game shelf" is clicked, an input box will appear -------
// ----- when "submit game shelf" is clicked, game shelf is added to shelves -------
// ----- when "x" is clicked, the boardgame/list is deleted (with potential alert) -------
