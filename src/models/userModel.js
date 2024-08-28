import mongoose from "mongoose";
import bcrypt from "bcrypt";
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["user", "vendor", "admin"],
      default: "user",
    },
    address: {
      street: String,
      city: String,
      state: String,
      zip: String,
      country: String,
    },
    phone: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// hash password before storing
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// compare password 
userSchema.methods.comparePassword = async function (
  candidatePassword,
  userPassword
) {
  console.log("candidatePasswor-userPassword", candidatePassword, userPassword);
  console.log(await bcrypt.compare(candidatePassword, userPassword));

  return await bcrypt.compare(candidatePassword, userPassword);
};

export const User = mongoose.model("User", userSchema);
