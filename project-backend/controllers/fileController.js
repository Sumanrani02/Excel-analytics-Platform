import xlsx from 'xlsx';
import Upload from '../models/Upload.js';

export const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = xlsx.utils.sheet_to_json(sheet);

    const upload = new Upload({
      userId: req.user.id,
      filename: req.file.originalname,
      originalname: req.file.originalname,
      data: jsonData,
    });

    await upload.save();
    res.status(201).json({ message: 'File uploaded & parsed successfully' });
  } catch (error) {
    console.error("Error in uploadFile controller:", error);
    res.status(500).json({ error: 'Failed to parse file' });
  }
};
export const getUploadHistory = async (req, res) => {
  try {
    const uploads = await Upload.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(uploads);
  } catch (error) {
    console.error('Failed to fetch upload history:', error);
    res.status(500).json({ error: 'Failed to fetch upload history' });
  }
};