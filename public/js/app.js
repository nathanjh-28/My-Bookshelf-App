console.log('sanity check')

// Replace below key with APIkey from Zach
const key = 'insertkey'
const url = `https://www.goodreads.com/search.xml?key=${key}&q=Ender%27s+Game`;

const proxyurl = "https://cors-anywhere.herokuapp.com/";
//const url = "https://example.com"; // site that doesn’t send Access-Control-*
fetch(proxyurl + url) // https://cors-anywhere.herokuapp.com/https://example.com
.then(response => response.text())
// .then(contents => console.log(contents))
.then(contents => {
  parser = new DOMParser();
    xmlDoc = parser.parseFromString(contents, "text/xml");
  const test = xmlDoc.getElementsByTagName("work")[0].childNodes;
  console.log(test) 
})
.catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))