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
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const fileIndex = user.files.findIndex(file => file._id.toString() === fileId);
    if (fileIndex === -1) return res.status(404).json({ message: "File not found" });

    user.files.splice(fileIndex, 1);
    await user.save();

    return res.status(200).json({ message: "File deleted successfully" });
  } catch (error) {
    console.error("Error in deleteUserFileByAdmin:", error);
    return res.status(500).json({ message: "Internal server error" });
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