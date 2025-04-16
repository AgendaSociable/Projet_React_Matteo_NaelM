import { useState } from 'react'
import './App.css'

function App() {
  const [formData, setFormData] = useState({
    title: '',
    subject: '',
    duration: '',
    presenter: '',
    objective: ''
  })

  const [talks, setTalks] = useState([])
  const [selectedTalk, setSelectedTalk] = useState(null)
  const [darkMode, setDarkMode] = useState(false)
  const [filter, setFilter] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
  }

  const handleDelete = (id) => {
    setTalks(talks.filter(talk => talk.id !== id))
  }

  const handleUpdate = (e) => {
    e.preventDefault()
    setTalks(talks.map(talk => 
      talk.id === selectedTalk.id ? selectedTalk : talk
    ))
    setSelectedTalk(null)
  }

  return (
    <>
      <div class="container-fluid">
        <div class="row">
          {/* Left Side */}
          <div class=" border border-danger col-md-6">
            <h2 class="text-center mb-4 title-icon">Talk Manager</h2>
            <form onSubmit={handleSubmit}>
              <div class="mb-3">
                <label htmlFor="titre" class="form-label">Le titre</label>
                <input 
                  type="text" 
                  class="form-control rounded-input" 
                  id="titre"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>
              <div class="mb-3">
                <label htmlFor="sujet" class="form-label">Le sujet</label>
                <input 
                  type="text" 
                  class="form-control rounded-input" 
                  id="sujet"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>
              <div class="mb-3">
                <label htmlFor="duree" class="form-label">Durée du talk (en min)</label>
                <input 
                  type="number" 
                  class="form-control rounded-input" 
                  id="duree"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  required
                />
              </div>
              <div class="mb-3">
                <label htmlFor="presentateur" class="form-label">Présentateur.trice</label>
                <input 
                  type="text" 
                  class="form-control rounded-input" 
                  id="presentateur"
                  name="presenter"
                  value={formData.presenter}
                  onChange={handleChange}
                  required
                />
              </div>
              <div class="mb-4">
                <label htmlFor="objectif" class="form-label">Un objectif</label>
                <input 
                  type="text" 
                  class="form-control rounded-input" 
                  id="objectif"
                  name="objective"
                  value={formData.objective}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit" class="btn btn-black w-100">Créer un talk</button>
            </form>
          </div>

          {/* Right Side */}
          <div class="border border-primary rounded-4 col-md-6 ps-4">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <div>
                <button class="btn btn-light me-2"><i class="bi bi-gear"></i></button>
                <button class="btn btn-light"><i class="bi bi-moon"></i></button>
              </div>
              <div class="ms-auto">
                <select class="form-select form-select-sm w-auto">
                  <option>Sélectionnez un filtre</option>
                  <option>Durée</option>
                  <option>Ordre alphabétique</option>
                </select>
              </div>
            </div>

            <div class="row">
              <div class="col-md-6 mb-3">
                <div class="card-custom position-relative">
                  <button class="btn-close position-absolute top-0 end-0 mt-2 me-2"></button>
                  <p><strong>Titre du talk</strong></p>
                  <p>Sujet du talk</p>
                  <p>Durée du talk</p>
                  <p>Présentateur.rice du talk</p>
                  <button class="btn btn-black w-100">Modifier</button>
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <div class="card-custom position-relative">
                  <button class="btn-close position-absolute top-0 end-0 mt-2 me-2"></button>
                  <p><strong>Titre du talk</strong></p>
                  <p>Sujet du talk</p>
                  <p>Durée du talk</p>
                  <p>Présentateur.rice du talk</p>
                  <button class="btn btn-black w-100">Modifier</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
