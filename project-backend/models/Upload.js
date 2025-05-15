import mongoose from 'mongoose';

const uploadSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  filename: String,
  originalname: String,
  data: [{}], // Parsed Excel rows
  uploadedAt: { type: Date, default: Date.now }
});

const Upload = mongoose.model('Upload', uploadSchema);
export default Upload;
