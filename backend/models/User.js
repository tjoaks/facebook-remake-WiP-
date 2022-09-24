const mongoose = require("mongoose");
const { ObjectID } = mongoose.Schema;
const userSchema = mongoose.Schema(
  {
    first_name: {
      type: String,
      required: [true, "First Name is Required."],
      trim: true,
      text: true,
    },
    last_name: {
      type: String,
      required: [true, "Last Name is Required."],
      trim: true,
      text: true,
    },
    username: {
      type: String,
      required: [true, "Username is Required."],
      trim: true,
      text: true,
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Email is Required."],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is Required."],
    },
    picture: {
      type: String,
      default: "",
    },
    cover: {
      type: String,
      default: "",
    },
    gender: {
      type: String,
      required: [true, "Gender is Required."],
      trim: true,
    },
    bYear: {
      type: String,
      required: [true, "Birth Year is Required."],
      trim: true,
    },
    bMonth: {
      type: String,
      required: [true, "Birth Month is Required."],
      trim: true,
    },
    bDay: {
      type: String,
      required: [true, "Birth Day is Required."],
      trim: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    friends: {
      type: Array,
      default: [],
    },
    following: {
      type: Array,
      default: [],
    },
    followers: {
      type: Array,
      default: [],
    },
    requests: {
      type: Array,
      default: [],
    },
    search: [
      // ****RE ENABLE WHEN USERS ARE CREATED*****
      {
        user: {
          //type: ObjectID,
          //ref: "User",
        },
      },
    ],
    details: {
      bio: {
        type: String,
      },
      otherName: {
        type: String,
      },
      job: {
        type: String,
      },
      workplace: {
        type: String,
      },
      highSchool: {
        type: String,
      },
      college: {
        type: String,
      },
      currentCity: {
        type: String,
      },
      hometown: {
        type: String,
      },
      relationship: {
        type: String,
        enum: ["Single", "In a relationship", "Married", "Divorced"],
      },
      instagram: {
        type: String,
      },
    },
    savedPosts: [
      {
        post: {
          // type: ObjectID,
          //  ref: "Post", // ****RE ENABLE WHEN POSTS ARE CREATED*****
        },
        savedAt: {
          type: Date,
          default: new Date(),
        },
      },
    ],
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
