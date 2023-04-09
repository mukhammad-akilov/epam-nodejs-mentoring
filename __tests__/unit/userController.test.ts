import { request } from '../helper';
import jwt from 'jsonwebtoken';

const accessToken = jwt.sign(
  {
    id: 1,
    login: "test-user",
  },
  `${process.env.ACCESS_TOKEN_SECRET}`,
  { expiresIn: '5m' },
);

describe('User controller', () => {
  beforeEach(() => {
   console.log('Run before each test');
  });


it('should log in', function(done) {
    request
      .post('/api/login')
      .send({
        'login': "akilov",
        'password': "akilov-password"
      })
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(200)
      .end(function (err, res) {
        if (err) throw err;
        console.log(res.body);
        done();
      });
  });

  it('should get all users', function(done) {
    request
      .get('/api/users')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200)
      .end(function (err, res) {
        if (err) throw err;
        console.log(res.body);
        done();
      });
  });

  it('should get user by id', function(done) {
    request
      .get('/api/users/17')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200)
      .end(function (err, res) {
        if (err) throw err;
        console.log(res.body);
        done();
      });
  });

  it('should get auto suggests users', function(done) {
    request
      .get('/api/users-auto-suggest?login=user&limit=4')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200)
      .end(function (err, res) {
        if (err) throw err;
        console.log(res.body);
        done();
      });
  });

  it('should update user', function(done) {
    request
      .put('/api/users')
      .send({
        id: 17,
        login: "akilov",
        password: "akilov-password",
        age: 99
      })
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200)
      .end(function (err, res) {
        if (err) throw err;
        console.log(res.body);
        done();
      });
  });

  it('should add user to group', function(done) {
    request
      .post('/api/add-user-to-group')
      .send({
        userId: 17,
        groupId: 3,
      })
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200)
      .end(function (err, res) {
        if (err) throw err;
        console.log(res.body);
        done();
      });
  });

  it('should add user to DB', function(done) {

    request
      .post('/api/users')
      .send({
        login: "test-user",
        password: "test-user-password",
        age: 28
      })
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(201)
      .end(function (err, res) {
        if (err) throw err;
        console.log(res.body);
        done();
      });
  });

  it('should delete user from DB', function(done) {
    request
      .delete('/api/users/20')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(204)
      .end(function (err, res) {
        if (err) throw err;
        console.log(res.body);
        done();
      });
  });
});

