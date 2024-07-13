import section from '../models/SectionSchema.js'
import project from '../models/ProjectsSchema.js';
import multer from 'multer';
import bucket from "../firebaseConfig/FirebaseConfig.js";
import { getDownloadURL } from "firebase-admin/storage";

export const aboutUs = async (req, res) => {

    try {
        console.log(3636)

        const homePageRequest = await section.findOne({ sectionName: "aboutUs" });

        console.log(3636)

        const { sectionName, sectionText, sectionMediaUrl } = homePageRequest

        console.log(3636)

        const sectionMediaUrl1 = sectionMediaUrl[0];
        console.log(sectionMediaUrl1)

        const data = { sectionName, sectionText, sectionMediaUrl1 }

        res.send(data)
        console.log(data)

    } catch (error) {

    }
}

export const ourMissionOurTechnologies = async (req, res) => {
    try {
        console.log("Starting request for ourMissionOurTechnologies...");
    
        // Fetch both documents asynchronously
        const missionPromise = section.findOne({ sectionName: "ourMission" });
        const technologiesPromise = section.findOne({ sectionName: "ourTechnologies" });
    
        // Wait for both promises to resolve
        const [missionDoc, technologiesDoc] = await Promise.all([missionPromise, technologiesPromise]);
    
        console.log("Fetched documents from DB:", { missionDoc, technologiesDoc });
    
        // If either document is not found, handle the error
        if (!missionDoc || !technologiesDoc) {
          return res.status(404).json({ message: "One or both sections not found" });
        }
    
        // Extract relevant fields from each document
        const { sectionText: sectionText1, sectionMediaUrl: sectionMediaUrl1 } = missionDoc;
        const { sectionText: sectionText2, sectionMediaUrl: sectionMediaUrl2 } = technologiesDoc;
    
        // Construct the response object
        let sectionMediaUrl=''
        if(sectionMediaUrl1){
          sectionMediaUrl=sectionMediaUrl1[0]
        }
        else if(sectionMediaUrl2){
          sectionMediaUrl=sectionMediaUrl2[0]
        }
        
        const data = {
          sectionName: "ourMissionOurTechnologies",
          sectionText1,
          sectionText2,
          sectionMediaUrl
        };
    
        console.log("Response data for ourMissionOurTechnologies:", data);
    
        res.send(data);
    
      } catch (error) {
        console.error('Error fetching sections:', error);
        res.status(500).json({ message: 'Failed to fetch section data', error: error.message });
      }
  };


// Function to fetch header data
  export const headerController = async (req, res) => {
    try {
        console.log("Fetching header data...");

        // Fetch the header section from the database
        const headerSection = await section.findOne({ sectionName: "header" });

        // Check if the header section was found
        if (!headerSection) {
            return res.status(404).json({ message: "Header section not found" });
        }

        // Extract relevant fields from the document
        const { sectionName, sectionText, sectionMediaUrl } = headerSection;

        // Construct the response object
        const data = { sectionName, sectionText, sectionMediaUrl };

        console.log("Header data fetched successfully:", data);

        // Send the response
        res.send(data);
    } catch (error) {
        console.error('Error fetching header section:', error);
        res.status(500).json({ message: 'Failed to fetch header section data', error: error.message });
    }
};

export const projectsController = async (req, res) => {


  try {
    //console.log(3636)

    const projects = await project.find({ projectDisplay: true });

    //console.log(3636)

    const data = projects.map((project) => ({
      projectMediaUrl: project.projectMediaUrl, // Access the property directly
    }));

    //const { projectTitle, projectMedia, projectDescription } = homePageRequest

    //console.log(3636)

    // const data = { projectTitle, projectDescription }

    res.send(data)
    //console.log(data)

  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ message: 'Failed to fetch projects data', error });
  }

}