import mongoose, { Document } from "mongoose"
import bcrypt from "bcrypt"


interface IUser extends Document {
    userName: string
    password: string
    favouriteCities?: string[]
    comparePassword(candidatePassword: string): Promise<boolean>;
}


const UserSchema = new mongoose.Schema<IUser>({
    userName: {
        type: String,
        require: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        require: true,
        minlength: [6, "Password must be at least 6 characters"],
    },
    favouriteCities: {
        type: [String],
        require: false,

    }
}, {
    timestamps: true
})

UserSchema.pre<IUser>("save", async function (next) {
    if (!this.isModified("password")) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    }
    catch (error) {
        next(error as Error);
    }
})

UserSchema.methods.comparePassword = async function (
    userPassword: string
): Promise<boolean> {
    return bcrypt.compare(userPassword, this.password);
};

export default mongoose.model("User", UserSchema, "users")