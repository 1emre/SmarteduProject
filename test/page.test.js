const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const pageRoute = require('../routes/pageRoute');

const should = chai.should();
//Sonucu şu olmalı gibisinden sorular sorabilmek için...

chai.use(chaiHttp);

describe('Örnek Test Uygulamaları', () => {
  it('GET : getAboutPage', (done) => {
    chai
      .request(server)
      .get('/about')
      .end((error, response) => done());

    // chai
    //   .request(server)
    //   .post('/photos')
    //   .end((error, response) => done());
  });
});
