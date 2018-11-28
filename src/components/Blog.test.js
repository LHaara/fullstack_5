import React from 'react'
import { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import SimpleBlog from './SimpleBlog'
import Blog from './Blog'

describe('<SimpleBlog />', () => {
  it('renders title, author and amount of likes', () => {
    const blog = {
      title: 'The Amazing Spiderman',
      author: 'Stan Lee',
      likes: 7
    }

    const blogComponent = shallow(<SimpleBlog blog={blog} />)
    
    const blogDiv = blogComponent.find('.title')
    //console.log(blogDiv.debug())

    const likesDiv = blogComponent.find('.likes')
    //console.log(likesDiv.debug())

    expect(blogDiv.text()).toContain(blog.title)
    expect(blogDiv.text()).toContain(blog.author)
    expect(likesDiv.text()).toContain(blog.likes)
  })
  it('clicking the button twice calls event handler twice', () => {
    const blog = {
      title: 'The Amazing Spiderman',
      author: 'Stan Lee',
      likes: 7
    }
  
    const mockHandler = jest.fn()
  
    const blogComponent = shallow(
      <SimpleBlog
        blog={blog}
        onClick={mockHandler}
      />
    )
  
    const button = blogComponent.find('button')
    button.simulate('click')
    button.simulate('click')

    expect(mockHandler.mock.calls.length).toBe(2)
  })
})

describe('<Blog />', () => {

  it('at start, details are not displayed, after clicking name the details are displayed', () => {
    const blog = {
      title: 'The Amazing Spiderman',
      author: 'Stan Lee',
      likes: 7
    }

    const blogComponent = shallow(
      <Blog 
      blog={blog} 
    />
    )

    const titleDiv = blogComponent.find('.title') 
    //console.log(titleDiv.debug())

    const divBeforeclick = blogComponent.find('.togglableContent')    
    console.log( divBeforeclick.getElement().props.style)
    expect(divBeforeclick.getElement().props.style).toEqual({"display": "none", "paddingLeft": 10})
    

    titleDiv.simulate('click')

    const  divAfterclick = blogComponent.find('.togglableContent')
    console.log(divAfterclick.getElement().props.style)      
    expect(divAfterclick.getElement().props.style).toEqual({"display": '', "paddingLeft": 10})
  })
})