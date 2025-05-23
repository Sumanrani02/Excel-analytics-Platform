import mongoose from 'mongoose';

const uploadSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  filename: String,
  originalname: String,
  data: [{}], // Parsed Excel rows
   status: {
    type: String,
    enum: ['uploaded', 'failed'],
    default: 'uploaded'
  }
}, { timestamps: true }); // Adds createdAt and updatedAt automatically

const Upload = mongoose.model('Upload', uploadSchema);
export default Upload;