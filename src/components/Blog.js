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
          <div>added by {this.props.blog.user.name}</div>
        </div> 
      </div>
        
             

    )
  
  }
}
export default Blog