window.addEventListener("load", (event) => {


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

            const editBtn = document.createElement("button")
            editBtn.innerText = 'edit'
            editBtn.id = 'shelfEditBtn'

            const deleteBtn = document.createElement("button")
            deleteBtn.innerText = 'X'
            deleteBtn.id = 'shelfDeleteBtn'

            a.setAttribute("href", `/gameshelves/${shelfId}`);
            a.innerText = shelfName;

            li.appendChild(a);
            li.appendChild(editBtn)
            li.appendChild(deleteBtn)
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


    const shelfEditBtn = document.getElementById('shelfEditBtn');;
    const shelfDeleteBtn = document.getElementById('shelfDeleteBtn');

    shelfDeleteBtn.addEventListener("click", (event) => {
        
    });

    shelfEditBtn.addEventListener("click", (event) => {
        const li = document.getElementById("shelfLi");
        
        const shelfName = li.innerText
        
        const shelfInput = document.createElement('input');

        const doneBtn = document.createElement('button');
        doneBtn.innerText = "done"
        doneBtn.type = 'submit';

        const div = document.createElement('div');
        div.appendChild(shelfInput);
        div.appendChild(doneBtn);

        li.insertAdjacentElement('beforebegin', div);
        li.remove();
        shelfEditBtn.remove();
        shelfDeleteBtn.remove();

        const createHtmlShelf = (shelfName, shelfId) => {
            const li = document.createElement("li");
            const a = document.createElement("a");

            const editBtn = document.createElement("button")
            editBtn.innerText = 'edit'
            editBtn.id = 'shelfEditBtn'

            const deleteBtn = document.createElement("button")
            deleteBtn.innerText = 'X'
            deleteBtn.id = 'shelfDeleteBtn'

            a.setAttribute("href", `/gameshelves/${shelfId}`);
            a.innerText = shelfName;

            li.appendChild(a);
            li.appendChild(editBtn)
            li.appendChild(deleteBtn)
            return li;
        }
        


        doneBtn.addEventListener("click", async(event) => {
            let result
            await fetch(`/gameshelves/${shelfName}/${shelfInput.value}`, {
                method: 'PUT', // *GET, POST, PUT, DELETE, etc.
                headers: {'Content-Type': 'application/json'}, // 'Content-Type': 'application/x-www-form-urlencoded',
            }).then( async(response) => result = await response.json());
            const newShelfId = result.newShelfId;
            const newShelfName = result.newShelfName
            if (Number(newShelfId)) {
                const htmlShelf = createHtmlShelf(newShelfName, newShelfId);
                appendNewShelf(htmlShelf);
            }
        })
    });

});
