import React from 'react'


class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
  }

  toggleVisibility = () => {
    this.setState({visible: !this.state.visible})
  }


render(){
  const showWhenVisible = { display: this.state.visible  ? '' : 'none', paddingLeft: 10}

  const showIfUser = this.props.blog.user !== undefined ? this.props.blog.user.name : ''
  
  const currentUserName = JSON.parse(window.localStorage.getItem('loggedBlogappUser')).username
  console.log(this.props.blog.user)

  const showButtonIfItcanBeUsed = { 
    display : (this.props.blog.user === undefined || this.props.blog.user.username === currentUserName)
    ? '' : 'none'} 


  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

return (
      <div style={blogStyle}>
        <span onClick={this.toggleVisibility}>{this.props.blog.title}</span><span> {this.props.blog.author}</span>
        <div style={showWhenVisible}>
          <a href={this.props.blog.url}>{this.props.blog.url}</a>
          <div>{this.props.blog.likes} likes  <button  onClick={this.props.updateLikes} >like</button></div>
          <div>added by {showIfUser}</div>
          <button  style={showButtonIfItcanBeUsed}  onClick={this.props.delete}>delete</button>
        </div> 
      </div>
        
             

    )
  
  }
}
export default Blog