var request = require('supertest')
var expect = require('chai').expect

var app = require('../app')

describe('App Server', () => {
  it('expect get index.html', (done) => {
    request(app)
      .get('/')
      .expect(function(response) {
        expect(response).to.have.property('text').include('DOCTYPE')
      })
      .expect(200, done)
  })
  it('expect get json message', (done) => {
    request(app)
      .get('/api')
      .expect({message: 'Hello World Others'})
      .expect(200, done)
  })
})
