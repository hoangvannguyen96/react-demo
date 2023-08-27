import './App.css'
import AnimalDetail from './component/animalList/AnimalDetail'
import AnimalList from './component/animalList/AnimalList'
import CreateAnimal from './component/createAnimal/CreateAnimal'
import MainLayout from './component/layout/MainLayout'
import { Routes, Route } from 'react-router-dom'

function App() {

  return (
    <>
      <MainLayout>
        <Routes>
          <Route path="/" element={<AnimalList />} />
          <Route path="/animal" element={<AnimalList />} />
          <Route path="/animal/create" element={<CreateAnimal />} />
          <Route path="/animal/:AnimalId" element={<AnimalDetail />} />
        </Routes>
      </MainLayout>
    </>
  )
}

export default App
