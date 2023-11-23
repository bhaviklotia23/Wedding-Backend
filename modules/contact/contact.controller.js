const catchAsyncError = require("../../middleware/catchAsyncError");
const contactModel = require("./contact.model");
const nodemailer = require("nodemailer");


exports.registerContact = catchAsyncError(async (req, res) => {
    try {
      const contactData = req.body;
      const contact = await contactModel.create(contactData);
  
      // Send email 
      const sendEmail = async (recipient, subject, text) => {
        try {
          const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: "dishap4488@gmail.com",
              pass: "vync fwph zzup vexj",
            },
          });
  
          const mailOptions = {
            from: "dishap4488@gmail.com",
            to: recipient,
            subject: subject,
            text: text,
          };
  
          await transporter.sendMail(mailOptions);
        } catch (error) {
          throw new Error("Failed to send email");
        }
      };
  
      // Compose email message
      const emailSubject = "Contact Details";
      const emailMessage = `Email:${contact.email}\nName: ${contact.name}\nMessage: ${contact.description}`;

      // Send email to the contact
      await sendEmail("dishap4488@gmail.com", emailSubject, emailMessage);
  
      res.status(201).json({
        success: true,
        data: contact,
        message: "Request submitted successfully",
      });
    } catch (error) {
      console.error("Error:", error.message);
      res.status(400).json({ success: false, error: error.message });
    }
  });
  

// exports.getContact = catchAsyncError(async (req, res) => {
//   try {
//     const contact = await contactModel.find();
//     res.status(200).json({
//       data: contact,
//       success: true,
//       message: "get all contact data",
//     });
//   } catch (error) {
//     res.status(400).json({ success: false, error: error.message });
//   }
// });
