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

describe('Group controller', () => {

    it('should get all groups', function(done) {
    request
        .get('api/groups')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200)
        .end(function (err, res) {
        if (err) throw err;
        console.log(res.body);
        done();
        });
    });
    
    it('should get group by id', function(done) {
    request
        .get('/api/groups/1')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200)
        .end(function (err, res) {
        if (err) throw err;
        console.log(res.body);
        done();
        });
    });
    
    
    it('should update group', function(done) {
        request
          .put('/api/groups')
          .send({
            id: 1,
            name: "Group 2 Ghost",
            permissions: ["READ-UPDATED", "WRITE-UPDATED", "DELETE-UPDATED"]
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
    
      it('should add grup', function(done) {
        request
          .post('/api/groups')
          .send({
            name: "Group 3",
	        permissions: ["READ", "WRITE", "DELETE"]
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
    
    
    it('should delete gruop', function(done) {
        request
          .delete('api/groups/1')
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