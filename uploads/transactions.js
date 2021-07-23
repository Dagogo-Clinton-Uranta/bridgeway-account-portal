// Requiring the module
import reader from 'xlsx'

// Reading our test file

const transactions =function(){
const file = reader.readFile('./uploads/CallOver_Report.xlsx')


let transactionstore = []
let finalresult =[]


const sheets = file.SheetNames

for (let i = 0; i < sheets.length; i++) {

    var range = reader.utils.decode_range(file.Sheets[file.SheetNames[i]]['!ref']);
    range.s.r = 3; // <-- zero-indexed, so setting to 1 will skip row 0
    file.Sheets[file.SheetNames[i]]['!ref'] = reader.utils.encode_range(range);



    const temp = reader.utils.sheet_to_json(
        file.Sheets[file.SheetNames[i]],{header:['Financialdate','Transactiondate','Teller','Referencenumber','Accountname','Accountnumber','Nuban','Branch','Debit','Credit','Entrycode','Clientipaddress','Instrumentnumber','Narration']})

    temp.forEach((res) => {
        transactionstore.push(res)
    })
} 

for (let i = 5; i < transactionstore.length; i++) {
      finalresult.push(transactionstore[i])      

}


  return finalresult
}

console.log(transactions()[0])
  

// Printing data





export default transactions 