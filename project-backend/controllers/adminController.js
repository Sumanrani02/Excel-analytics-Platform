import User  from '../models/User.js';
import Upload from '../models/Upload.js';


export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password').populate('files').lean(); // Exclude passwords

    res.json({ users});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    await Upload.deleteMany({ user: userId });
    await User.findByIdAndDelete(userId);
    res.json({ message: 'User and their files deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// adminController.js

export const deleteUserFileByAdmin = async (req, res) => {
 const { userId, fileId } = req.params;

  try {
    // Optional: Check if file belongs to userId
    const file = await Upload.findOne({ _id: fileId, userId: userId });
    if (!file) return res.status(404).json({ message: "File not found" });

    await Upload.findByIdAndDelete(fileId);

    res.status(200).json({ message: "File deleted successfully" });
  } catch (error) {
    console.error("Delete file error:", error);
    res.status(500).json({ message: "Failed to delete file" });
  }
};


export const getAllUsersWithFiles = async (req, res) => {
  try {
    const users = await User.find();

    const usersWithFiles = await Promise.all(
      users.map(async (user) => {
        const files = await Upload.find({ userId: mongoose.Types.ObjectId(user._id) });
        return { ...user.toObject(), files };
      })
    );

    res.status(200).json({ users: usersWithFiles });
  } catch (err) {
    console.error("Error fetching users with files:", err);
    res.status(500).json({ error: "Failed to fetch users" });
  }
};