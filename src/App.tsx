
import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";
import { MainPage } from "./components/mainPage/MainPage";
import { StoryPage } from "./components/storyPage/StoryPage";
import { Header } from "./components/Header";

function App() {



  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/story/:id' element={<StoryPage />} />

        <Route path='*' element={<div className='container py-5 mx-auto'>Not found</div>} />
      </Routes>
    </Router>
  )
}

export default App
