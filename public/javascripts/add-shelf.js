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

    const liList = document.querySelectorAll('.shelfLi2')
    console.log(liList)
    
    liList.forEach( li => {
        
        const liKids = li.childNodes
        const aTag = liKids[0]
        const shelfEditBtn = liKids[1];
        const shelfDeleteBtn = liKids[2];
        const specificId = li.id.split('-')[1]
        console.log(specificId)
        
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
    
            const doneBtn = document.createElement('button');
            doneBtn.innerText = "done"
            doneBtn.type = 'submit';
    
            const div = document.createElement('div');
            div.appendChild(shelfInput);
            div.appendChild(doneBtn);
            console.log(div)
            console.log(li)
            li.innerHTML = ""
            li.appendChild(div)

            // li.insertAdjacentElement('beforebegin', div);
            // li.remove();
            // shelfEditBtn.remove();
            // shelfDeleteBtn.remove();

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
