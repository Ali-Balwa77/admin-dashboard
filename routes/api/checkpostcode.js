var express = require('express')
const { sqlCon } = require('../../config/dbConnection')
var router = express.Router()

router.post('/',(req,res,next)=>{
    checkpostcode(req,res)
})

const checkpostcode = (req,res)=>{
    let query = `select * from tbl_postcode where Postcode='${req.body.postcode}'`
    sqlCon.query(query,(err,result)=>{
        if(err) throw err

        if(result[0] != undefined && true ==1){
            res.json({message:'successfully',status:1,data:result[0]})
        }
        else{
            res.json({message:'not working',status:0,data:'Invalid Passcode'})
        }
    })
}



module.exports = router