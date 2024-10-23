const volunteerModel = require('../models/volunteer');

const getVolunteer = async (req, res) => {
  try {
    const volunteers = await volunteerModel.find();
    console.log('volunteers', volunteers);
    res.status(200).json({
      message: 'Volunteer details retrieved successfully',
      data: volunteers,
      success: true,
      error: false,
    });
  } catch (err) {
    console.log('Error:', err);
    res.status(500).json({
      message: 'Error retrieving volunteer details',
      err,
      success: false,
      error: true,
    });
  }
};

//  update volunteer form

const updateVolunteer = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    console.log(updatedData);
    const updatedVolunteer = await volunteerModel.findByIdAndUpdate(
      id,
      updatedData,
      { new: true }
    );
    if (!updatedVolunteer) {
      return res.status(404).json({
        message: 'Volunteer not found',
        success: false,
        error: true,
      });
    }

    res.status(200).json({
      data: updatedVolunteer,
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
const deleteVolunteer = async (req, res) => {
  try {
    const formid = req.params.id;
    const deletedVolunteer = await volunteerModel.findByIdAndDelete(formid);
    console.log('idddddddddd', formid);
    if (!deletedVolunteer) {
      return res.status(404).json({
        message: 'Volunteer not found',
        success: false,
        error: true,
      });
    }

    res.status(200).json({
      message: 'Volunteer deleted successfully',
      data: deletedVolunteer,
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

module.exports = { getVolunteer, updateVolunteer, deleteVolunteer };
