import achievement from '../models/AchievementSchema.js'; // Adjust the path as needed
import section from '../models/SectionSchema.js';
import multer from 'multer';
import bucket from "../firebaseConfig/FirebaseConfig.js";
import { getDownloadURL } from "firebase-admin/storage";

const storage = multer.memoryStorage();
const media = multer({ storage: storage }).single('sectionMediaUrl');

export const aboutUsUpdateController = async (req, res) => {
  media(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ message: 'Multer Error', error: err.message });
    } else if (err) {
      return res.status(500).json({ message: 'Unexpected error during file upload', error: err.message });
    }

    const { sectionText, imageChange } = req.body;

    try {
      // Find the document by sectionName 'aboutUs'
      const aboutUsSection = await section.findOne({ sectionName: 'aboutUs' });

      if (!aboutUsSection) {
        return res.status(404).json({ message: 'Section not found' });
      }

      // Update the sectionText field
      if (sectionText) {
        aboutUsSection.sectionText = sectionText;
      }

      // Handle image update if imageChange is 'true' and sectionMediaUrl is provided
      if (imageChange === 'true' && req.file) {
        const file = req.file;

        // Sanitize file name
        const sanitizedFileName = file.originalname.replace(/[^a-zA-Z0-9.\-_]/g, '');
        const filePath = `homepage/${sanitizedFileName}`;

        // Create a write stream to upload to Firebase Storage
        const blob = bucket.file(filePath);
        const blobStream = blob.createWriteStream({
          metadata: {
            contentType: file.mimetype,
          },
        });

        // Handle errors during upload
        blobStream.on('error', (err) => {
          return res.status(500).json({ message: 'Failed to upload image to Firebase', error: err.message });
        });

        // Handle successful upload
        blobStream.on('finish', async () => {
          // Delete old image from Firebase Storage
          if (aboutUsSection.sectionFileName[0]) {
            await bucket.file(`homepage/${aboutUsSection.sectionFileName[0]}`).delete();
          }

          // Get updated image URL
          const imageUrl = await getDownloadURL(blob);

          // Update section document with new data
          aboutUsSection.sectionMediaUrl = imageUrl;
          aboutUsSection.sectionFileName[0] = sanitizedFileName;

          await aboutUsSection.save();

          res.status(200).json({ message: 'Section updated successfully', data: aboutUsSection });
        });

        blobStream.end(file.buffer); // End the stream with file buffer data
      } else {
        // No image change, update sectionText only
        await aboutUsSection.save();

        res.status(200).json({ message: 'Section updated successfully', data: aboutUsSection });
      }
    } catch (error) {
      res.status(500).json({ message: 'Failed to update section', error: error.message });
    }
  });
};


export const ourMissionOurTechnologiesUpdateController = async (req, res) => {
  

  media(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ message: 'Multer Error', error: err.message });
    } else if (err) {
      return res.status(500).json({ message: 'Unexpected error during file upload', error: err.message });
    }

    const { sectionText1, sectionText2, imageChange } = req.body;

    try {
      // Find both sections first
      let ourMissionSection = await section.findOne({ sectionName: 'ourMission' });
      let ourTechnologiesSection = await section.findOne({ sectionName: 'ourTechnologies' });

      // Check if both sections exist
      if (!ourMissionSection || !ourTechnologiesSection) {
        return res.status(404).json({ message: 'One or both sections not found' });
      }

      // Update 'ourMission' section
      if (sectionText1) {
        ourMissionSection.sectionText = sectionText1;
      }

      // Update 'ourTechnologies' section
      if (sectionText2) {
        ourTechnologiesSection.sectionText = sectionText2;
      }

      // Handle image update if imageChange is 'true' and sectionMedia is provided
      if (imageChange === 'true' && req.file) {
        const file = req.file;

        // Sanitize file name
        const sanitizedFileName = file.originalname.replace(/[^a-zA-Z0-9.\-_]/g, '');
        const filePath = `homepage/${sanitizedFileName}`;

        // Create a write stream to upload to Firebase Storage
        const blob = bucket.file(filePath);
        const blobStream = blob.createWriteStream({
          metadata: {
            contentType: file.mimetype,
          },
        });

        // Handle errors during upload
        blobStream.on('error', (err) => {
          return res.status(500).json({ message: 'Failed to upload image to Firebase', error: err.message });
        });

        // Handle successful upload
        blobStream.on('finish', async () => {
          // Delete old images from Firebase Storage if they exist
          if (ourMissionSection.sectionFileName[0]) {
            await bucket.file(`homepage/${ourMissionSection.sectionFileName[0]}`).delete();
          }
  
          // Get updated image URL
          const imageUrl = await getDownloadURL(blob);

          // Update section documents with new data
          ourMissionSection.sectionMediaUrl = imageUrl;
          ourMissionSection.sectionFileName[0] = sanitizedFileName;

          ourTechnologiesSection.sectionMediaUrl = imageUrl;
          ourTechnologiesSection.sectionFileName[0] = sanitizedFileName;

          // Save the updates to both sections
          await ourMissionSection.save();
          await ourTechnologiesSection.save();

          res.status(200).json({ message: 'Sections updated successfully', data: { ourMissionSection, ourTechnologiesSection } });
        });

        blobStream.end(file.buffer); // End the stream with file buffer data
      } else {
        // No image change, update sectionText only
        await ourMissionSection.save();
        await ourTechnologiesSection.save();

        res.status(200).json({ message: 'Sections updated successfully', data: { ourMissionSection, ourTechnologiesSection } });
      }
    } catch (error) {
      res.status(500).json({ message: 'Failed to update sections', error: error.message });
    }
  });
};


