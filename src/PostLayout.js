import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const PostLayout = () => {
  return (
    <>
    <Link to="/Postpage/1">Post1</Link>
    <br></br>
    <Link to="/Postpage/2">Post2</Link>
    <br></br>
    <Link to="/Postpage/3">Post3</Link>
    <br></br>
    <Link to="/Postpage/newpost">Newpost</Link>
    <Outlet/>
    </>
  )
}

export default PostLayout