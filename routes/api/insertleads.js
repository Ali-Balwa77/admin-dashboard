var express = require('express')
const { sqlCon } = require('../../config/dbConnection')
var router = express.Router()


router.post('/',(req,res,next)=>{
    insertleads(req,res)
})

const insertleads = (req,res)=>{
    
    let leads = req.body
    if(leads.Ownerhome == 1){
        leads['Movingownhome']=3
        leads['Doyouplantomove']=4
        leads['Residentialstatus']=4
        leads['Status']=1
     } 

    console.log("last leads",leads)
    sqlCon.query('INSERT INTO tbl_leads SET ?',leads,(err, result)=>{
        if(err) throw err
    
        if(leads.Countrycode == '+60'){
            if(leads.Contactnumber >= 10){
                res.json({message:'success',status:1,data:'Inserted Data'})
            }else{
                res.json({message:'not working',status:0,data:'Contactnumber must be 10 digits'})
            }
        }else{
            res.json({message:'not working',status:0,data:'Invalid Countrycode'})
        }
       
    })   

}




module.exports = router