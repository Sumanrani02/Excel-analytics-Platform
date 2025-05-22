// dashboardController.js
import Upload from '../models/Upload.js';

export const getDashboardSummary = async (req, res) => {
  try {
    const userId = req.user.id;
    const uploads = await Upload.find({ userId });

    const totalFiles = uploads.length;
    const successfulUploads = uploads.filter(file => file.data?.length > 0).length;
    const failedUploads = totalFiles - successfulUploads;

    res.json({ totalFiles, successfulUploads, failedUploads });
  } catch (err) {
    res.status(500).json({ error: 'Failed to get dashboard summary' });
  }
};

export const getRecentUploads = async (req, res) => {
  try {
    const userId = req.user.id;
    const uploads = await Upload.find({ userId }).sort({ createdAt: -1 }).limit(5);

    const recentUploads = uploads.map(upload => ({
      name: upload.filename,
      date: new Date(upload.createdAt).toLocaleDateString(),
      status: upload.data?.length > 0 ? 'uploaded' : 'failed',
    }));

    res.json(recentUploads);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch recent uploads' });
  }
};

export const getChartData = async (req, res) => {
  try {
    const userId = req.user.id;
    const uploads = await Upload.find({ userId });

    const uploaded = uploads.filter(file => file.data?.length > 0).length;
    const failed = uploads.length - uploaded;

    const chartData = {
      labels: ['Uploaded', 'Failed'],
      data: [uploaded, failed],
    };

    res.json(chartData);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch chart data' });
  }
};
