const mongoose = require("mongoose");

const weddingRegisterSchema = new mongoose.Schema({
  registrar: {
    type: String,
    enum: ["Groom", "Bride", "Other"],
    required: true,
  },
  relative: {
    firstName: {
      type: String,
      required: function () {
        return this.registrar === "Other";
      },
    },
    lastName: {
      type: String,
      required: function () {
        return this.registrar === "Other";
      },
    },
    phoneNumber: {
      type: String,
      required: function () {
        return this.registrar === "Other";
      },
    },
    relationship: {
      type: String,
      required: function () {
        return this.registrar === "Other";
      },
    },
  },
  groom: {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: function () {
        return this.registrar === "Groom";
      },
    },
  },
  bride: {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: function () {
        return this.registrar === "Bride";
      },
    },
  },
  //   featuredImage: {
  //     type: String,
  //     required: true,
  //   },
  story: {
    type: String,
    required: true,
  },
  engagementVideo: {
    type: String,
    required: false,
  },
  daysOfWedding: {
    type: Number,
    required: true,
  },
  guests: {
    type: Number,
    required: true,
  },
  kindOfFood: {
    type: String,
    enum: ["NonVeg", "Veg"],
    required: true,
  },
  alcohol: {
    type: Boolean,
    default: false,
    required: true,
  },
  mainLanguages: [
    {
      type: String,
      required: true,
    },
  ],
  country: {
    type: String,
    required: true,
  },
  daysSchedule: [
    {
      startDt: {
        type: Date,
        required: true,
      },
      time: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      zipcode: {
        type: String,
        required: true,
      },
      street: {
        type: String,
        required: true,
      },
      nameOfVenue: {
        type: String,
        required: true,
      },
      events: [
        {
          eventName: {
            type: String,
            required: true,
          },
          description: {
            type: String,
            required: true,
          },
          includedMeals: {
            type: String,
            required: true,
          },
          dressCode: {
            type: String,
            required: false,
          },
        },
      ],
    },
  ],
  //   payment: {
  //     modeOfPayment: String,
  //   },
});

module.exports = mongoose.model("WeddingRegister", weddingRegisterSchema);
