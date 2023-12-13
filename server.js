/* I declare that the lab work here submitted is original 
except for source material explicitly acknowledged,
and that the same or closely related material has not been 
previously submitted for another course.
I also acknowledge that I am aware of University policy and 
regulations on honesty in academic work, and of the disciplinary 
guidelines and procedures applicable to breaches of such
policy and regulations, as contained in the website.

University Guideline on Academic Honesty: 
https://www.cuhk.edu.hk/policy/academichonesty/

Student Name : Liu Man Yin
Student ID : 1155159567
Student Name : Li Tsz Kin 
Student ID: 1155158177 
Student Name : Cheung Mei Yi 
Student ID : 1155159106 
Student Name : Ho Yun Kit 
Student ID : 1155158328 
Student Name : AU Yeuk Lai Rickie 
Student ID : 1155143101

Class/Section : CSCI2720
Date : 10/12/2023 */

const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());
const mongoose = require('mongoose');
const { Schema } = mongoose;
mongoose.connect('mongodb://127.0.0.1:27017/Project'); // database link here

const db = mongoose.connection;
// Upon connection failure
db.on('error', console.error.bind(console, 'Connection error:'));
// Upon opening the database successfully
db.once('open', function () {
  console.log("Connection is open...");

  // Schema and Model - Event, Location
  const eventSchema = mongoose.Schema({
    eventId: {
      type: Number,
      required: [true, "EventId is required"],
      unique: [true, "EventId must be unique"],
    },
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    loc: { type: Schema.Types.ObjectId, ref: 'Location' },
    dateTime: {
      type: Date,
      required: [true, "DateTime is required"],
    },
    /* 
  startDateTime: {
    type: Date,
    required: [true, "StartDateTime is required"],
  },
  endDateTime: {
    type: Date,
    required: [true, "EndDateTime is required"],
  },
  recurringPattern: {
    type: String,
    default: "", // Optional
  }, 
  */
    description: {
      type: String,
      default: "", // Optional, set a default empty string if description is not provided
    },
    presenter: {
      type: String,
      required: [true, "Presenter is required"],
    },
    price: {
      type: String,
      required: [true, "Price is required"],
    },
  });

  const locationSchema = mongoose.Schema({
    locId: {
        type: Number,
        required: [true, "locId is required"],
        unique: [true, "locId is unique"],
    },
    name: {
        type: String,
        required: [true, "name is required"],
    },
    coordinates: {
        type: {
          type: String,
          enum: ["Point"],
          default: "Point",
        },
        coordinates: {
          type: [Number],
          required: [true, "latitude and longitude coordinates are required"],
        },
    },
  })

  const Event = mongoose.model('Event', eventSchema);
  const Location = mongoose.model('Location', locationSchema);

  /*
  // Create a new Location document
  let newLocation = new Location({
    locId: 87110120,
    name: "Kwai Tsing Theatre (Lecture Room)",
    coordinates: {
      type: "Point",
      coordinates: [22.35665, 114.12623],
    },
  });

  // Saving this new loaction to database
  newLocation
    .save()
    .then(() => {
      console.log("A new location created:", newLocation);
    })
    .catch((error) => {
      console.log("failed to save location:", error);
    }); 
    
    */

  // Create a new Event document 
  let newEvent = new Event({
      eventId: 151259,
      title: "Cantonese Opera Class by Hang Fei Music Centre",
      loc: '6579c6f6049175f2362a6252', // Assign the location document's object id
      dateTime: new Date("2023-07-06T12:00:00"), 
      description: "",
      presenter: "Hang Fei Music Centre",
      price: "Admission by Enrolment",
  }); 

  // Saving this new event to database
  newEvent
    .save()
    .then(() => {
        console.log("A new event created:", newEvent);
    })
    .catch((error) => {
        console.log("Failed to save event:", error);
    });


  // handle ALL requests with Hello World
  app.all('/*', (req, res) => {
    res.send('Hello World!');
  });
    
})
    
// listen to port 3000
const server = app.listen(3000);