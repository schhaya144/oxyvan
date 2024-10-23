const express = require('express');
const contactUsController = require('../controller/contactController');
const getContactDetails = require('../controller/contactGet');

const router = express.Router();
const multer = require('multer');
const { default: mongoose } = require('mongoose');
const volunteerDetails = require('../controller/volunteerDetails');
const {
  getVolunteer,
  updateVolunteer,
  deleteVolunteer,
} = require('../controller/getVolunteer');
const {
  getUserRecord,
  postUserRecord,
  putUserRecord,
  deletedUserRecord,
} = require('../controller/userRecord');
const {
  getDonnerController,
  updateDonor,
  deleteDoner,
} = require('../controller/donorGet');
const treeCategoryyy = require('../controller/treeCategory');
const treeCategory = require('../controller/treeCategory');
const { paymentController } = require('../controller/payment');
const userSignInController = require('../controller/signIn');
const userSignUpController = require('../controller/signUp');
const { deleteContact, updateContact } = require('../controller/contactUpdateDelete');
const donerVolunteerprofile = require('../controller/donorVolunteerProfile');
const donorProfile = require('../controller/donorProfile');


// storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './files');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage });
// storage

router.get('/profile/:id',donerVolunteerprofile );
router.get('/donors-profile/:id', donorProfile)
// admin login logout 

router.post('/signUp', userSignUpController);
router.post('/signIn', userSignInController);


//contact us routes

router.post('/contact', contactUsController);
router.get('/get-contact', getContactDetails);
router.delete('/delete-contact/:id', deleteContact);
router.put('/update-contact/:id', updateContact)

//contact us routes

// user record routes
router.get('/get-userRecord', getUserRecord);
router.post('/post-userRecord', postUserRecord);
router.put('/putUserRecord/:id', putUserRecord);
router.delete('/delete-userRecord/:id', deletedUserRecord);
// user record routes
require('../models/donor');

// doner controller section
const donerschema = mongoose.model('donorModel');

router.post('/upload-files', upload.single('panCard'), async (req, res) => {
  const {
    name,
    address,
    phone,
    email,
    donationAmount,
    donationType,
    paymentMethod,
    paymentFrequency,
    cardNumber,
    expiryDate,
    chequeNumber,
    bankDetails,
    donationPurpose,
    anonymous,
    updates,
  } = req.body;

  console.log(req.file, req.body);
  const panCard = req.file.filename;
  try {
    const existingDonor = await donerschema.findOne({ 
      $or: [{ email: email }, { phone: phone }]
    });

    if (existingDonor) {
      return res.status(400).json({ message: 'Email or phone number already registered' });
    }

    await donerschema.create({
      name,
      address,
      phone,
      email,
      donationAmount,
      donationType,
      paymentMethod,
      paymentFrequency,
      cardNumber: paymentMethod === 'online' ? cardNumber : null,
      expiryDate: paymentMethod === 'online' ? expiryDate : null,
      chequeNumber: paymentMethod === 'cheque' ? chequeNumber : null,
      bankDetails: paymentMethod === 'bank' ? bankDetails : null,
      donationPurpose,
      anonymous,
      updates,
      panCard: panCard,
    });
    res.send({ status: 'ok' });
  } catch (error) {
    res.json({ status: error });
  }
});

router.get('/doner-get', getDonnerController);
router.put('/update-donor/:id', updateDonor);
router.delete('/delete-donor/:id', deleteDoner);

// voluntieer oprations
router.post(
  '/volunteers',
  upload.fields([
    { name: 'aadharImage', maxCount: 1 },
    { name: 'panCardImage', maxCount: 1 },
    { name: 'passbookImage', maxCount: 1 },
  ]),
  volunteerDetails
);
router.get('/get-Volunteers', getVolunteer);
router.put('/update-volunteer/:id', updateVolunteer);
router.delete('/delete-volunteer/:id', deleteVolunteer);

// payment
router.post('/payment-post',paymentController)

// tree  routing 
router.get('/getuser', treeCategoryyy.getUsers);

// Route to add a new user
router.post('/getuser', treeCategoryyy.addUser);

// Route to update user details
router.put('/getuser/:id', treeCategoryyy.updateUser);

// Route to delete a user
router.delete('/getuser/:id', treeCategoryyy.deleteUser);

module.exports = router;
