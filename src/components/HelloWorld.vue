<template>
<div class="container">
  <div class="row justify-content-center">
    <div class="col-sm-6 ">
      <h3>Billable Hours</h3>
      <form enctype="multipart/form-data">
      <div class="form-group">
        <label for="exampleInputEmail1">Enter CSV File</label>
        <input @change="onFileChange($event)" type="file" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter token amount">
      </div>
    </form>
    </div>
  </div>
  <template v-if="companies.length > 0">
    <div v-for="(company, index) in companies" :key="index" :id="index" class="row justify-content-center mb-1">
      <div v-if="show == index" class="col-sm-8 ">
        <h3 class="col-md-12 text-left mb-2">Company: {{company[0]}}</h3>
        <table>
          <tr style="background-color: #dddddd">
            <th>Employee ID</th>
            <th>Number of Hours</th>
            <th>Unit Price</th>
            <th>Cost</th>
          </tr>
          <tr v-for="(entry, entryIndex) in company[1]" :key="entryIndex">
            <td>{{entry['Employee ID']}}</td>
            <td>{{entry['Total Time']}}</td>
            <td>{{entry['Billable Rate (per hour)']}}</td>
            <td>{{entry['Cost']}}</td>
          </tr>
          <tr style="background-color: #dddddd">
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>Total</td>
            <td>{{company[2]}}</td>
          </tr>
        </table>
      </div>
    </div>
    
    <button style="margin-right: 20px;" @click="show--" v-if="show > 0" type="button">Previous</button>
    <button @click="show++" v-if="show < companies.length - 1" type="button">Next</button>
    <button style="margin-left: 20px;" @click="printElem(index)" class="text-right" type="button">print</button>
  </template>
  
</div>
</template>

<script>
// const {createInput, groupBy} = require('../funcs')
import helpers from '@/funcs'
export default {
  name: 'HelloWorld',
  data: function () {
    return {
      fileinput: '',
      companies: '',
      show: 0,
      cost: {},
      notificationSystem: {
        options: {
          ballon: {
            position: 'topRight'
          },
          info: {
            position: 'topRight'
          },
          success: {
            position: 'topRight'
          },
          warning: {
            position: 'topRight'
          },
          error: {
            position: 'topRight'
          }
        }
      }
    }
  },
  mounted () {
  },
  methods: {
    /**
       * Set filename of document
       */
      // async parseFile (event) {
      //   const file = event.target.files[0]
      //   console.log(file)
      //   const parser = await parse(file)
      //   console.log(parser)
      // }
      printElem(divId) {
        var content = document.getElementById(divId).innerHTML;
        var mywindow = window.open('', 'Print', 'height=600,width=800');

        mywindow.document.write('<html><head><title>Print</title>');
        mywindow.document.write('</head><body >');
        mywindow.document.write(content);
        mywindow.document.write('</body></html>');

        mywindow.document.close();
        mywindow.focus()
        mywindow.print();
        mywindow.close();
        return true;
      },

      async onFileChange(e) {
        var files = e.target.files || e.dataTransfer.files;
        if (!files.length)
          return;
        let res = await helpers.parseCSV(files[0]);
        res = JSON.parse(res)
        
        this.companies = helpers.groupBy(res, 'Project')
        this.companies = Object.entries(this.companies)
        this.companies.splice(this.companies.length - 1, 1)
        this.companies.map((company) => {
          let totalCost = 0
          for (let index = 0; index < company[1].length; index++) {
            company[1][index]["Total Time"] = parseInt(company[1][index]['End Time'], 10) - parseInt(company[1][index]['Start Time'], 10)
            company[1][index]["Cost"] = parseInt(company[1][index]["Total Time"], 10) * parseInt(company[1][index]['Billable Rate (per hour)'], 10)
            totalCost += company[1][index]["Cost"]
          }
          company[2] = totalCost
        })
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td, th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}
</style>
