const donorModel = require('../models/donor');

const getDonnerController=async (req,res)=>{
 try{
    const donerData= await donorModel.find()
    
    res.status(200).json({
        data:donerData,
        message:"Got the donor data",
        success:true,
        error:false
    })
 }catch(err){
    res.status(500).json(
      {
        message:err,
        success:false,
        error:true
      }
    )
 }
}



//  update volunteer form

const updateDonor = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    console.log(updatedData);
    const updatedDonor = await donorModel.findByIdAndUpdate(
      id,
      updatedData,
      { new: true }
    );
    if (!updatedDonor) {
      return res.status(404).json({
        message: 'Volunteer not found',
        success: false,
        error: true,
      });
    }

    res.status(200).json({
      data: updatedDonor,
      message: 'Volunteer data updated succesfully',
      success: true,
      error: false,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Form data not update' || error,
      error: true,
      success: false,
    });
  }
};

// Delete volunteer
const deleteDoner= async (req, res) => {
  try {
    const formid = req.params.id;
    const deletedDoner = await donorModel.findByIdAndDelete(formid);
    console.log('idddddddddd', formid);
    if (!deletedDoner) {
      return res.status(404).json({
        message: 'Volunteer not found',
        success: false,
        error: true,
      });
    }

    res.status(200).json({
      message: 'Volunteer deleted successfully',
      data: deletedDoner,
      success: true,
      error: false,
    });
  } catch (err) {
    console.log('Error:', err);
    res.status(500).json({
      message: 'Error deleting volunteer',
      err,
      success: false,
      error: true,
    });
  }
};
module.exports={getDonnerController, updateDonor, deleteDoner}