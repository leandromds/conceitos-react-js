import React, { useState, useEffect } from "react";
import api from './services/api'

import "./styles.css";

function App() {
  const [projects, setProjects] = useState([])

  useEffect(() => {
   api.get('projects').then(response => {
     setProjects(response.data)
   })
  }, []);

  async function handleAddRepository() {
    const response = await api.post('projects', {
      title: `Novo Projeto create in ${Date.now()}`,
      owner: "Leandro M Silva"
    })

    const newProject = response.data
    setProjects([...projects, newProject])
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`projects/${id}`)

    if (!response.status === '204') { return }

    const projectsCopy = projects
    const projectDelIndex = projectsCopy.findIndex(project => project.id === id)
    projectsCopy.splice(projectDelIndex, 1)

    setProjects([...projectsCopy])
  }

  return (
    <div>
      <ul data-testid="repository-list">
        { projects.map(project => (
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
