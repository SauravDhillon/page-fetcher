const fs = require('fs');
const needle = require('needle');
// receive input from command line arguments
const [url, localPath] = process.argv.slice(2);

needle.get(url, (err, response, body) => {
  if (err) {
    console.log('An error occured while requesting data from server', err);
  }
  //console.log('statusCode:', response && response.statusCode);
  //console.log('body:' , body);
  fs.writeFile(localPath, response.body, err => {
    if (err) {
      console.log("An error happened while writing to file", err);
    }
    fs.stat(localPath, (err, stats) => {
      //node error -first callbacks
      if (err) {
        console.error("Error getting file stats:", err);
      }
      console.log(`Downloaded and saved ${stats.size} bytes to ${localPath}`);
    });
  });
});

