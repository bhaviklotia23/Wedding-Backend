const catchAsyncError = require("../../middleware/catchAsyncError");
const weddingModel = require("./wedding.model");

exports.registerWedding = catchAsyncError(async (req, res) => {
  try {
    const weddingData = req.body;
    const wedding = await weddingModel.create(weddingData);
    res.status(201).json({ success: true, data: wedding });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

exports.getAllWeddings = catchAsyncError(async (req, res) => {
  try {
    const data = await weddingModel.find();
    res.status(200).json({ success: true, data: data });
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
