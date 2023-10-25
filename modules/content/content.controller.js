// about.controller.js
const catchAsyncError = require("../../middleware/catchAsyncError");
const AppError = require("../../utils/errorHandler");
const { contentSchema } = require("../../validators/contentValidations");
const Content = require("./content.model");

// Create Content
exports.upsertContent = catchAsyncError(async (req, res) => {
  try {
    const { description, title } = await contentSchema.validate(req.body);

    const existingContent = await Content.findOne({ title });

    if (existingContent) {
      // If content with the same title exists, update it
      existingContent.description = description;
      existingContent.updatedAt = new Date();
      await existingContent.save();
      return res
        .status(200)
        .json({ status: 200, success: true, data: existingContent });
    } else {
      // If content with the same title doesn't exist, create a new one
      const content = await Content.create({ title, description });
      return res
        .status(201)
        .json({ status: 201, success: true, data: content });
    }
  } catch (error) {
    return res.status(500).json({
      status: 500,
      success: false,
      message: error.message || "Internal server error",
    });
  }
});

// Update Content
// exports.updateContent = catchAsyncError(async (req, res) => {
//   try {
//     const { description, title } = await contentSchema.validate(req.body);

//     const id = req.params.id;

//     let content = await Content.findById({ _id: id });

//     if (!content) {
//       return res.status(404).json({
//         status: 404,
//         success: false,
//         message: "Content not found",
//       });
//     }

//     content.title = title;
//     content.description = description;
//     content.updatedAt = new Date();
//     await content.save();

//     return res.status(200).json({ status: 200, success: true, data: content });
//   } catch (error) {
//     return res.status(500).json({
//       status: 500,
//       success: false,
//       message: error.message || "Internal server error",
//     });
//   }
// });

exports.getContentDetail = catchAsyncError(async (req, res) => {
  try {
    const { title } = req.query;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "No Content Found",
      });
    }

    const content = await Content.findOne({ title });
    if (!content) {
      return res.status(200).json({
        success: true,
        message: "No Content Found",
      });
    }

    const contentData = {
      title: content?.title,
      description: content?.description,
    };

    return res.status(200).json({ status: 200, success: true, data: contentData });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: 500,
      success: false,
      message: error.message || "Internal server error",
    });
  }
});

exports.getContentList = catchAsyncError(async (req, res) => {
  try {
    const content = await Content.find();

    if (!content || content.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No Data Found",
      });
    }

    const contentData = content.map((item) => ({
      id: item._id,
      title: item.title,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    }));

    return res
      .status(200)
      .json({ status: 200, success: true, data: contentData });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: 500,
      success: false,
      message: error.message || "Internal server error",
    });
  }
});
