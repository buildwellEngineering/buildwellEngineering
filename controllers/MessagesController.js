

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

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({ error: 'Invalid ID format' });
      }

    const message = await Message.findByIdAndUpdate(id, { readByAdmin: true }, { new: true });
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
  

    const {data} = req.body;
    
    const newMessage =await new Message({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        subject: data.subject,
        message: data.message,
    }).save();

  
    res.send({ success: 'Message submitted' });
  } catch (error) {
    res.status(500).send({ error: 'Internal server error' });
  }
};

