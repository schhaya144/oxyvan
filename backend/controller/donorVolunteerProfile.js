const DonerMOdel = require("../models/donor");
const volunteerModel = require("../models/volunteer");


// Fetch all profile data and check if a volunteer is also a donor
const donerVolunteerProfile = async (req, res) => {
  const { id } = req.params;

  try {
    // Fetch volunteer details by ID
    const volunteer = await volunteerModel.findById(id);
    if (!volunteer) {
      return res.status(404).json({ success: false, message: 'Volunteer not found' });
    }

    // Check if the volunteer's email is also present in the Donor collection
    const donor = await DonerMOdel.findOne({ email: volunteer.email });

    // Send response with profile details and donor status
    res.json({
      success: true,
      data: {
        ...volunteer.toObject(),
        isDonor: !!donor, // 'true' if found in donor collection, otherwise 'false'
      },
    });
  } catch (error) {
    console.error('Error fetching profile details:', error);
    res.status(500).json({ success: false, message: 'An error occurred while fetching profile details' });
  }
};


module.exports = donerVolunteerProfile;
