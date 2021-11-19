window.addEventListener("load", (event) => {


  // -------------- Deleting Reviews --------------------
  const deleteComments = document.querySelectorAll(".deleteComment");
  //boardGameId: grab boardGameId from element on pug templete-- put one on there b/c there is not one


  deleteComments.forEach((comment) => {
    // console.log(comment.parentNode)
    const commentId = comment.parentNode.id.split("-")[3];
    const boardGameId = comment.parentNode.id.split("-")[1];
    comment.addEventListener("click", async (e) => {
      // console.log(e.target)
      const res = await fetch(`/boardgames/${boardGameId}/reviews/${commentId}`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "DELETE",
      });
      const data = await res.json();
      if (data.message == "Success") {
        const parent = comment.parentNode;
        parent.remove();
      }
    });
  });

  // -------- deleting games off game shelf ----------



  // -------- deleting a shelf ------------
      // only able to delete shelves that are NOT: 'want to play', 'played', 'favorites'


});
