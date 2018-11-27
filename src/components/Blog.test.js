import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe.only('<SimpleBlog />', () => {
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