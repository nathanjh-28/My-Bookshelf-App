console.log('sanity check')

// Replace below key with APIkey from Zach
const key = 'INSERTKEY'
const url = `https://www.goodreads.com/search.xml?key=${key}&q=Ender%27s+Game`;

//pulled from https://www.w3schools.com/xml/tryit.asp?filename=try_xpath_select_cdnodes
// but it isn't working yet
// function showResult(xml) {
//   const txt = '';
//   const path = 'GoodreadsResponse/search/results/work'
//   const nodes = xml.evaluate(path, xml, null, XPathResult.ANY_TYPE, null);
//   console.log(nodes)
//         const result = nodes.iterateNext();
//         while (result) {
//           console.log(result);
//             txt += result.childNodes[0].nodeValue + "<br>";
//             result = nodes.iterateNext();
//         }
//   document.getElementById('demo').innerHTML = txt;
// }

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