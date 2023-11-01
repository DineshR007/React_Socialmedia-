import { format } from "date-fns";
import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import About from "./About";
import Editpost from "./Editpost";
import Footer from "./Footer";
import Header from "./Header";
import Home from "./Home";
import Missing from "./Missing";
import Nav from "./Nav";
import Newpost from "./Newpost";
import Postpage from "./Postpage";
import api from "./api/post";
import useAxiosFetch from "./hooks/useAxiosFetch";
import useWindowSize from "./hooks/useWindowSize";
function App(){
  const [posts,setPost] = useState([])
  const[search,setSearch]=useState('')
  const [searchResults,setSearchResults] = useState([])
  const[postTitle,setPostTitle]=useState('')
  const[postBody,setPostBody]=useState('')
  const[editTitle,setEditTitle]=useState('')
  const[editBody,setEditBody]=useState('')
  const{width} = useWindowSize()
  const{data,fetchError,isLoading}=useAxiosFetch("http://localhost:3500/posts")
  const navigate = useNavigate()
  useEffect(()=>{
    setPost(data)
},[data])

useEffect(()=>{
    const filteredResults = posts.filter((post)=>
    ((post.body).toLowerCase()).includes( search.toLowerCase())
    ||((post.title).toLowerCase().includes(search.toLowerCase())))
setSearchResults(filteredResults.reverse())
},[posts,search])

const handleSubmit= async(e)=>{
    e.preventDefault()
    const id = posts.length ? posts[posts.length -1].id+1:1
    const datetime = format(new Date(),'MMMM dd, yyyy pp')
    const newpost = {id,title:postTitle,datetime,body:postBody}
    try{
    const response = await api.post("/posts",newpost)
    const allPosts= [...posts,response.data]
    setPost(allPosts)
    setPostTitle('')
    setPostBody('')
    navigate('/')
    }
    catch(err){
        console.log(`Error :${err.Message}`)
    }
    }
const handleDelete= async(id)=>{
    try{
    await api.delete(`posts/${id}`)
    const postList = posts.filter(post=>post.id!==id)
    setPost(postList);
    navigate('/')
    }

    catch(err){
    console.log(`Error :${err.Message}`)
    }
}
const handleEdit = async(id)=>{
    const datetime = format(new Date(), "MMMM dd,yyyy pp")
    const updatedpost = { id,title: editTitle,datetime,body: editBody}
    try{
    const response = await api.put(`/posts/${id}`,updatedpost)
    setPost(posts.map(post=>post.id===id?{...response.data}:post))
    setEditTitle("")
    setEditBody("")
    navigate('/')
    }
    catch(err){
    console.log(`Error :${err.Message}`)
    }
}
  return (
  <div className='App'>
    <Header title={"Dinesh Social Media"} 
    width={width}/>
    <Nav 
    search={search}
    setSearch={setSearch}/>
    <Routes>
    <Route path="/"element={<Home
      posts={searchResults}
      fetchError={fetchError}
      isLoading={isLoading}
      />}/>
    <Route path="post">
    <Route index element={<Newpost
    handleSubmit={handleSubmit}
    postTitle={postTitle}
    setPostTitle={setPostTitle}
    postBody={postBody}
    setPostBody={setPostBody}/>}/>
    <Route path=":id" element={<Postpage 
    posts={posts}
    handleDelete={handleDelete}/>}/>
    </Route>
    <Route path="/edit/:id" element={<Editpost
    posts={posts}
    handleEdit={handleEdit}
    editBody={editBody}
    setEditBody={setEditBody}
    editTitle={editTitle}
    setEditTitle={setEditTitle}
  />}/>
    <Route path="/about" element={<About />}/>
    <Route path="*" element={<Missing />}/>
    </Routes>
    <Footer />
  </div>
  );
}

export default App;
