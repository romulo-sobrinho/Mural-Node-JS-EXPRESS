postagens = [
  {
    id: "1a2b",
    title: "teste 1",
    description: "Descrição teste 1"
  },

  {
    id: "4a5b",
    title: "teste 2",
    description: "Descrição teste 2"
  },
  
  {
    id: "7a8b",
    title: "teste 3",
    description: "Descrição teste 3"
  }
]

postagens.forEach(postagem => {
  console.log(postagem)
})

console.log("============================")

indexUpdate = postagens.findIndex(postagem => postagem.id === "1a2b")
postagens[indexUpdate].title = "Título alterado"
postagens[indexUpdate].description = "Descrição alterada"

postagens.forEach(postagem => {
  console.log(postagem)
})


