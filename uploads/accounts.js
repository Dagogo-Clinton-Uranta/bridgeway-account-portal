 // Requiring the module
import reader from 'xlsx'

// Reading our test file
const file = reader.readFile('./uploads/CABA.xlsx')


let accounts = []



const sheets = file.SheetNames

for (let i = 0; i < sheets.length; i++) {

    var range = reader.utils.decode_range(file.Sheets[file.SheetNames[i]]['!ref']);
    range.s.r = 3; // <-- zero-indexed, so setting to 1 will skip row 0
    file.Sheets[file.SheetNames[i]]['!ref'] = reader.utils.encode_range(range);



    const temp = reader.utils.sheet_to_json(
        file.Sheets[file.SheetNames[i]],{header:['Name','Producttype','Branch','Region','Accountno','Nubanno','Employeecode','Ledgerbalance','Availablebalance','Withdrawablebalance','Accountoff','Introducername','Bvn','Referenceno','Status','Lastinactivity','Sn']})

    temp.forEach((res) => {
        accounts.push(res)
    })
}

  /*let accounts = {details:accountArray}*/
/*let accountsPart1 = accounts.slice(0,Math.ceil(accounts.length/200))
let accountsPart2 = accounts.slice(Math.ceil(accounts.length*1/200),Math.ceil(accounts.length *2/200))
let accountsPart3 = accounts.slice(Math.ceil(accounts.length*2/5),Math.ceil(accounts.length *3/5))
let accountsPart4 = accounts.slice(Math.ceil(accounts.length*3/5),Math.ceil(accounts.length *4/5))
let accountsPart5 = accounts.slice(Math.ceil(accounts.length*4/5),Math.ceil(accounts.length + 1))*/

// Printing data
console.log(typeof(accounts[6].Nubanno)/*,accountsPart3.length,accountsPart4.length,accountsPart5.length*/)

export default accounts /*{accountsPart1,accountsPart2,accountsPart3,accountsPart4,accountsPart5}*/