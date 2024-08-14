import project from "../models/ProjectsSchema.js";
import multer from 'multer';
import bucket from "../firebaseConfig/FirebaseConfig.js";
import { getDownloadURL } from "firebase-admin/storage";



const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single('mediaUrl'); // Adjust the field name as per your frontend
const update = multer({ storage: storage }).single('mediaUrlupdate');

export const addProject = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(500).send(err.message);
        }
        try {
            const file = req.file;

            const sanitizedFileName = file.originalname.replace(/[^a-zA-Z0-9.\-_]/g, '');
            const filePath = `projects/${sanitizedFileName}`;
            const blob = bucket.file(`projects/${sanitizedFileName}`);

            const blobStream = blob.createWriteStream({
                metadata: {
                    contentType: file.mimetype,
                },
            });

            blobStream.on('error', (err) => {
                res.status(500).send(err);
            });

            blobStream.on('finish', async () => {
            const url =  await getDownloadURL(blob)
            
                const newProject = new project({
                    projectTitle: req.body.title,
                    projectDescription: req.body.description,
                    projectMediaUrl: url, // Assuming img field in schema corresponds to image URL
                    projectFileName: file.originalname
                });

                const savedProject = await newProject.save();
                res.status(201).json(savedProject);
            });

            blobStream.end(file.buffer);
        } catch (error) {
            res.status(500).send(error.message);
        }
    });
};


// Function to delete a project
export const deleteProject = async (req, res) => {
    try {
        const {projectId} = req.body;
        const Project = await project.findById(projectId);
        
        if (!Project) {
            return res.status(404).send("Project not found");
        }

        //const fileName = Project.projectMediaUrl.split('/').pop();
        await bucket.file(`projects/${Project.projectFileName}`).delete();
        await project.findByIdAndDelete(projectId);
        res.status(200).send("Project and media deleted.");
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Function to update a project
export const updateProject = async (req, res) => {
    try {
        // Handle file upload using multer middleware
        update(req, res, async (err) => {
            if (err instanceof multer.MulterError) {
                // Handle multer errors (e.g., file size, file type)
                return res.status(400).send('Multer Error: ' + err.message);
            } else if (err) {
                // Handle other errors
                return res.status(500).send(err.message);
            }

            try {
                // Extract projectId and imageUpdated flag from req.body
                const { _id: projectId, imageUpdated } = req.body;

                // Find the project by ID
                const project1 = await project.findById(projectId);
                if (!project1) {
                    return res.status(404).send("Project not found");
                }

                // Default to existing image URL
                let imageUrl = project1.projectMediaUrl;

                // Check if image is updated
                if (imageUpdated === 'true') {
                    if (req.file) {
                        const file = req.file;

                        // Sanitize file name
                        const sanitizedFileName = file.originalname.replace(/[^a-zA-Z0-9.\-_]/g, '');
                        const filePath = `projects/${sanitizedFileName}`;

                        // Create a write stream to upload to Firebase Storage
                        const blob = bucket.file(filePath);
                        const blobStream = blob.createWriteStream({
                            metadata: {
                                contentType: file.mimetype,
                            },
                        });

                        // Handle errors during upload
                        blobStream.on('error', (err) => {
                            res.status(500).send(err);
                        });

                        // Handle successful upload
                        blobStream.on('finish', async () => {
                            // Delete old image from Firebase Storage
                            if (project1.projectFileName) {
                                await bucket.file(`projects/${project1.projectFileName}`).delete();
                            }

                            // Get updated image URL
                            imageUrl = await getDownloadURL(blob);

                            // Update project in MongoDB with new data
                            const updatedProject = await project.findByIdAndUpdate(
                                projectId,
                                {   projectDisplay: req.body.projectDisplay,
                                    projectTitle: req.body.title,
                                    projectDescription: req.body.description,
                                    projectMediaUrl: imageUrl,
                                    projectFileName: sanitizedFileName, // Update filename in project schema
                                },
                                { new: true }
                            );

                            res.status(200).json(updatedProject);
                        });

                        blobStream.end(file.buffer); // End the stream with file buffer data
                    } else {
                        return res.status(400).send("File not found in request");
                    }
                } else {
                    // No new image, update project without changing the image URL
                    const updatedProject = await project.findByIdAndUpdate(
                        projectId,
                        {   
                            projectDisplay: req.body.projectDisplay,
                            projectTitle: req.body.title,
                            projectDescription: req.body.description,
                        },
                        { new: true }
                    );

                    res.status(200).json(updatedProject);
                }
            } catch (error) {
                res.status(500).send(error.message);
            }
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export const getProjects=async(req,res)=>{
    try {
        const projects = await project.find();
        res.status(200).json(projects);
      } catch (error) {
        res.status(500).send(error.message);
      }
}

