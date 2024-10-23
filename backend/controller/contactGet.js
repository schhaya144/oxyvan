const ContactModel = require("../models/contact")

async function getContactDetails(req, res){
    try{
        const getDetails=await ContactModel.find()

        res.status(200).json({
            message:"contact details get succesfully",
            data:getDetails,
            success:true,
            error:false
        })
        
    }catch(err){
     res.status(500).json({
        message:"can not get the contact details",
        success:false,
        error:true
     })
    }
}
module.exports = getContactDetails