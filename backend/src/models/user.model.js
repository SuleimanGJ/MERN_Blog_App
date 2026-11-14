import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: true,
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
        select: false
    },
    avatar: {
        type: String
    }
}, { timestamps: true } );



// password hashing

userSchema.pre("save", async function () {
    if(!this.isModified("password")){
        return;
    }
    this.password = await bcrypt.hash(this.password, 10);
});


userSchema.methods.isPasswordCorrect = async function (givenPassword) {
    return await bcrypt.compare(givenPassword, this.password);
};


const User = mongoose.model("User", userSchema);

export default User;


