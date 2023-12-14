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

const rs = require('jsrsasign');
const rsu = require('jsrsasign-util');

function JWTGenenation(){
    // Header
    var oHeader = {alg: 'HS256', typ: 'JWT'};
    // Payload
    var oPayload = {};
    var tNow = rs.KJUR.jws.IntDate.get('now');
    // expire after 10 min
    var tEnd = rs.KJUR.jws.IntDate.get(tNow + 10 * 60);
    oPayload.nbf = tNow;
    oPayload.iat = tNow;
    oPayload.exp = tEnd;
    // Sign JWT, password=pAS$W0rD
    var sHeader = JSON.stringify(oHeader);
    var sPayload = JSON.stringify(oPayload);
    var sJWT = rs.KJUR.jws.JWS.sign("HS256", sHeader, sPayload, "pAS$W0rD");
    return sJWT
}

function JWTVerification(sJWT){
    let tNow = rs.KJUR.jws.IntDate.get('now');
    let isValid =  rs.KJUR.jws.JWS.verifyJWT(sJWT, "pAS$W0rD", {alg: ["HS256"], verifyAt: tNow});
    return isValid;
}

function JWTRenew(sJWT){
    if(JWTVerification(sJWT)){
        return JWTGenenation();
    }else{
        return null
    }
}

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
  /* Client side implementation required: 
  table of all locations */
  app.get('/lo', (req, res) => {
    Location.find()
      .then((locations) => {
        // Prepare the location table data
        const locationTableData = locations.map((location) => ({
          name: location.name,
          link: `http://localhost:3000/lo/${location.locId}`,
          eventCount: 0, // Placeholder for event count, to be updated later
          locationId: location._id, // Store the location's Object ID for reference
        }));
  
        // Fetch the event count for each location using promises
        const promises = locationTableData.map((locationData) => {
          return Event.countDocuments({ loc: locationData.locationId })
            .then((eventCount) => {
              locationData.eventCount = eventCount;
            })
            .catch((error) => {
              console.error('Error fetching event count:', error);
              locationData.eventCount = 0; // Set event count to 0 in case of an error
            });
        });
  
        // Wait for all promises to resolve
        Promise.all(promises)
          .then(() => {
            // Send the location table data as the response
            res.send(`
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Link</th>
                    <th>Event Count</th>
                  </tr>
                </thead>
                <tbody>
                  ${locationTableData
                    .map(
                      (location) => `
                      <tr>
                        <td>${location.name}</td>
                        <td><a href="${location.link}">${location.link}</a></td>
                        <td>${location.eventCount}</td>
                      </tr>
                    `
                    )
                    .join('')}
                </tbody>
              </table>
            `);
          })
          .catch((error) => {
            console.error('Error fetching event count:', error);
          });
      })
      .catch((error) => {
        console.error('Error fetching locations:', error);
      });
  });

  // Fetch locations with specific keywords in name field
  app.post("/keywords", (req, res) => {
    const keywords = req.body.search;
    console.log(keywords);
    const regex = new RegExp(keywords, "i"); // case-insensitive

    Location.find({
      $or: [
        { name: regex },
        // Add other fields to search if needed
      ],
    })
      .exec()
      .then((filteredLocations) => {
        const locationTableData = filteredLocations.map((location) => ({
          name: location.name,
          link: `http://localhost:3000/lo/${location.locId}`,
          eventCount: 0, // Placeholder for event count, to be updated later
          locationId: location._id, // Store the location's Object ID for reference
        }));

        const promises = locationTableData.map((locationData) => {
          return Event.countDocuments({ loc: locationData.locationId })
            .then((eventCount) => {
              locationData.eventCount = eventCount;
            })
            .catch((error) => {
              console.error("Error fetching event count:", error);
              locationData.eventCount = 0; // Set event count to 0 in case of an error
            });
        });

        Promise.all(promises)
          .then(() => {
            res.json(locationTableData);
          })
          .catch((error) => {
            console.error("Error fetching event count:", error);
          });
      })
      .catch((error) => {
        console.error("Error handling search:", error);
      });
  });

  // Fetch events for a specific location
  // Response: Generate a HTML table for testing purpose only!
  /* Client side implementation required: 
  a table showing event details on top of /lo/:locationID */
  app.get('/lo/:locationID', (req, res) => {
    const locationID = req.params['locationID'];
  
    Location.findOne({ locId: locationID })
      .then((location) => {
        if (!location) {
          return res.status(404).send('Location not found.'); // Output error message in response body with status code 404
        }
  
        Event.find({ loc: location._id })
          .then((events) => {
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
          })
          .catch((error) => {
            console.error('Error fetching events:', error);
          });
      })
      .catch((error) => {
        console.error('Error fetching location:', error);
      });
  });

  // Handle submission of user comments
  /* Client side implementation required: 
  a comment section on the bottom of /lo/:locationID */
  app.post('/lo/:locationID/comments', (req, res) => {
    const locationID = req.params.locationID;
    const { username, content } = req.body;
  
    // Find the specified location in the database
    Location.findOne({ locId: locationID })
      .then(existingLocation => {
        if (!existingLocation) {
          return res.status(404).send('Location not found');
        }
  
        // Find the user by username
        User.findOne({ username })
          .then(existingUser => {
            if (!existingUser) {
              return res.status(404).send('User not found');
            }
  
            // Create a new comment document
            const newComment = new Comment({
              user: existingUser._id,
              location: existingLocation._id,
              content,
              createdAt: new Date(),
            });
  
            // Save the comment to the database
            newComment.save()
              .then(savedComment => {
                res.status(201).json(savedComment);
              })
              .catch(error => {
                console.error('Error saving comment:', error);
              });
          })
          .catch(error => {
            console.error('Error finding user:', error);
          });
      })
      .catch(error => {
        console.error('Error finding location:', error);
      });
  });
  
  // Fetch user's favourite locations
  app.get('/favourite', (req, res) => {
    const username = "monty_python"; // Testing: Hong Kong City Hall, /lo/87510010, 3
    // const { username } = req.query;
  
    User.findOne({ username })
      .exec()
      .then(user => {
        if (!user) {
          return res.status(404).send('User not found');
        }
  
        return UserAccount.findOne({ user: user._id })
          .populate('favoriteLocations')
          .exec();
      })
      .then(userAccount => {
        if (!userAccount) {
          return res.status(404).send('User account not found');
        }
  
        const favoriteLocations = userAccount.favoriteLocations;
  
        const locationPromises = favoriteLocations.map(location => {
          return Event.countDocuments({ loc: location._id })
            .exec()
            .then(eventCount => {
              return {
                name: location.name,
                link: `localhost:3000/lo/${location.locId}`,
                eventCount: eventCount,
              };
            });
        });
  
        return Promise.all(locationPromises);
      })
      .then(locationDetails => {
        res.json(locationDetails);
      })
      .catch(err => {
        console.error('Error finding user or user account:', err);
      });
  });
  

    // handle login requests 
    // Both user and admin would login thru this endpoint
    // if the user is an admin, the return json field: "isAdmin" would be set to True

    // Input Json reqs
    // {
    //      "user": string, (username)
    //      "password": string, (encrypted password)  
    // }
    app.post('/login', (req, res) => {
        const user = req.body.user;
        const password = req.body.password;
        // double check empty fields
        if(!user || !password){
            res.status(401).send('Username or password empty')
        }
        // query database
        User.findOne({$and: [{username: {$eq: user}}, {password: {$eq: password}}]}).then((data) => {
            if(data === null){
                res.status(403).send('Incorrect username or password')
            }else{
                // valid username and password
                // can check statuscode === 200 or json().valid
                res.json({
                    'valid': true,
                    'isAdmin': data.isAdmin,
                    'JWT': JWTGenenation()
                }).send()
            }
        })

    })

