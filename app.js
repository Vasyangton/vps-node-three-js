const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(__dirname + '/public'));
app.use('/build/', express.static(path.join(__dirname,'node_modules/three/build')));
app.use('/jsm/',express.static(path.join(__dirname,'node_modules/three/examples/jsm')));


const portfinder = require('portfinder');

app.get('/', (req, res) => {
  res.json({ok: 1})
}) 

async function main() {
  const port = await portfinder.getPortPromise()
  app.listen(port, () => {
    console.log(`listening on port ${port}`)
  })
}

main()


