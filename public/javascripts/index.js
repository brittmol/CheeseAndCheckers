window.addEventListener("load", (event)=>{
    console.log("hello from javascript!")
})

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
