import xlsx from 'xlsx';
import Upload from '../models/Upload.js';

export const uploadFile = async (req, res) => {
  try {
    const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = xlsx.utils.sheet_to_json(sheet);

    const upload = new Upload({
      userId: req.user.id,
      filename: req.file.filename,
      originalname: req.file.originalname,
      data: jsonData,
    });

    await upload.save();
    res.status(201).json({ message: 'File uploaded & parsed successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to parse file' });
  }
};
