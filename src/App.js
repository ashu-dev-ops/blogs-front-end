import logo from "./logo.svg";
import "./App.css";
import Editor from "./components/Editor";
import EditorLexical from "./components/LexicalEditor";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "./pages/public/auth/SignIn";
import NavbarDashBoard from "./pages/private/sharedBlog";
import ProtectedRoute from "./components/ProtectedComponent";
import ReadBlog from "./pages/private/readBlog";
import ReadAllBlog from "./pages/private/ReadAllBlog";
import writeBlog from "./pages/private/writeBlog";
import ErrorPage from "./pages/public/auth/ErrorPage";
import WriteABlog from "./pages/private/WriteABlog";
import PublishedPage from "./pages/private/PublishedPage";
import EditBlogPage from "./pages/private/EditBlogPage";
import AllPublishedBlogs from "./pages/public/auth/AllPublishedBlogs";
import ReadBlogPublic from "./pages/public/auth/ReadBlogPublic";
import ButtonAppBar from "./pages/public/auth/AppbarPublic";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ButtonAppBar />}>
            <Route path="auth" element={<SignIn />}></Route>
            <Route path=":id" element={<ReadBlogPublic />}></Route>
            <Route path="" element={<AllPublishedBlogs />}></Route>
          </Route>

          <Route
            path="/user"
            element={
              <ProtectedRoute>
                <NavbarDashBoard />
              </ProtectedRoute>
            }
          >
            <Route path="write-blog" element={<WriteABlog />}></Route>
            <Route path="read/:id" element={<ReadBlog />}></Route>
            <Route path="edit-blog/:id" element={<EditBlogPage />}></Route>
            <Route path="read-all" element={<ReadAllBlog />}></Route>
            <Route path="published" element={<PublishedPage />}></Route>
          </Route>
          <Route path="*" element={<ErrorPage />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
