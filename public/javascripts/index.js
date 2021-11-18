window.addEventListener("load", (event)=>{
    console.log("hello from javascript!")
})

// -------------- Deleting Reviews --------------------
const deleteComments = document.querySelectorAll('.deleteComment')
//boardGameId: grab boardGameId from element on pug templete-- put one on there b/c there is not one
deleteComments.forEach(comment=>{
console.log(comment.parentNode)
const commentId= comment.parentNode.id.split('-')[1];
comment.addEventListener('click', async (e)=>{
console.log(commentId)
// console.log(e.target)
const res = await fetch(`/boardgames/${boardGame.id}`)

//res: make a fetch to path: /boardgames/:boardGameId/reviews/:reviewId method: DELETE

//data: await res.json() messege s or f

// if messege = s
//  select li and remove li from page using
//      note: e.paretNode.remove()
//else
// dont do anything-- hey delete failed
})

})



//example
// const commentButtons = document.querySelectorAll(‘.delete-cmt-btn’)
// // const answerId = document.getElementById(`answer-delete-${answer.id}`)
// for (let i = 0; i < commentButtons.length; i++) {
//     const commentButton = commentButtons[i];
//     commentButton.addEventListener(‘click’, async (e) => {
//         e.preventDefault();
//         const commentId = e.target.id.split(‘-’)[2]
//         const res = await fetch(`/comments/${commentId}`, {
//             method: ‘DELETE’
//         })
//         const data = await res.json()
//         if (data.message === “Success”) {
//             const container = document.querySelector(`#comment-container-${commentId}`)
//             container.remove()
//         }
//     })


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
