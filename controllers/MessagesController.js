// import message from "../models/MessageSchema.js";


// export const getMessage=async(req,res)=>{
//     try {
        
//         const messages = await message.find();

//         //console.log(messages)

//         if(!messages){
//             res.send({messages:'NO messages'})
//         }

//         res.send(messages)


//     } catch (error) {
//         res.send("Internal server error", error);
//     }
// }

// export const markAsRead=async(req,res)=>{
    
//     try {
        
//     } catch (error) {
//         res.send("Internal server error", error);
//     }
// }

// export const deleteMessage=async(req,res)=>{
    
// }

// export const submitMessage=async(req,res)=>{
    
// }


// MessagesController.js
import Message from "../models/MessageSchema.js";
import mongoose from "mongoose";

export const getMessages = async (req, res) => {
  try {
    const messages = await Message.find();
    if (!messages.length) {
      return res.status(404).send({ messages: 'No messages found' });
    }
    res.send(messages);
  } catch (error) {
    res.status(500).send({ error: 'Internal server error' });
  }
};

export const markAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("came here",id,typeof(id))

    if (!mongoose.Types.ObjectId.isValid(id)) {
        console.log("Invalid ID format:", id);
        return res.status(400).send({ error: 'Invalid ID format' });
      }

    const message = await Message.findByIdAndUpdate(id, { readByAdmin: true }, { new: true });
    console.log(message)
    if (!message) {
      return res.status(404).send({ error: 'Message not found' });
    }
    res.send(message);
  } catch (error) {
    res.status(500).send({ error: 'Internal server error' });
  }
};

export const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const message = await Message.findByIdAndDelete(id);
    if (!message) {
      return res.status(404).send({ error: 'Message not found' });
    }
    res.send({ success: 'Message deleted' });
  } catch (error) {
    res.status(500).send({ error: 'Internal server error' });
  }
};

export const submitMessage = async (req, res) => {
  try {
    // const { encryptedData } = req.body;
    // const newMessage = new Message({
    //   firstName: encryptedData.firstName,
    //   lastName: encryptedData.lastName,
    //   email: encryptedData.email,
    //   subject: encryptedData.subject,
    //   message: encryptedData.message,
    // });

    const {data} = req.body;
    console.log(data)

    const newMessage = new Message({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        subject: data.subject,
        message: data.message,
    })

    await newMessage.save();
    res.send({ success: 'Message submitted' });
  } catch (error) {
    res.status(500).send({ error: 'Internal server error' });
  }
};
