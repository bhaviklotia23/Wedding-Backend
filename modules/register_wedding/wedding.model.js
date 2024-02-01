const mongoose = require("mongoose");

const weddingRegisterSchema = new mongoose.Schema({
  // register: {
  //   type: String,
  //   enum: ["Groom", "Bride", "Other"],
  // required: true,
  // },
  relative: {
    firstName: {
      type: String,
      // required: function () {
      //   return this.register === "Other";
      // },
    },
    lastName: {
      type: String,
      // required: function () {
      //   return this.register === "Other";
      // },
    },
    phoneNumber: {
      type: String,
      // required: function () {
      //   return this.register === "Other";
      // },
    },
    relationship: {
      type: String,
      // required: function () {
      //   return this.register === "Other";
      // },
    },
  },

  groomfirstName: {
    type: String,
    // required: true,
  },
  groomlastName: {
    type: String,
    // required: true,
  },
  groomemail: {
    type: String,
    // required: true,
  },
  groomphoneNumber: {
    type: String,
    // required: function () {
    //   return this.register === "Groom";
    // },
  },

  bridefirstname: {
    type: String,
    // required: true,
  },
  bridelastname: {
    type: String,
    // required: true,
  },
  brideemail: {
    type: String,
    // required: true,
  },
  bridephoneNumber: {
    type: String,
    // required: function () {
    //   return this.register === "Bride";
    // },
  },

  guidefirstname: {
    type: String,
    // required: true,
  },
  guidelastname: {
    type: String,
    // required: true,
  },
  guideemail: {
    type: String,
    // required: true,
  },
  guidephoneNumber: {
    type: String,
    // required: function () {
    //   return this.register === "Bride";
    // },
  },
  guiderealtionship: {
    type: String,
    // required: true,
  },

  photo: {
    type: String,
  },
  story: {
    type: String,
    // required: true,
  },
  url: {
    type: String,
    // required: true,
  },
  engagementVideo: {
    type: String,
    // required: false,
  },
  daysOfWedding: {
    type: Number,
    // required: true,
  },
  guests: {
    type: Number,
    // required: true,
  },
  kindOfFood: {
    type: String,
    enum: ["NonVeg", "Veg", "Both"],
    // required: true,
  },
  alcohol: {
    type: Boolean,
    default: false,
    // required: true,
  },
  mainLanguages: [
    {
      type: String,
      // required: true,
    },
  ],
  country: {
    type: String,
    // required: true,
  },
  state: {
    type: String,
    // required: true,
  },

  city: {
    type: String,
    // required: true,
  },
  weddingstartDate: {
    type: String,
  },
  weddingendDate: {
    type: String,
  },
  weddingDetails: [
    {
      startDt: {
        type: Date,
        // required: true,
      },
      time: {
        type: String,
        // required: true,
      },
      state: {
        type: String,
        // required: true,
      },
      city: {
        type: String,
        // required: true,
      },
      totalEvents: {
        type: String,
        // required: true,
      },
      address1: {
        type: String,
        // required: true,
      },
      address2: {
        type: String,
        // required: true,
      },

      nameOfVenue: {
        type: String,
        // required: true,
      },
      events: [
        {
          eventName: {
            type: String,
            // required: true,
          },
          description: {
            type: String,
            // required: true,
          },
          // includedMeals: {
          //   type: String,
          // required: true,
          // },
          music: {
            type: String,
            // required: false,
          },
          dressCode: {
            type: String,
            // required: false,
          },
        },
      ],
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  //   payment: {
  //     modeOfPayment: String,
  //   },
});

module.exports = mongoose.model("WeddingRegister", weddingRegisterSchema);
