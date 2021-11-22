window.addEventListener("load", (event) => {


    // ----- when "add game shelf" is clicked, an input box will appear -------
    const addShelfBtn = document.getElementById('addShelfBtn');
    const createAddShelf = document.getElementById("createAddShelf");

    addShelfBtn.addEventListener("click", (event) => {
        createAddShelf.removeChild(addShelfBtn)

        const inputShelf = document.createElement("input");
        inputShelf.name = "shelfInput";
        inputShelf.type = 'text';
        inputShelf.id = "shelfInput"

        const pIcon = document.createElement('i');
        pIcon.setAttribute("class", "fas fa-plus");

        const addShelf = document.createElement("button");
        addShelf.type = "submit";
        addShelf.id = "addShelfBtn2"
        addShelf.appendChild(pIcon)

        createAddShelf.appendChild(inputShelf);
        createAddShelf.appendChild(addShelf);

        const createHtmlShelf = (shelfName, shelfId) => {
            const li = document.createElement("li");
            const a = document.createElement("a");
            const eIcon = document.createElement('i');
            const dIcon = document.createElement('i');
            eIcon.setAttribute("class", "fas fa-edit");
            dIcon.setAttribute("class", "far fa-trash-alt");

            const editBtn = document.createElement("button");
            editBtn.id = 'shelfEditBtn';
            editBtn.appendChild(eIcon);

            const deleteBtn = document.createElement("button");
            deleteBtn.id = 'shelfDeleteBtn';
            deleteBtn.appendChild(dIcon);

            a.setAttribute("href", `/gameshelves/${shelfId}`);
            a.innerText = shelfName;
            li.className = "shelfLi2";
            li.id = `shelf-${shelfId}`;
            li.appendChild(a);
            li.appendChild(editBtn);
            li.appendChild(deleteBtn);

            return li;
        }

        const appendNewShelf = htmlshelf => {
            const shelfList = document.getElementById("shelfList");
            shelfList.appendChild(htmlshelf);
        }

        const revertHtml = () => {
            createAddShelf.removeChild(inputShelf);
            createAddShelf.removeChild(addShelf);
            createAddShelf.appendChild(addShelfBtn);
        }

        addShelf.addEventListener("click", async(e) => {
            let result;
            await fetch(`/gameshelves/${inputShelf.value}`, {
                method: 'PUT', // *GET, POST, PUT, DELETE, etc.
                headers: {'Content-Type': 'application/json'}, // 'Content-Type': 'application/x-www-form-urlencoded',
            }).then( async(response) => result = await response.json());

            const shelfId = result.newShelfId;

            if (Number(shelfId)) {
                const htmlShelf = createHtmlShelf(inputShelf.value, shelfId);
                appendNewShelf(htmlShelf);
                revertHtml();
            }
            location.reload()

        })
    })


    const liList = document.querySelectorAll('.shelfLi2')

    liList.forEach( li => {

        const liKids = li.childNodes
        const aTag = liKids[0]
        const shelfEditBtn = liKids[1];
        const shelfDeleteBtn = liKids[2];
        const specificId = li.id.split('-')[1]

        shelfDeleteBtn.addEventListener("click", async(event) => {
            const confirmed = confirm(`Are you sure you want to Delete "${aTag.innerText}" game shelf?`)
            if (confirmed) {
                let res = await fetch(`/gameshelves/${specificId}`, {
                    method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
                    headers: {'Content-Type': 'application/json'}, // 'Content-Type': 'application/x-www-form-urlencoded',
                })
                const result = await res.json();
                console.log(result.message)

                if (result.message === "success") {
                    li.remove()
                }
            }
        });

        shelfEditBtn.addEventListener("click", (event) => {
            const shelfInput = document.createElement('input');
            shelfInput.name = "shelfInput";
            shelfInput.type = 'text';
            shelfInput.id = "shelfInput"
            shelfInput.value = aTag.innerText

            const cIcon = document.createElement('i');
            cIcon.setAttribute("class", "fas fa-check");

            const doneBtn = document.createElement('button');
            doneBtn.type = 'submit';
            doneBtn.id = 'addShelfBtn2'
            doneBtn.appendChild(cIcon)

            const div = document.createElement('div');
            div.appendChild(shelfInput);
            div.appendChild(doneBtn);
            li.innerHTML = ""
            li.appendChild(div)

            const updateInnerText = (newShelfName) => {
                li.removeChild(div)
                aTag.innerText = newShelfName;
                li.appendChild(aTag)
                li.appendChild(shelfEditBtn)
                li.appendChild(shelfDeleteBtn)
            };

            doneBtn.addEventListener("click", async(event) => {
                await fetch(`/gameshelves/${specificId}/${shelfInput.value}`, {
                    method: 'PUT', // *GET, POST, PUT, DELETE, etc.
                    headers: {'Content-Type': 'application/json'}, // 'Content-Type': 'application/x-www-form-urlencoded',
                }).then(async (response) => {
                    const result = await response.json();
                    console.log(result);

                    const newShelfId = result.newShelfId;
                    console.log(newShelfId);

                    const newShelfName = result.newShelfName;
                    console.log(newShelfName);

                    if (Number(newShelfId)) {
                        updateInnerText(newShelfName, newShelfId);
                    }
                });

            })
        });
    })

});
