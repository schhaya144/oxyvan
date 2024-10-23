const volunteerModel = require('../models/volunteer');

const volunteerDetails = async (req, res) => {
  const {
    name,
    address,
    phoneNumber,
    email,
    age,
    occupation,
    reasonForVolunteering,
    priorExperience,
    trainingSession,
    note,
  } = req.body;

  const panCardImage = req.files['panCardImage']
    ? req.files['panCardImage'][0].filename
    : null;
  const aadharImage = req.files['aadharImage']
    ? req.files['aadharImage'][0].filename
    : null;
  const passbookImage = req.files['passbookImage']
    ? req.files['passbookImage'][0].filename
    : null;

  console.log('bodyyy', req.body); 
  console.log(req.files);
  try {
    
    const existingVolunteer = await volunteerModel.findOne({ 
      $or: [{ email: email }, { phoneNumber: phoneNumber }]
    });

    if (existingVolunteer) {
      return res.status(400).json({ message: 'Email or phone number already registered' });
    }




    await volunteerModel.create({
      name,
      address,
      phoneNumber,
      email,
      age,
      occupation,
      reasonForVolunteering,
      priorExperience,
      trainingSession,
      note,
      panCardImage: panCardImage,
      aadharImage: aadharImage,
      passbookImage: passbookImage,
    });

    res.status(201).json({
      message: 'Volunteer details saved successfully',
      success: true,
      error: false,
    });
  } catch (err) {
    console.log('error', err);
    res.status(500).json({
      message: 'Error saving volunteer details',
      success: false,
      error: false,
    });
  }
};

module.exports = volunteerDetails;
