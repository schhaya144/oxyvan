const DonerMOdel = require("../models/donor");
const volunteerModel = require("../models/volunteer");

const donorProfile = async(req, res)=>{
    const { id } = req.params;

  try {
    // Find the donor by ID
    const donor = await DonerMOdel.findById(id);
    console.log(donor)

    if (!donor) {
      return res.status(404).json({ success: false, message: 'Donor not found' });
    }

    // Check if the donor is also a volunteer by searching for their email
    const volunteer = await volunteerModel.findOne({ email: donor.email });

    // If the donor is also a volunteer, include the volunteer details
    let volunteerDetails = null;
    if (volunteer) {
      volunteerDetails = {
        name: volunteer.name,
        address: volunteer.address,
        phoneNumber: volunteer.phoneNumber,
        age: volunteer.age,
        occupation: volunteer.occupation,
        aadharImage: volunteer.aadharImage,
        panCardImage: volunteer.panCardImage,
        passbookImage: volunteer.passbookImage,
        reasonForVolunteering: volunteer.reasonForVolunteering,
        priorExperience: volunteer.priorExperience,
        trainingSession: volunteer.trainingSession,
        note: volunteer.note,
      };
    }

    // Send response with donor data and volunteer details if applicable
    return res.status(200).json({
      success: true,
      data: {
        donor,
        isVolunteer: volunteer ? true : false,
        volunteerDetails: volunteerDetails,
      },
    });
  } catch (error) {
    console.error('Error fetching donor profile:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports=donorProfile






