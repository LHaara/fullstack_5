import React from 'react'
import { mount } from 'enzyme'
import App from './App'
import Blog from './components/Blog'
jest.mock('./services/blogs')
import blogService from './services/blogs'

describe('<App />', () => {
  let app

  describe('when user is not logged', () => {
    beforeEach(() => {
      app = mount(<App />)
    })
    it('only login form is rendered', () => {
      app.update()
      const loginDiv = app.find('.login')
      console.log(loginDiv.debug())
      const blogComponents = app.find(Blog)
      expect(loginDiv.text()).toContain('Kirjaudu')
      expect(blogComponents.length).toEqual(0)
    })
  })

  describe('when user is logged', () => {
    beforeEach(() => {
      
      const user = {
        username: 'Galan',
   //     password: 'salakala'
         token: '9999999',
        name: 'Galactus'
      }
      localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))     
      app = mount(<App />)
    })
    it('all blogs are rendered', () => {
      app.update()
      console.log(localStorage.getItem('loggedBlogAppUser'))   
      const blogComponents = app.find(Blog)


      console.log(app.debug())
      console.log(blogComponents.debug())

      expect(blogComponents.length).toEqual(blogService.blogs.length)
    })

  })
})