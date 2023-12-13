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
mongoose.connect('mongodb://127.0.0.1:27017/Project'); // put your own database link here

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
        unique: [true, "EventId is unique"],
    },
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    loc: { type: Schema.Types.ObjectId, ref: 'Location' },
    quota: {
        type: Number,
        validate: {
            validator: function (value) {
                return value > 0;
            },
            message: () => "Please enter a valid quota",
        },
    },
    price: {
      type: Number,
      required: [true],
    }
  })

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

  // handle ALL requests with Hello World
  app.all('/*', (req, res) => {
    res.send('Hello World!');
  });
    
})
    
// listen to port 3000
const server = app.listen(3000);