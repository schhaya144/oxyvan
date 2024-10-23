const ContactModel = require("../models/contact");

async function contactUsController(req, res) {
    const {name, numberMobile,  email, msg } = req.body;
    try {
        const addContactDetails = new ContactModel({
            numberMobile,
            name,
            email,
            msg
        });

        
        await addContactDetails.save();

        res.status(200).json({
            message: "Contact details added successfully",
            data: addContactDetails,
            success: true,
            error: false
        });
    } catch (err) {
        res.status(500).json({
            message: "Contact details were not stored",
            success: false,
            error: true,
            details: err.message 
        });
    }
}

module.exports = contactUsController;
