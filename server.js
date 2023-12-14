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

const moment = require('moment-timezone');
const hkTimeZone = 'Asia/Hong_Kong';

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

  const commentSchema = mongoose.Schema({
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    location: {
      type: Schema.Types.ObjectId,
      ref: 'Location',
    },
    content: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });
  
  const userSchema = mongoose.Schema({
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  });

  const userAccountSchema = mongoose.Schema({
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      unique: true,
    },
    favoriteLocations: [{
      type: Schema.Types.ObjectId,
      ref: 'Location',
    }],
  });

  const Event = mongoose.model('Event', eventSchema);
  const Location = mongoose.model('Location', locationSchema);
  const User = mongoose.model('User', userSchema);
  const Comment = mongoose.model('Comment', commentSchema);
  const UserAccount = mongoose.model('UserAccount', userAccountSchema);

  /*
  // Create a new User document
  let newUser = new User({
    username: "monty_python",
    password: "password1234",
    isAdmin: false,
  });
  
  // Save the new user to the database
  newUser
    .save()
    .then(() => {
      console.log("A new user created:", newUser);
    })
    .catch((error) => {
      console.log("Failed to save user:", error);
    });

  // Create a new Comment document
  let newComment = new Comment({
    user: newUser._id, // ObjectId of the associated user
    location: '6579de61fda3eeec704b2325', // ObjectId of the associated location
    content: "This place is lovely!",
  });
  
  // Save the new comment to the database
  newComment
    .save()
    .then(() => {
      console.log("A new comment created:", newComment);
    })
    .catch((error) => {
      console.log("Failed to save comment:", error);
    });
  
  // Create a new UserAccount document
  let newUserAccount = new UserAccount({
    user: newUser._id, // ObjectId of the associated user
    favoriteLocations: ['6579de61fda3eeec704b2325'], // Array of ObjectId of favorite locations
  });
  
  // Save the new user account to the database
  newUserAccount
    .save()
    .then(() => {
      console.log("A new user account created:", newUserAccount);
    })
    .catch((error) => {
      console.log("Failed to save user account:", error);
    });

    */

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
  /*
   // Create a new Location document
   let twoLocation = new Location({
    locId: 7744,
    name: "Yuen Chau Kok Public Library",
    coordinates: {
      type: "Point",
      coordinates: [22.37957, 114.20452],
    },
  });

  /*
  // Create a new Event document 
  let newEvent = new Event({
      eventId: 155799,
      title: "Adventure Harmonica Band 18th Anniversary Concert",
      loc: '6579e4227d5c9f57d8b7dcd3', // Assign the location document's object id
      startDateTime: new Date(moment.tz('2024-01-21T19:30:00', hkTimeZone).toDate()), 
      endDateTime: new Date(moment.tz('2024-01-21T21:15:00', hkTimeZone).toDate()), 
      recurringPattern: "",
      description: "Only for age 4 or above",
      presenter: "Adventure Harmonica Music Centre",
      price: "$150",
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

    */

  // Fetch all locations: GET
  app.get('/lo', async (req, res) => {
    try {
      // Retrieve all locations from the database
      const locations = await Location.find();

      // Prepare the location table data
      const locationTableData = locations.map((location) => ({
        name: location.name,
        link: `/lo/${location._id}`,
        eventCount: 0, // Placeholder for event count, to be updated later
      }));

      // Send the location table data as the response
      res.json(locationTableData);
    } catch (error) {
      console.error('Error fetching locations:', error);
    }
  });

  // Fetch locations with specific keywords in name field 
  app.get('/keywords', (req, res) => {
    const { keywords } = req.query;
    const regex = new RegExp(keywords, 'i'); // case-insensitive 
  
    Location.find({
      $or: [
        { name: regex },
        // Add other fields to search if needed
      ],
    })
      .exec()
      .then((filteredLocations) => {
        res.json(filteredLocations);
      })
      .catch((error) => {
        console.error('Error handling search:', error);
      });
  });

// Fetch events for a specific location
app.get('/lo/:locationID', async (req, res) => {
  const locationID = req.params['locationID'];

  try {
    // Lookup for the location with the locId provided
    const location = await Location.findOne({ locId: locationID });

    if (!location) {
      return res.status(404).send('Location not found.'); // Output error message in response body with status code 404
    }

    // Find all events associated with the location
    const events = await Event.find({ loc: location._id });

    // Prepare the event details
    const eventDetails = events.map((event) => ({
      eventId: event.eventId,
      title: event.title,
      startDateTime: moment(event.startDateTime).tz(hkTimeZone).format(),
      endDateTime: moment(event.endDateTime).tz(hkTimeZone).format(),
      description: event.description,
      presenter: event.presenter,
      price: event.price,
    }));

    // Generate the HTML table
    let tableHtml = `
      <table>
        <thead>
          <tr>
            <th>Event Id</th>
            <th>Title</th>
            <th>Date/Time</th>
            <th>Description</th>
            <th>Presenter</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
    `;

    // Populate the table rows with event details
    eventDetails.forEach((event) => {
      tableHtml += `
        <tr>
          <td>${event.eventId}</td>
          <td>${event.title}</td>
          <td>${event.startDateTime} to ${event.endDateTime}</td>
          <td>${event.description}</td>
          <td>${event.presenter}</td>
          <td>${event.price}</td>
        </tr>
      `;
    });

    tableHtml += `
        </tbody>
      </table>
    `;

    // Set the HTML content type and send the response
    res.setHeader('Content-Type', 'text/html');
    res.send(tableHtml);
  } catch (error) {
    console.error('Error fetching events:', error);
  }
});

/*app.get('/lo/:locationID', async (req, res) => {
  const locationID = req.params['locationID'];

  try {
    // Lookup for the location with the locId provided
    const location = await Location.findOne({ locId: locationID });

    if (!location) {
      return res.status(404).send('Location not found.'); // Output error message in response body with status code 404
    }

    // Find all events associated with the location
    const events = await Event.find({ loc: location._id });

    // Prepare the event details
    const eventDetails = events.map((event) => ({
      eventId: event.eventId,
      title: event.title,
      loc: event.loc,
      startDateTime: moment(event.startDateTime).tz(hkTimeZone).format(),
      endDateTime: moment(event.endDateTime).tz(hkTimeZone).format(),
      recurringPattern: event.recurringPattern,
      description: event.description,
      presenter: event.presenter,
      price: event.price,
    }));

    // Send the event details as the response
    res.json(eventDetails);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
*/

  // handle ALL requests with Hello World
  app.all('/*', (req, res) => {
    res.send('Hello World!');
  });
    
})
    
// listen to port 3000
const server = app.listen(3000);  
