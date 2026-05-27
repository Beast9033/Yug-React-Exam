// import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import CreatePost from './pages/CreatePost'
import EditPost from './pages/EditPost'
import Header from './components/Header'
import PostDetails from './components/PostDetails'

const App = () => {
  return (
    <>
    <Header />

    <Routes >
      <Route path="/" element={<Home />} />
      <Route path="/CreatePost" element={<CreatePost />} />
      <Route path="/edit/:id" element={<EditPost />} />
      <Route path='/post/:id' element={<PostDetails />} />
    </Routes>

    </>
  )
}

export default App
