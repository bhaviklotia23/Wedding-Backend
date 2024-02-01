const catchAsyncError = require("../../middleware/catchAsyncError");
const weddingModel = require("./wedding.model");
const cloudinary = require("cloudinary").v2;
const util = require("util");

cloudinary.config({
  cloud_name: "dv2a30mpl",
  api_key: "824685227364465",
  api_secret: "gPbHxldWlobV2LttLN2kTcIfpCQ",
});

exports.registerWedding = catchAsyncError(async (req, res) => {
  try {
    const weddingData = req.body;
    const file = req.files.photo;

    const weddingDetails = [];
    let i = 0;
    while (weddingData[`weddingDetails[${i}][startDt]`]) {
      const events = [];
      let j = 0;
      while (weddingData[`weddingDetails[${i}][events][${j}][eventName]`]) {
        events.push({
          eventName:
            weddingData[`weddingDetails[${i}][events][${j}][eventName]`],
          description:
            weddingData[`weddingDetails[${i}][events][${j}][description]`],
          music: weddingData[`weddingDetails[${i}][events][${j}][music]`],
          dressCode:
            weddingData[`weddingDetails[${i}][events][${j}][dressCode]`],
        });
        j++;
      }

      weddingDetails.push({
        startDt: weddingData[`weddingDetails[${i}][startDt]`],
        time: weddingData[`weddingDetails[${i}][time]`],
        state: weddingData[`weddingDetails[${i}][state]`],
        city: weddingData[`weddingDetails[${i}][city]`],
        totalEvents: weddingData[`weddingDetails[${i}][totalEvents]`],
        address1: weddingData[`weddingDetails[${i}][address1]`],
        address2: weddingData[`weddingDetails[${i}][address2]`],
        nameOfVenue: weddingData[`weddingDetails[${i}][nameOfVenue]`],
        events,
      });

      i++;
    }

    const cloudinaryUpload = util.promisify(cloudinary.uploader.upload);
    const result = await cloudinaryUpload(file.tempFilePath);

    const wedding = await weddingModel.create({
      ...weddingData,
      weddingDetails,
      photo: result.secure_url,
    });

    res.status(201).json({ success: true, data: wedding });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, error: "Something went wrong" });
  }
});

exports.getAllWeddings = catchAsyncError(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const perPage = 10;

  try {
    const totalWeddingsCount = await weddingModel.countDocuments();
    const weddings = await weddingModel
      .find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * perPage)
      .limit(perPage);

    res.status(200).json({
      data: weddings,
      currentPage: page,
      total: totalWeddingsCount,
      success: true,
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

exports.getWedding = catchAsyncError(async (req, res) => {
  try {
    const wedding = await weddingModel.findById(req.params.id);
    if (!wedding) {
      return res.status(404).json({ error: "Wedding not found" });
    }
    res.status(200).json({ success: true, data: wedding });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});
