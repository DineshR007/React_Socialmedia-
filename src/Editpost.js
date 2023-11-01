import { useEffect } from "react"
import { Link, useParams } from "react-router-dom"

const Editpost = ({posts,handleEdit,editBody,setEditBody,editTitle,setEditTitle}) => {
    const {id} = useParams()
    const post = posts.find(post=>(post.id).toString()===id)
    useEffect(()=>{
        if(post){
            setEditTitle(post.title)
            setEditBody(post.body)
        }
    },[post,setEditTitle,setEditBody])
return (
    <main className='Newpost'>
    {editTitle &&
    <>
    <h2>Edit post</h2>
    <form className='NewpostForm' onSubmit={(e)=>e.preventDefault()}>
    <label htmlFor='editTitle'>Title</label>
    <input
    id='editTitle'
    type='text'
    required
    value={editTitle}
    onChange={(e)=>setEditTitle(e.target.value)}
    />
    <label htmlFor='editBody'>Post</label>
    <textarea
    id='editBody'
    required
    value={editBody}
    onChange={(e)=>setEditBody(e.target.value)}
    />
    <button type='submit'onClick={()=> handleEdit(post.id)}>Submit</button>
    </form>
    </>
    }
    {!editTitle &&
        
        <>
        <h2>Page Not Found</h2>
        <p> Well that's disappointing!</p>
        <p>
        <Link to="/">Visit Our Homepage</Link>
        </p>
        </>

    }
    </main>
)
}

export default Editpost