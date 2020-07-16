// const express = require('express');
// const app = express();
// const axios = require('axios');
// require('dotenv').config();
// const parseString = require('xml2js').parseString;

const button = document.querySelector('.queryButton');
button.addEventListener('click', callAPI);

function callAPI() {
  event.preventDefault();
  console.log('API call started')
  let query = document.querySelector('.bookQuery').value;
  console.log(query);
  console.log(process.env.GR_API)

  // code from https://www.twilio.com/blog/2017/08/http-requests-in-node-js.html
// const url = `https://www.goodreads.com/search.xml?key=${process.env.GR_KEY}&q=Ender%27s+Game`;
// axios.get(url)
//   .then(response => {
//     // console.log(response.data);
//     parseString(response.data, (err, result) => {
//       const results = result.GoodreadsResponse.search[0].results[0].work;
//       results.forEach(result => {
//         console.log(result.best_book[0].title[0])
//         console.log(result.best_book[0].author[0].name[0])
//       })
//     })

//   })
//   .catch(error => {
//     console.log(error);
//   })

}