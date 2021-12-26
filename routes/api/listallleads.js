var express = require('express')
var router = express.Router()
var axios = require('axios')
const { sqlCon } = require('../../config/dbConnection')

router.get('/',(req,res)=>{
    let sql = `SELECT * FROM tbl_leads` 
    
    sqlCon.query(sql,(err,data)=>{
        if(err) throw err
        res.json({message:'success',status:1,data})
    })

})
let url = 'http://localhost:3000/listallleads'
axios(url).then(response=>response.data)
.then((leads)=>{
    
})   



module.exports = router