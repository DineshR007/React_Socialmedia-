import React from 'react'

const Newpost = ({handleSubmit,postTitle,setPostTitle,postBody,setPostBody}) => {
  return (
    <main className='Newpost'>
    <h2>Newpost</h2>
    <form className='NewpostForm' onSubmit={handleSubmit}>
    <label htmlFor='postTitle'>Title</label>
    <input
    id='postTitle'
    type='text'
    required
    value={postTitle}
    onChange={(e)=>setPostTitle(e.target.value)}
    />
    <label htmlFor='postBody'>Post</label>
    <textarea
    id='postBody'
    required
    value={postBody}
    onChange={(e)=>setPostBody(e.target.value)}
    />
    <button type='submit'>Submit</button>
    </form>
    </main>
  )
}

export default Newpost