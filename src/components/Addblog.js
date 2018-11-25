
import React from 'react'

const Addblog = (props) => {
    return (
      <div>
           <form onSubmit={props.addBlog}>
            <div>
              Title: <input name="newTitle" value={props.newTitle} onChange={props.addBlogFieldChange}/>
            </div>
            <div>
              Author: <input name="newAuthor" value={props.newAuthor} onChange={props.addBlogFieldChange}/>
            </div>
            <div>
              Url: <input name="newUrl"value={props.newUrl} onChange={props.addBlogFieldChange}/>
            </div>
            <div>
              <button type="submit">Add</button>
            </div>
          </form>
      </div>
    )
  }
  
export default Addblog