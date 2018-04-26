/* global define, it, describe, beforeEach, document */
const express = require('express');
const path = require('path');
const Nightmare = require('nightmare');
const expect = require('chai').expect;
const axios = require('axios');

let nightmare;

const app = express();
app.use(express.static(path.join(__dirname, '/../public')));
app.use(express.static(path.join(__dirname, '/../dist')));

app.listen(8888);

const url = 'http://localhost:8888';


describe('express', ( ) => {
  beforeEach(() => {
    nightmare = new Nightmare({show: true});
  });

  it("should load succesfully", () => axios.get(url).then(r => (r.status===200)));

  it('should have the correct page title', () =>
    nightmare
      .goto(url)
      .evaluate(() => document.querySelector("h1").innerText)
      .end()
      .then((text) => {
        expect(text).to.equal("Movie Finder");
      })
  );
  
});
