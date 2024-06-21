import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage"
import Posts from "./pages/Posts"
import SinglePost from "./pages/SinglePost"
import NotFound from "./pages/NotFound"

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>

        {/* home page route */}
        <Route path="/" element={<HomePage/>}/>

        {/* Not Found Route */}
        <Route path="/*" element={<NotFound/>}/>

        {/* complete posts list route */}
        <Route path="/posts">
          <Route index element={<Posts/>}/>
          {/* single post route with slug param */}

          <Route path=":slug">
              <Route index element={<SinglePost/>}/>    
          </Route>
        </Route>

      </Routes>    
    </BrowserRouter>
    </>
  )
}

export default App
