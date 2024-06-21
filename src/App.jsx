import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage"
import Posts from "./pages/Posts"
import SinglePost from "./pages/SinglePost"
import NotFound from "./pages/NotFound"
import MainLayout from "./layouts/MainLayout"

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        {/* general layout applied to all of our routes */}
        <Route path="/" element={<MainLayout/>}>

          {/* main route for the "/" url with component HomePage */}
          <Route index element={<HomePage/>}/>

          {/* sub routes for posts */}
          <Route path="posts">
            {/* main page for the posts route */}
            <Route index element={<Posts/>}/>

            {/* single post route with slug param */}
            <Route path=":slug" element={<SinglePost/>}/>
          </Route>

          {/* Not found component to handle the error 404 */}
          <Route path="*" element={<NotFound/>}/>
        </Route>
      </Routes>    
    </BrowserRouter>
    </>
  )
}

export default App
