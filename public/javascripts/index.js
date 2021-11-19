window.addEventListener("DOMContentLoaded", (event)=>{
    console.log("hello from javascript!")

// // -------------- Deleting Reviews --------------------
// const deleteComments = document.querySelectorAll('.deleteComment')
// //boardGameId: grab boardGameId from element on pug templete-- put one on there b/c there is not one

// deleteComments.forEach(comment=>{
// // console.log(comment.parentNode)
// const commentId= comment.parentNode.id.split('-')[3];
// const boardGameId= comment.parentNode.id.split('-')[1];
// comment.addEventListener('click', async (e)=>{

// // console.log(e.target)
// const res = await fetch(`/boardgames/${boardGameId}/reviews/${commentId}`, {
//     headers: {
//         'Content-Type': 'application/json'
//     },
//     method:'DELETE'
// })
// const data = await res.json()
//         if (data.message == 'Success') {
//             const parent= comment.parentNode
//             parent.remove()
//         }

// })

// })

// // ----- when dropdown option is clicked, boardGame is added to gameShelf -------

// // boardgame is the h1 element
// const boardGame = document.querySelector('.boardGameTitle')
// const gameShelves = document.getElementById('gameShelves').children
// const playedStatus = document.getElementById('gameShelvesSelect')


// Array.from(gameShelves).forEach(shelf => {
//     // console.log(shelf)
//     shelf.addEventListener("change", async (event)=>{
//         const gameShelfId = event.target.id  // this gets the checked game (id)
//         const boardGameId = boardGame.id // this gets the boardGame id from h1 class
//         const checked = event.target.checked // gives true or false if its checked
//         console.log('---------- clicked! -----------')
//         // fetch request
//         // Default options are marked with *
//         const res = await fetch(`/boardgames/${boardGameId}/${gameShelfId}/${checked}`, {
//             method: 'PUT', // *GET, POST, PUT, DELETE, etc.
//             headers: {'Content-Type': 'application/json'}, // 'Content-Type': 'application/x-www-form-urlencoded',
//         });
//         return res.json(); // parses JSON response into native JavaScript objects
//     })
// });


// playedStatus.addEventListener("change", async (event)=>{
//     const gameShelfId = event.target.value  // this gets the checked game (id)
//     const boardGameId = boardGame.id // this gets the boardGame id from h1 class
//     console.log('board game Id ====', boardGameId)
//     const checked = event.target.selected // gives true or false if its checked
//     console.log('---------- clicked! -----------')
//     console.log(event.target.value)
//     // fetch request
//     // Default options are marked with *
//     const res = await fetch(`/boardgames/${boardGameId}/${gameShelfId}/${checked}`, {
//         method: 'PUT', // *GET, POST, PUT, DELETE, etc.
//         headers: {'Content-Type': 'application/json'}, // 'Content-Type': 'application/x-www-form-urlencoded',
//     });
//     return res.json(); // parses JSON response into native JavaScript objects
// })


// ----- when "add game shelf" is clicked, an input box will appear -------
    const addShelfBtn = document.getElementById('addShelfBtn');
    const createAddShelf = document.getElementById("createAddShelf");

    addShelfBtn.addEventListener("click", (event) => {
        createAddShelf.removeChild(addShelfBtn)

        const inputShelf = document.createElement("input");
        inputShelf.name = "shelfInput";
        inputShelf.type = 'text';
        
        const addShelf = document.createElement("button");
        addShelf.innerText = "Add a Shelf";
        addShelf.type = "submit";
        
        createAddShelf.appendChild(inputShelf);
        createAddShelf.appendChild(addShelf);

        const createHtmlShelf = (shelfName, shelfId) => {
            const li = document.createElement("li");
            const a = document.createElement("a");
            a.setAttribute("href", `/gameshelves/${shelfId}`);
            a.innerText = shelfName;
            li.appendChild(a);
            return li;
        }

        const appendNewShelf = htmlshelf => {
            const shelfList = document.getElementById("shelfList");
            shelfList.appendChild(htmlshelf);
        }

        const revertHtml = () => {
            createAddShelf.removeChild(inputShelf)
            createAddShelf.removeChild(addShelf)
            createAddShelf.appendChild(addShelfBtn)
        }

        addShelf.addEventListener("click", async(e) => {
            let result
            await fetch(`/gameshelves/${inputShelf.value}`, {
                method: 'PUT', // *GET, POST, PUT, DELETE, etc.
                headers: {'Content-Type': 'application/json'}, // 'Content-Type': 'application/x-www-form-urlencoded',
            }).then( async(response) => result = await response.json());
            console.log("result =", result.newShelfId);
            const shelfId = result.newShelfId;
            if (Number(shelfId)) {
                const htmlShelf = createHtmlShelf(inputShelf.value, shelfId);
                appendNewShelf(htmlShelf);
                revertHtml();
            }
        })
    })
})
