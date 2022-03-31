import StoryMessage from '../models/storyMessage.js';
import User from "../models/user.js";

import dotenv from 'dotenv';

import NodeMailer from 'nodemailer'

dotenv.config();
const transporter = NodeMailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    }
  });

export const getStories = async (req, res) => {
    try {
        // trying to retreive all stories in db
        const storyMessages = await StoryMessage.find();
        res.status(200).json(storyMessages);
    } catch (error) {
        res.status(404).json({message: error.message});
    }

}

export const getStoriesBySearch = async (req, res) => {
    const {searchQuery} = req.query;
    try {
        const title = new RegExp(searchQuery, 'i');
        const story = await StoryMessage.find({ title });
        res.status(200).json(story);
    } catch (error) {
        res.status(404).json({message: error.message});
    }

}

export const createStory = async (req, res) => {
    const story = req.body;
    const update = await StoryMessage.findOneAndUpdate({storyID: story.storyID}, {finished: true}, {new: true})
    // const newStory = new StoryMessage({...story, finished: true, createdAt: new Date().toISOString()});
    const newStory = await StoryMessage.find({storyID: story.storyID});
    try {
        // await newStory.save();
        res.status(201).json(newStory);
    } catch (error) {
        res.status(409).json({message: error.message});
    }

}

export const likeStory = async (req, res) => {
    const { id } = req.params;

    if(!req.userId) return res.json({message: 'Unauthenticated'}); 

    const story = await StoryMessage.findOne({storyID: id});

    const index = story.likes.findIndex((id) => id === String(req.userId)); // if already liked

    if(index === -1){
        //like story
        story.likes.push(req.userId);
    }
    else{
        story.likes = story.likes.filter((id) => id !== String(req.userId));

    }
    const updatedStory = await StoryMessage.findOneAndUpdate({storyID: id}, story, {new: true})

    res.json(updatedStory);

}

export const reviewStory = async (req, res) => {
    const { id } = req.params;
    const { value } = req.body;

    const story = await StoryMessage.findOne({storyID: id});

    story.reviews.push(value);

    const updatedStory = await StoryMessage.findOneAndUpdate({storyID: id}, story, {new: true});

    res.json(updatedStory);

}

export const reportStory = async (req, res) => {
    const { id } = req.params;

    if(!req.userId) return res.json({message: 'Unauthenticated'}); 

    const story = await StoryMessage.findOne({storyID: id});
    if(story.clear === false)
        story.reports.push(req.userId);
    console.log(story.reports);
    const updatedStory = await StoryMessage.findOneAndUpdate({storyID: id}, story, {new: true})

    res.json(updatedStory);

}

export const unreportStory = async (req, res) => {
    const { id } = req.params;

    const story = await StoryMessage.findOne({storyID: id});
    console.log(story.reports);
    const updatedStory = await StoryMessage.findOneAndUpdate({storyID: id}, story, {new: true})

    try {
        story.reports.forEach(async (user, i) => {
          const data = await User.findById(user);
          const email = data.email;
          const mail = {
            from: process.env.EMAIL,
            to: email,
            subject: 'Your report has been reviewed',
            html: `<p>Hi ${data.name},</p>
        
            <p>We have reviewed your report on ${story.title} and cleared it as appropriate. Therefore you can now view the story again.</p>
            
            <p>Thank you for being a part of the community and giving your feedback</p>
            
            <p>Thanks and regards,</p>
            <p>Readit</p>`
          }
        
        
          transporter.sendMail(mail);
        })
        story.reports.length = 0;
        story.clear = true;
        story.warn = false;
          res.status(201).json(updatedStory);
    } catch (err) {
        console.log(err);
        res.status(500).json({message: error.message});
    }

}

export const deleteStory = async (req, res) => {
    const { id } = req.params;

    const story = await StoryMessage.findOne({storyID: id});

    try {
        story.author.forEach(async (user, i) => {
          const data = await User.findById(user.authorID);
          const email = data.email;
          const mail = {
            from: process.env.EMAIL,
            to: email,
            subject: 'Your story has been deleted',
            html: `<p>Hi ${data.name},</p>
        
            <p>Your story ${story.title} was reported by users and reviewed by Readit Moderators. 
            We view the story as inappropriate for our platform and have therefore deleted the story. 
            We are sorry to see your work gone but as a family friendly community we cannot let your work stay. 
            Please do not let this discourage you and we hope you can create more stories with us.</p>
            
            
            <p>Regards,</p>
            <p>Readit</p>`
          }
        
        
          transporter.sendMail(mail);
        })

        story.reports.forEach(async (user, i) => {
            const data = await User.findById(user);
            const email = data.email;
            const mail = {
              from: process.env.EMAIL,
              to: email,
              subject: 'Your report has been reviewed',
              html: `<p>Hi ${data.name},</p>
          
              <p>You reported ${story.title} which was reviewed by Readit Moderators and found to be inappropriate. 
              We have taken the necessary action to remove the story. 
              <p>We thank you for contributing to our community with your feedback.</p>
              
              
              <p>Thanks and regards,</p>
              <p>Readit</p>`
            }
          
          
            transporter.sendMail(mail);
        })
        await StoryMessage.findOneAndRemove({storyID: id});
          res.status(201).json({ message: "Story deleted." });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Could not send an email." });
    }

}