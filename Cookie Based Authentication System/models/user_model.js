const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Provide a name"],
        minlength: 3,
        maxlength: 50,
    },
    email: {
        type: String,
        required: [true, "Provide an email"],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Provide a valid email",
        ],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Provide a password"],
        minlength: 6,
    },
});

//hashing the password

UserSchema.pre("save", async function() {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

//compare passwords

UserSchema.methods.compareSchema = async(password) => {
    const isMatch = await bcrypt.compare(password, this.password);
    return isMatch;
};

module.exports = mongoose.model("User", UserSchema);