/*
  Handle Admin Event Creation, part of the CRUD requirement
  Input: note that while some field in the database on Event is optional, 
         it should still be present in the Json body of this post request,
         empty string "" can be used for them 
  {
    title: string,
    locId: int,
    starttime: string, (the dateformat is specified in the database schema, which is something like "2024-01-21T19:30:00")
    endtime: string, (same as above)
    recurring: string, (unknown use)
    description: string,
    presenter: string,
    price: string
  }
*/
    app.post('/newEvent', (req, res) => {
        const sJWT = req.body.sJWT
        if(!JWTVerification(sJWT)){
            res.status(403).send('JWT expired')
        }

        const title = req.body.title
        const locId = req.body.locId
        // the datetime conversion and format are specified by the database schema
        const startDate = new Date(moment.tz(req.body.starttime, hkTimeZone).toDate())
        const endDate =  new Date(moment.tz(req.body.endtime, hkTimeZone).toDate())
        const recurring = req.body.recurring
        const description = req.body.description
        const presenter = req.body.presenter
        const price = req.body.price
        let maxId;
        // get current largest id to determine the new id
        Event.find({}).sort({eventId: -1}).limit(1).then((eventData) => {
            maxId = eventData[0].eventId + 1;
            // console.log(maxId)
        })
        // query location data to get a reference to it
        Location.findOne({LocId: {$eq: locId}}).then((locationData) => {
            if(locationData === null){
                res.statusCode(404).contentType('text/plain').send("Location ID not found.")
            }else{
                new Event({
                    eventId: maxId,
                    title: title,
                    loc: locationData,
                    startDateTime: startDate,
                    endDateTime: endDate,
                    recurringPattern: recurring,
                    description: description,
                    presenter: presenter,
                    price: price
                }).save()
                res.send('created!')
            }
        })
    })

    /*
    Handle Admin Event Update, part of the CRUD requirement
    Input: note that while some field in the database on Event is optional, 
            it should still be present in the Json body of this post request,
            empty string "" can be used for them 
    {
        eventId: int, (this is the filter used to identify the event)
        title: string,
        locId: int,
        starttime: string, (the dateformat is specified in the database schema, which is something like "2024-01-21T19:30:00")
        endtime: string, (same as above)
        recurring: string, (unknown use)
        description: string,
        presenter: string,
        price: string
    }
    */
    app.post('/updateEvent', (req, res) => {
        const eventId = req.body.eventId
        const title = req.body.title
        const locId = req.body.locId
        // the datetime conversion and format are specified by the database schema
        const startDate = new Date(moment.tz(req.body.starttime, hkTimeZone).toDate())
        const endDate =  new Date(moment.tz(req.body.endtime, hkTimeZone).toDate())
        const recurring = req.body.recurring
        const description = req.body.description
        const presenter = req.body.presenter
        const price = req.body.price
        
        Location.findOne({locId: {$eq: locId}}).then((locationData) => {
            if(locationData === null){
                res.status(404).send("Location ID not found.")
            }
            Event.findOneAndUpdate(
                {eventId: {$eq: eventId}}, 
                {
                    title: title, 
                    loc: locationData, 
                    startDateTime: startDate,
                    endDateTime: endDate,
                    recurringPattern: recurring,
                    description: description,
                    presenter: presenter,
                    price: price
                },
                {new: true})
                .then((EventData) => {
                    if(eventData === null){
                        res.status(404).send("Event ID not found")
                    }
                    res.json(EventData).send()
            })
        })
    })


    /*
    Handle Admin Event Deletion, part of the CRUD requirement
    {
        eventId: int, (specify the event to be deleted)
    }
    */
    app.post('/deleteEvent', (req, res) => {
        const eventId = req.body.eventId
        Event.findOneAndDelete({eventId: {$eq: eventId}}).then((data) => {
            if(data === null){
                res.status(404).send('event ID not found')
            }else{
                res.send('ok')
            }
        })
    })

    /*
    Handle Admin User Creation, part of the CRUD requirement
    input:
    {
        username: string, (server would check if this is unqiue, 409 is returned if not)
        password: string, (encrypted password),
        isAdmin: boolean
    }
    */
    app.post('/newUser', (req, res) => {
        const username = req.body.username
        const password = req.body.password
        const isAdmin = req.body.isAdmin

        // check if username is taken
        User.findOne({username: {$eq: username}}).then((data) => {
            if(!data === null){
                res.status(409).send('username taken')
            }
            // create new user
            new User({
                username: username,
                password: password,
                isAdmin: isAdmin
            }).save().then((newUser) => {
                // create new UserAccount (dk whats this for)
                new UserAccount({
                    user: newUser
                }).save()
            })
        })
        

    })

    /*
    Handle Admin User update, part of the CRUD requirement
    input: if there is no change to username and password, empty string "" or falsy object can be passed
           However, "oldUsername" and "isAdmin" must be passed correctly
    {
        oldUsername: string, (this must be the same as the one before changes)
        username: string,
        password: string, (encrypted password),
        isAdmin: boolean
    }
    */
    app.post('/updateUser', (req, res) => {
        const oldUsername = req.body.oldUsername
        const username = req.body.username
        const password = req.body.password
        const isAdmin = req.body.isAdmin
        User.findOne({username: {$eq: oldUsername}}).then((data) => {
            if(data === null){
                res.status(404).send('username not found')
            }

            if(username === "" || username){
                data.username = username
            }
            if(password === "" || password){
                data.password = password
            }
            data.isAdmin = isAdmin
            data.save().then((data) => {
                res.send('ok')
            })
        })
    })

    /*
    Handle Admin User delete, part of the CRUD requirement
    {
        username: string,
    }
    */
    app.post('/deleteUSer', (req, res) => {
        const username = req.body.username
        User.findOneAndDelete({username: {$eq: username}}).then((data) => {
            if(data === null){
                res.status(404).send('username not found')
            }else{
                res.send('ok')
            }
        })

    })

    app.post('/renewJWT', (req, res) => {
        let sJWT = req.body.sJWT
        let sNewJWT = JWTRenew(sJWT)
        if(sNewJWT){
            res.json({"sJWT": sNewJWT}).send('ok')
        }else{
            res.status(403).send('JWT expired')
        }
    })

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
