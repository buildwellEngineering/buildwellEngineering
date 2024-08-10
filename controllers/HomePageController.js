import section from '../models/SectionSchema.js'
import project from '../models/ProjectsSchema.js';
import achievement from '../models/AchievementSchema.js'; // Adjust the path as needed

export const aboutUs = async (req, res) => {

    try {

        const homePageRequest = await section.findOne({ sectionName: "aboutUs" });


        const { sectionName, sectionText, sectionMediaUrl } = homePageRequest


        const sectionMediaUrl1 = sectionMediaUrl[0];

        const data = { sectionName, sectionText, sectionMediaUrl1 }

        res.send(data);

    } catch (error) {
      res.status(500).send("Internal Server Error",error);
    }
}

export const ourMissionOurTechnologies = async (req, res) => {
    try {
    
        // Fetch both documents asynchronously
        const missionPromise = section.findOne({ sectionName: "ourMission" });
        const technologiesPromise = section.findOne({ sectionName: "ourTechnologies" });
    
        // Wait for both promises to resolve
        const [missionDoc, technologiesDoc] = await Promise.all([missionPromise, technologiesPromise]);
    
    
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
        
        res.send(data);
    
      } catch (error) {
        res.status(500).json({ message: 'Failed to fetch section data', error: error.message });
      }
  };


// Function to fetch header data
  export const headerController = async (req, res) => {
    try {

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


        // Send the response
        res.send(data);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch header section data', error: error.message });
    }
};

export const projectsController = async (req, res) => {


  try {

    const projects = await project.find({ projectDisplay: true });


    const data = projects.map((project) => ({
      projectMediaUrl: project.projectMediaUrl, // Access the property directly
    }));


    res.send(data)

  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch projects data', error });
  }

}


export const sectionController = async (req, res) => {
  try {
    // Fetch all achievements from the database
    const achievements = await achievement.find({});

    // Send the fetched data to the frontend
    res.json(achievements);
  } catch (error) {
    // Handle any errors
    res.status(500).send({ message: "Error fetching achievements", error });
  }
};