const header = multer({ storage: storage }).fields([
  { name: 'videoFile', maxCount: 1 },
  { name: 'imageFile', maxCount: 1 }
]);


export const updateHeader = async (req, res) => {
  header(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ message: 'Multer Error', error: err.message });
    } else if (err) {
      return res.status(500).json({ message: 'Unexpected error during file upload', error: err.message });
    }

    const { sectionText, videoChange0, imageChange1 } = req.body;
    const { videoFile, imageFile } = req.files || {};

    try {
      // Find the document by sectionName 'header'
      let headerSection = await section.findOne({ sectionName: 'header' });

      if (!headerSection) {
        return res.status(404).json({ message: 'Header section not found' });
      }

      // Handle video file upload if videoChange0 is 'true'
      if (videoChange0 === 'true' && videoFile) {
        await handleVideoUpload(headerSection, videoFile[0]);
      }

      // Handle image file upload if imageChange1 is 'true'
      if (imageChange1 === 'true' && imageFile) {
        await handleImageUpload(headerSection, imageFile[0]);
      }

      // Update the sectionText field
      if (sectionText) {
        headerSection.sectionText = sectionText;
      }

      // Save header section after all updates
      await headerSection.save();
      res.status(200).json({ message: 'Header section updated successfully', data: headerSection });
    } catch (error) {
      res.status(500).json({ message: 'Failed to update header section', error: error.message });
    }
  });
};

// Helper function to handle video file upload
const handleVideoUpload = async (headerSection, videoFile) => {
  try {
    // Sanitize file name
    const sanitizedFileName = videoFile.originalname.replace(/[^a-zA-Z0-9.\-_]/g, '');
    const filePath = `homepage/${sanitizedFileName}`;

    // Create a write stream to upload to Firebase Storage
    const blob = bucket.file(filePath);
    const blobStream = blob.createWriteStream({
      metadata: {
        contentType: videoFile.mimetype,
      },
    });

    // Handle errors during upload
    blobStream.on('error', (err) => {
      throw new Error('Failed to upload video to Firebase');
    });

    // Handle successful upload
    blobStream.on('finish', async () => {
      // Delete old video from Firebase Storage if it exists
      if (headerSection.sectionFileName[0]) {
        await bucket.file(`homepage/${headerSection.sectionFileName[0]}`).delete();
      }

      // Get updated video URL
      const videoUrl = await getDownloadURL(blob);

      // Update section document with new video data
      headerSection.sectionMediaUrl[0] = videoUrl;
      headerSection.sectionFileName[0] = sanitizedFileName;

      // Save header section after video update
      await headerSection.save();
    });

    blobStream.end(videoFile.buffer); // End the stream with file buffer data
  } catch (error) {
    throw new Error('Failed to handle video upload');
  }
};

// Helper function to handle image file upload
const handleImageUpload = async (headerSection, imageFile) => {
  try {
    // Sanitize file name
    const sanitizedFileName = imageFile.originalname.replace(/[^a-zA-Z0-9.\-_]/g, '');
    const filePath = `homepage/${sanitizedFileName}`;

    // Create a write stream to upload to Firebase Storage
    const blob = bucket.file(filePath);
    const blobStream = blob.createWriteStream({
      metadata: {
        contentType: imageFile.mimetype,
      },
    });

    // Handle errors during upload
    blobStream.on('error', (err) => {
      throw new Error('Failed to upload image to Firebase');
    });

    // Handle successful upload
    blobStream.on('finish', async () => {
      // Delete old image from Firebase Storage if it exists
      if (headerSection.sectionFileName[1]) {
        await bucket.file(`homepage/${headerSection.sectionFileName[1]}`).delete();
      }

      // Get updated image URL
      const imageUrl = await getDownloadURL(blob);

      // Update section document with new image data
      headerSection.sectionMediaUrl[1] = imageUrl;
      headerSection.sectionFileName[1] = sanitizedFileName;

      // Save header section after image update
      await headerSection.save();
    });

    blobStream.end(imageFile.buffer); // End the stream with file buffer data
  } catch (error) {
    throw new Error('Failed to handle image upload');
  }
};


export const achievementAdd=async(req,res)=>{
  try {
    const newAchievement = new achievement(req.body);
    const savedAchievement = await newAchievement.save();
    res.status(201).json(savedAchievement);
  } catch (error) {
    res.status(500).json({ message: "Error adding achievement", error });
  }
}



export const achievementUpdate = async(req,res)=>{
  try {
    const updatedAchievement = await achievement.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedAchievement) {
      return res.status(404).json({ message: "Achievement not found" });
    }
    res.json(updatedAchievement);
  } catch (error) {
    res.status(500).json({ message: "Error updating achievement", error });
  }
}

export const achievementDelete = async(req,res)=>{
  try {
    const deletedAchievement = await achievement.findByIdAndDelete(req.params.id);
    if (!deletedAchievement) {
      return res.status(404).json({ message: "Achievement not found" });
    }
    res.json({ message: "Achievement deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting achievement", error });
  }
}