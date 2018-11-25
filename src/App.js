import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Addblog from './components/Addblog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'



class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      username: '',
      password: '',
      user: null,
      newTitle: '',
      newAuthor: '',
      newUrl: '',
      message: null
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ 
        blogs: blogs.sort((a, b) => {
          return b.likes - a.likes
        })
      })
    )
    
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({user})
      blogService.setToken(user.token)
     
    }

  } 

  addBlog = (event) => {
    event.preventDefault()
    this.Addblog.toggleVisibility()
    const blogObject = {
      title: this.state.newTitle,
      author: this.state.newAuthor,
      url: this.state.newUrl
    }
  
    blogService
      .create(blogObject)
      .then(newBlog => {
        this.setState({
          blogs: this.state.blogs.concat(newBlog),
          message: `a new blog '${this.state.newTitle}' by '${this.state.newAuthor}' added`,
          newTitle: '',
          newAuthor:'',
          newUrl:''
        })
        setTimeout(() => {
          this.setState({message: null})
        }, 3000)
      })

  }

  updateLikes = (id) => {
    return () => {

      const blog = this.state.blogs.find(n => n._id === id)      
      const blogIndex = this.state.blogs.findIndex(n => n._id === id)
      console.log(this.state.blogs)
      const changedBlog = { ...blog, likes: blog.likes+1 }


      blogService
      .update(id, changedBlog)
      .then(changedBlog => {
        const blogs = this.state.blogs
        //concat sotkee järjestyksen, splice on parempi
        blogs.splice(blogIndex, 1,changedBlog)
        this.setState({
          blogs
        })

      })
      .catch(error => {
        this.setState({
          message: `blog '${blog.title}' has been deleted`,
          blogs: this.state.blogs.filter(n => n._id !== id)
        })
        setTimeout(() => {
          this.setState({message: null})
        }, 5000)
      })

    }
  }

  deleteBlog = (id) => {
    return () => {
      const blog = this.state.blogs.find(n => n._id === id)

      if(window.confirm("delete "+blog.title+" by "+blog.author+"?")){

          const blogs = this.state.blogs.filter(str => str._id !== id)

          blogService
            .del(id)
            .then(response => {
              if (response.status === 204)
              {
                this.setState({
                  blogs,
                  message: `'${blog.title}' was deleted`
                }) 
              }
          })

          setTimeout(() => {
            this.setState({message: null})
          }, 2000)
      }

    }

  }


  handleLoginFieldChange = (event) => {
    //console.log(event.target)
    this.setState({ [event.target.name]: event.target.value })
  }

  addBlogFieldChange = (event) => {
    //console.log(event.target)
    this.setState({ [event.target.name]: event.target.value })
  } 

  login = async (event) => {
    event.preventDefault()
    try{
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      this.setState({ username: '', password: '', user})
      console.log(this.state)
    } catch(exception) {
      this.setState({
        message: `wrong username or password`
      })
      setTimeout(() => {
        this.setState({ message: null })
      }, 3000)
    }
  }

  logout = (event) => {
    window.localStorage.removeItem('loggedBlogappUser')
  }


  render() {

  const loginForm = () => (
      <div>
        <h2>Kirjaudu</h2>
    
        <form onSubmit={this.login}>
          <div>
            käyttäjätunnus
            <input
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleLoginFieldChange}
            />
          </div>
          <div>
            salasana
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleLoginFieldChange}
            />
          </div>
          <button type="submit">kirjaudu</button>
        </form>
      </div>
    )

  const blogForm = () => (    
    <div>
      <h2>blogs</h2>

          {this.state.blogs.map(blog => 
            <Blog 
              key={blog._id} 
              blog={blog} 
              updateLikes = {this.updateLikes(blog._id)}
              delete={this.deleteBlog(blog._id)}
            />
          )}

  </div>

)

    return (
      <div >
        <Notification message={this.state.message}/>
        {this.state.user === null ?
          loginForm() :
          <div>
            <form onSubmit={this.logout}>
            <p>{this.state.user.name} logged in<button type="submit">kirjaudu ulos</button></p>
            </form>
            <Togglable buttonLabel="new blog" ref={component => this.Addblog = component}>
              <Addblog addBlog = {this.addBlog} addBlogFieldChange = {this.addBlogFieldChange}
              newTitle = {this.state.newTitle} newAuthor = {this.state.newAuthor} newUrl = {this.state.newUrl}/>
            </Togglable>
            {blogForm()}
          </div>
        }
      </div>
    );
  }
}

export default App;
