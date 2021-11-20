window.addEventListener("load", (event) => {

    // ----- when dropdown option is clicked, boardGame is added to gameShelf -------

    // boardgame is the h1 element

    const boardGame = document.querySelector(".boardGameTitle");
    const gameShelves = document.getElementById("gameShelves").children;
    const playedStatus = document.getElementById("gameShelvesSelect");


    Array.from(gameShelves).forEach((shelf) => {
        // console.log(shelf)
        shelf.addEventListener("change", async (event) => {
            const gameShelfId = event.target.id; // this gets the checked game (id)
            const boardGameId = boardGame.id; // this gets the boardGame id from h1 class
            const checked = event.target.checked; // gives true or false if its checked
            console.log("---------- clicked! -----------");
            // fetch request
            // Default options are marked with *
            await fetch(`/boardgames/${boardGameId}/${gameShelfId}/${checked}`,
            {
                method: "PUT", // *GET, POST, PUT, DELETE, etc.
                headers: { "Content-Type": "application/json" }, // 'Content-Type': 'application/x-www-form-urlencoded',
            }
            );
        });
    });

    playedStatus.addEventListener("change", async (event)=>{
        const gameShelfId = event.target.value  // this gets the checked game (id)
        const boardGameId = boardGame.id // this gets the boardGame id from h1 class


        console.log('---------- clicked! -----------')
        console.log(event.target.value, event.target)
        // fetch request
        // Default options are marked with *
        await fetch(`/boardgames/${boardGameId}/${gameShelfId}`,
        {
            method: 'PUT', // *GET, POST, PUT, DELETE, etc.
            headers: {'Content-Type': 'application/json'}, // 'Content-Type': 'application/x-www-form-urlencoded',
        });
    })
});
