
export default {
  /**
   * Group a Javascript object by key
   * @param {*} json 
   * @param {*} key 
   */
  groupBy(object, key) {
    return object.reduce(function(row, x) {
      (row[x[key]] = row[x[key]] || []).push(x);
      return row;
    }, {});
  },

  /**
   * Parse a CSV file to JSON
   * @param {*} file 
   */
  async parseCSV(file) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = function() {
        const csv = reader.result;
        // console.log(csv)
        const lines = csv.split("\n");
        let result = [];
        const headers=lines[0].split(",");
        for(let i=1;i<lines.length;i++){
          const obj = {};
          const currentline=lines[i].split(",");
          for(let j=0;j<headers.length;j++){
            obj[headers[j]] = currentline[j];
          }
          result.push(obj);
          }  
          result = JSON.stringify(result); //JSON
          this.fileinput = result;
          return resolve(result)
      }
      reader.readAsText(file);          
    })
  }
}