const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const helper = require('../utils/list_helper')

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  await Blog.insertMany(helper.initialBlogs)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are two blogs', async () => {
  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, 2)
})

test('blogs have property id instead of _id', async () => {
  const response = await api.get('/api/blogs')
  const firstBlog = response.body[0]

  assert.ok(firstBlog.id)
  assert.strictEqual(firstBlog._id, undefined)
})

test.only('creating a new blog post with async/await', async () => {
  const newBlog = {
    title: 'New Test Blog',
    author: 'Test Author',
    url: 'http://testurl.com',
    likes: 10
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  const blogsAfterPost = response.body

  assert.strictEqual(blogsAfterPost.length, helper.initialBlogs.length + 1)

  const titles = blogsAfterPost.map(blog => blog.title)
  assert.ok(titles.includes(newBlog.title))
})

after(async () => {
  await mongoose.connection.close()
})
