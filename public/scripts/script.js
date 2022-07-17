document.addEventListener('DOMContentLoaded', () => {
  updatePosts();
});

function updatePosts() {
  fetch("http://localhost:3000/api/all")
    .then(res => {
      return res.json();
    })
    .then(json => {
      let postElements = "";
      let posts = JSON.parse(json);
      posts.forEach((post) => {
        let postElement = `<div id=${post.id} class="card">
                              <div class="card-header">
                                <h5 class="card-title">${post.title}</h5>
                              </div>
                              <div class="card-body">
                                <div class="card-text">${post.description}</div>
                              </div>
                              <div class="card-footer">
                                <button onclick="deletePost('${post.id}')" class="btn btn-danger">Excluir</button>
                                <button onclick="showPost('${post.id}', '${post.title}', '${post.description}')" class="btn btn-warning">Editar</button>
                              </div>
                            </div>`;
        postElements += postElement;
      });

      document.getElementById("posts").innerHTML = postElements;
    })
}

function newPost() {
  let title = document.getElementById("title").value;
  let description = document.getElementById("description").value;
  let post = {title, description};

  const options = {
    method: "POST",
    headers: new Headers({"content-type": "application/json"}),
    body: JSON.stringify(post)
  };

  fetch("http://localhost:3000/api/new", options)
    .then(res => {
      console.log(res);
      updatePosts();
      document.getElementById("title").value = "";
      document.getElementById("description").value = "";
    })

}

function deletePost(id) {
  let post = {id}
  const options = {
    method: "DELETE",
    headers: new Headers({ "Content-Type": "application/json"}),
    body: JSON.stringify(post)
  }

  fetch("http://localhost:3000/api/delete", options)
  .then(res => {
    console.log(res);
    updatePosts();
  })
}

function showPost(id, title, description) {
  let postElements = "";
  let postElement = `<div class="d-flex flex-column gap-2 mt-3">
                      <input class="btn btn-outline-success" id="titleUpdate" placeholder="${title}" type="text">
                      <input class="btn btn-outline-success" id="descriptionUpdate" placeholder="${description}" type="text">
                      <button onclick="changePost('${id}')" class="btn btn-success">Alterar</button>
                    </div>`
  postElements += postElement;
  document.getElementById("posts").innerHTML = postElements;
}

function changePost(id) {
  let titleUpdate = document.getElementById("titleUpdate").value;
  let descriptionUpdate = document.getElementById("descriptionUpdate").value;
  let post = {id, titleUpdate, descriptionUpdate};

  if (titleUpdate != "") {
    const options = {
      method: "PUT",
      headers: new Headers({ "Content-Type": "application/json"}),
      body: JSON.stringify(post)
    }
  
    fetch("http://localhost:3000/api/put", options)
    .then(res => {
      console.log(res);
      updatePosts();
    })
  } else {
    updatePosts();
  }
}