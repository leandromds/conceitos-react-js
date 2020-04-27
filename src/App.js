import React, { useState, useEffect } from "react";
import api from './services/api'

import "./styles.css";

function App() {
  const [repository, setRepository] = useState([])

  useEffect(() => {
   api.get('repository').then(response => {
     setRepository(response.data)
   })
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repository', {
      title: `Novo Projeto create in ${Date.now()}`,
      owner: "Leandro M Silva"
    })

    const newProject = response.data
    setRepository([...repository, newProject])
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repository/${id}`)

    if (!response.status === '204') { return }

    const repositoryCopy = repository
    const projectDelIndex = repositoryCopy.findIndex(project => project.id === id)
    repositoryCopy.splice(projectDelIndex, 1)

    setRepository([...repositoryCopy])
  }

  return (
    <div>
      <ul data-testid="repository-list">
        { repository.map(project => (
          <li key={project.id}>
            {project.title}

            <button onClick={() => handleRemoveRepository(project.id)}>
              Remover
          </button>
          </li>
        )) }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
