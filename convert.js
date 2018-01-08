const fs = require('fs');
const path = require('path');
const csv = require('csvtojson');

//create a function called convertCSV, set default name and output name too
const convertCSV = (name = 'customer-data.csv', output = 'customer-data.json') => {
  //expand names to full paths
  const location = path.join(__dirname,name);
  const jsonName = path.join(__dirname,output);
  console.log("converting", location, "to JSON");
  //variable to store entire json
  var json = [];
  csv()
  .fromFile(location)
  .on('json', (jsonObj) => {
    //add a new json to the json array on each json
    json.push(jsonObj);
  })
  .on('done', (error) =>{
    if(error)console.error(error);
    //write the json to a file, format the json to a string
    fs.writeFile(jsonName,JSON.stringify(json,null,'\t'),(error) =>{
      if(error) console.error(error);
      console.log(jsonName,'created');
    });
  });
}
//call, and pass the command line arguments to the function
convertCSV(process.argv[2],process.argv[3]);
