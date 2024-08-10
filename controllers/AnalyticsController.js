


import adminUser from '../models/UserSchema.js';
import project from '../models/ProjectsSchema.js';
import Message from '../models/MessageSchema.js';
import achievement from '../models/AchievementSchema.js';

export const getAnalyticsData = async (req, res) => {
    try {
        // Fetch counts
        const userCount = await adminUser.countDocuments();
        const projectCount = await project.countDocuments();
        const messageCount = await Message.countDocuments();
        
        // Fetch achievements count and details
        const achievements = await achievement.find().select('name value').exec();

        res.status(200).json({
            userCount,
            projectCount,
            messageCount,
            achievements
        });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
