//QB-439
// Map following SQL queries to MongoDB query:
// (1)SELECT * FROM USER WHERE status = "A" ORDER BY age DESC
// (2)UPDATE USER SET age = age + 3 WHERE status = "A"
// (3)SELECT * FROM USER WHERE status != "A"

db.USER.find({ status: "A" }).sort({ age: -1 });
db.USER.updateMany({ status: "A" }, { $inc: { age: 3 } });
db.USER.find({ status: { $ne: "A" } });


//QB-494
// Create a collection name Student. Having fields name, age, std, percentage.
// 1)insert 3 random records in table.
// 2)find name of all student age>5.
// 3) update the std for all by 1.
// 4) arrange all the record of descending order of age
// 5)show all the name of student who is the oldest student of all records.

db.Student.insertMany([
    { name: "rohit", age: 10, std: 5, percentage: 85 },
    { name: "jay", age: 8, std: 4, percentage: 90 },
    { name: "dev", age: 12, std: 6, percentage: 88 }
]);
db.Student.find({ age: { $gt: 5 } }, { name: 1 });
db.Student.updateMany({}, { $inc: { std: 1 } });
db.Student.find().sort({ age: -1 });
db.Student.find().sort({ age: -1 }).limit(1).project({ name: 1 });


//QB-495
// Write query to perform following tasks on employee collection having fields name, age,position, salary.
// 1) Insert 3 documents with random data of having fields name, age, position, salary.
// 2) Count all employees where age is not equal to 35 and position is “Full Stack Developer”.
// 3) Update position of all employees to “Software Developer” whose name is “XYZ” and ageis equal to 31. 
//If not such document available than insert the document with updated values.
// 4) Display position and name of the employee having lowest salary.

db.employee.insertMany([
    { name: "rohit", age: 30, position: "Full Stack Developer", salary: 80000 },
    { name: "XYZ", age: 35, position: "Backend Developer", salary: 75000 },
    { name: "dev", age: 31, position: "Full Stack Developer", salary: 85000 }
]);
db.employee.countDocuments({age:{$ne:35},position:"Full Stack Developer"})
db.employee.updateOne(
    { name: "XYZ", age: 31 },
    { $set: { position: "Software Developer" } },
    { upsert: true }
);
db.employee.find().sort({ salary: 1 }).limit(1).project({ position: 1, name: 1 });


//QB-496
// Map following SQL queries to MongoDB query:
// (1) select age,name from employee where status="active"
// (2) select * from employee where status!="active"
// (3) select name from employee order by age desc
// (4)select * from employee where status=”active” or age=50

db.employee.find({ status: "active" }, { age: 1, name: 1 });
db.employee.find({ status: { $ne: "active" } });
db.employee.find({}, { name: 1 }).sort({ age: -1 });
db.employee.find({ $or: [{ status: "active" }, { age: 50 }] });



//QB-530
// Write commands to perform following tasks on employee collection having fields name,age & joiningDate:
// (1) Insert 3-4 records in collection.
// (2) List all employees who joined before 1st January, 2010.
// (3) Update the name of employee to "WWW" whose joiningDate is "05-05-2015"

db.employee.insertMany([
    { name: "Jay", age: 30, joiningDate: new Date("2009-06-15") },
    { name: "Ronil", age: 35, joiningDate: new Date("2015-05-05") },
    { name: "Dev", age: 40, joiningDate: new Date("2005-11-20") },
    { name: "vansh", age: 28, joiningDate: new Date("2020-03-01") }
]);
db.employee.find({ joiningDate: { $lt: new Date("2010-01-01") } });
db.employee.updateOne({ joiningDate: new Date("2015-05-05") },{ $set: { name: "WWW" } });

//QB-531
// Write commands to perform following tasks on employee collection having fields having name,age & joiningDate:
// (1) Delete all records having joiningDate before 1st January, 2010.
// (2) List all employees having age>50 years.
// (3) List only 1st employee having age>60 years.

db.employee.deleteMany({ joiningDate: { $lt: new Date("2010-01-01") } });
db.employee.find({age:{$gt:50}})
db.employee.find({age:{$gt:60}}).limit(1)


//QB-532
// Write commands to perform following tasks on employee collection having fields having name,age & joiningDate:
// (1) Update the name="Senior citizen" having age>60 years.
// (2) Update the name="JKL" having age=20 years. Insert this record, if it is not found.
// (3) Retire all employees by deleting senior citizens from collection.

db.employee.updateMany({ age: { $gt: 60 } },{ $set: { name: "Senior citizen" } });
db.employee.updateOne(
    { age: 20 },
    { $set: { name: "JKL" } },
    { upsert: true }
);
db.employee.deleteMany({ name: "Senior citizen" });


//QB-533
// Write commands to perform following tasks on employee collection having fields having name,age & joiningDate:
// (1) Count no. of employees having age>=60 years.
// (2) List all employees in descending order of names having names "ABC", "PQR", "XYZ".
// (3) List all employees whose age lies between 25 to 50 years excluding all rest of the fields.

db.employee.countDocuments({age:{$gt:60}})
db.employee.find({ name: { $in: ["ABC", "PQR", "XYZ"] } }).sort({ name: -1 });
db.employee.find(
    { age: { $gte: 25, $lte: 50 } },
    { _id: 0, name: 1, age: 1 }
);


//QB-534
// Map following SQL queries to MongoDB query:
// (1) alter table people add joiningDate datetime
// (2) alter table people drop column joiningDate
// (3) select age,name from people where status="PH"
// (4) select * from people where status!="PH"
// (5) select name from people order by age desc

db.people.updateMany({},{ $set: { joiningDate: null } });
db.people.updateMany({},{ $unset: { joiningDate: "" } });
db.people.find({ status: "PH" },{ age: 1, name: 1, _id: 0 });
db.people.find({ status: { $ne: "PH" } });
db.people.find({},{ name: 1, _id: 0 }).sort({ age: -1 });



//QB-535
// Map following SQL queries to MongoDB query:
// (1) update employee set name="TTT" where age not in {12,33,44,55}
// (2) select count(*) from employee where age<>23
// (3) update employee set age=age+10

db.employee.updateMany({ age: { $nin: [12, 33, 44, 55] } },{ $set: { name: "TTT" } });
db.employee.countDocuments({ age: { $ne: 23 } });
db.employee.updateMany({},{ $inc: { age: 10 } });


//QB-540
// Create a schema using Schema() constructor having name, surname, age, active and date fields.
// Name must accept strings and it is a required field. Age must accept numeric values only. Active
// must accept true/false. Date should have default today's date if it is not entered.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mySchema = new Schema({
    name: {type: String,required: true},
    surname: {type: String},
    age: {type: Number,validate: {validator: Number.isFinite,message: 'Age must be a numeric value'}},
    active: {type: Boolean,required: true},
    date: {type: Date,default: Date.now}
});
const MyModel = mongoose.model('MyModel', mySchema);
module.exports = MyModel;


//QB-542
// Consider following student collection:
// [
//  {_id:123433,name: "SSS",age:22},
//  {_id:123434,name: "YYY",age:2},
//  {_id:123435,name: "PPP",age:32},
// ]
// Do as directed:
// (1) Update name=”JJJ” and age=40, where age=20 occurs. Insert new document, if record is not
// found.
// (2) To retrieve age and name fields of documents having names “YYY” & “SSS”. Don’t project _id
// field.

db.student.updateOne({ age: 20 },{$set: { name: "JJJ", age: 40 }},{ upsert: true });
db.student.find({ name: { $in: ["YYY", "SSS"] } }, { name: 1, age: 1, _id: 0 });


// //QB-543
// Write a script to define a schema having fields like name,age,gender,email.
// Apply following validations:
// (1) name field must remove leading/trailing spaces,minimum and maximum length should be 3 & 10 respectively
// (2) age must accept a value from 1<=age<=100 only.
// (3) Perform Email ID validation on Email field.
// (4) gender must accept values in small letters only and allowed values are “male” & “female” only

const mongoose = require('mongoose');
const Schema1 = mongoose.Schema;

const studentSchema = new Schema1({
    name: {
        type: String,
        trim: true,
        minlength: [3, 'Name must be at least 3 characters long'],
        maxlength: [10, 'Name must be at most 10 characters long'],
        required: [true, 'Name is required']
    },
    age: {
        type: Number,
        min: [1, 'Age must be at least 1'],
        max: [100, 'Age must be at most 100'],
        required: [true, 'Age is required'],
        validate: {
            validator: Number.isInteger,
            message: 'Age must be an integer'
        }
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        match: [/.+@.+\..+/, 'Please enter a valid email address']
    },
    gender: {
        type: String,
        enum: {
            values: ['male', 'female'],
            message: 'Gender must be either "male" or "female"'
        },
        lowercase: true, 
        required: [true, 'Gender is required']
    }
});
const Student = mongoose.model('Student', studentSchema);
module.exports = Student;



//QB-544
// Consider following student collection:
// [
//  {_id:123433,name: "2DD", surname:"GGG", age:22},
//  {_id:123434,name: "LLL", surname:"RRR", age:2},
//  {_id:123435,name: "KKK", surname:"III", age:32}
//  {_id:123436,name: "ZZZ", surname:"TTTT", age:9}
// ]
// Do as directed:
// (1) List all students whose name starts by digit only.
// (2) List all students whose surname has exactly 4 letters only.
// (3) List only names of students from youngest to oldest.
// (4) List all students whose name has 3-10 letters only. Don't allow digits & underscore.

db.student.find({name:{ $regex: /^[0-9]/}});
db.student.find({ surname: { $regex: /^[A-Za-z]{4}$/}});
db.student.find({},{ name: 1, _id: 0 }).sort({ age: 1 });
db.student.find({ name: { $regex: /^[A-Za-z]{3,10}$/ } });


//QB-546
// Write a node.js script to insert 4 documents simultaneously in a collection. Assume that schema is
// already created having name(string), surname(string), age(Number), active(Boolean) fields.

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/yourDatabaseName', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
        
        // Define the schema and model (if not already defined elsewhere)
        const Student = mongoose.model('Student', studentSchema);
        const students = [
            { name: 'jay', surname: 'doshi', age: 25, active: true },
            { name: 'yash', surname: 'parekh', age: 30, active: false },
            { name: 'dev', surname: 'patel', age: 22, active: true },
            { name: 'ronil', surname: 'patel', age: 28, active: false }
        ];

        Student.insertMany(students)
            .then(() => {
                console.log('Documents inserted successfully');
                mongoose.connection.close();
            })
            .catch(err => {
                console.error('Error inserting documents:', err);
                mongoose.connection.close();
            });
    })
    .catch(err => {
        console.error('Error connecting to MongoDB:', err);
    });


//QB-547
// Consider a collection student having documents like this:
// [
//  {_id:123433,name: "DDD",age:32},
//  {_id:123434,name: "BBB",age:20},
//  {_id:123435,name: "AAA",age:10},
// ]
// Do as directed:
// (1) Create an index & fire a command to retrieve a document having age>15 and name is "BBB".
// Stats must return values nReturned=1, docExamined=1, stage="IXSCAN". Perform required
// indexing.
// (2) Create an index on subset of a collection having age>30. Also write a command to get a stats
// "IXSCAN" for age>30.

db.student.createIndex({ age: 1, name: 1 });
db.student.find({ age: { $gt: 15 }, name: "BBB" }).explain("executionStats");


//QB-553
// Write a node.js script to define a schema having fields like name,surname,email,password,city.
// Apply following validations:
// (1)name field must required .
// (2)surname must accept values in small letters.
// (3) Perform Email ID validation on Email field.
//  (4) password must have minimum and maximum length should be 8 & 12 respectively
//  (5)city allowed values are “baroda”,”surat” and “ahmedabad” only

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/yourDatabaseName', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
    
        const userSchema = new mongoose.Schema({
            name: {
                type: String,
                required: true  
            },
            surname: {
                type: String,
                lowercase: true,
                match: /^[a-z]+$/  
            },
            email: {
                type: String,
                required: true,
                unique: true, 
                validate: {
                    validator: function(v) {
                        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
                    },
                    message: props => `${props.value} is not a valid email address!`
                }
            },
            password: {
                type: String,
                required: true,
                minlength: 8,
                maxlength: 12
            },
            city: {
                type: String,
                enum: ['baroda', 'surat', 'ahmedabad']  
            }
        });
        const User = mongoose.model('User', userSchema);

        const newUser = new User({
            name: 'jay',
            surname: 'doshi',
            email: 'jaydosh@123.com',
            password: '123',
            city: 'surat'
        });
        newUser.save()
    })
    .catch(err => {
        console.error('Error connecting to MongoDB:', err);
    });


//QB-554
// Create one login form having username , password and submit button . By clicking submit button
// username and password should be store inside database. Use mongoos and express module. write
// all necessary files


//user.js
const mongoose = require('mongoose');
const userSchema1 = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});
const User1 = mongoose.model('User', userSchema1);
module.exports = User1;


//app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User1 = require('./models/user1');
const path = require('path');


const app = express();
mongoose.connect('mongodb://localhost:27017/loginDB',)
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'views')));

app.set('view engine', 'ejs');


app.get('/', (req, res) => 
{
    res.render('index');
});

app.post('/submit', async (req, res) => 
    {
    const { username, password } = req.body;
    const newUser = new User({ username, password });
    await newUser.save();
});app.listen(5000)


//index.html
// <!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>Login Form</title>
// </head>
// <body>
//     <h1>Login Form</h1>
//     <form action="/submit" method="POST">
//         <label for="username">Username:</label>
//         <input type="text" id="username" name="username" required>
//         <br>
//         <label for="password">Password:</label>
//         <input type="password" id="password" name="password" required>
//         <br>
//         <button type="submit">Submit</button>
//     </form>
// </body>
// </html>



//QB-555
// Write a program using react and node/express to demonstrate a full stack connectivity. Take one
// textfield, submit button on react and insert a corresponding record in database via node/express
// script. Write required files.

const mongoose = require('mongoose');
const recordSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    }
});

// Create the model
const Record = mongoose.model('Record', recordSchema);
module.exports = Record;




const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Record = require('./models/record');


// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/fullstackDB')
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));


app.post('/api/records', async (req, res) => {
    const { text } = req.body;
    const newRecord = new Record({ text });

    await newRecord.save();
});app.listen(5000)




import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [text, setText] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/records', { text });
            console.log('Record inserted:', response.data);
        } catch (error) {
            console.error('Error inserting record:', error);
        }
        setText('');
    };

    return (
        <div className="App">
            <h1>Insert Record</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" value={text} onChange={(e) => setText(e.target.value)} required/>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default App;


//QB-556
// Consider a collection student having documents like this:
// [
//  {_id:123433,name: "DDD",age:32},
//  {_id:123434,name: "BBB",age:20},
//  {_id:123435,name: "AAA BBB",age:10}
// ]
// (1) Retrieve all records having “BBB” as a substring in name by indexing. Apply required indexing.
// Predict the values of nReturned & docsExamined properties also.
// (2) Create an index and fire a command to retrieve documents having age>15. Stats must return
// values nReturned=2 & docExamined=2, even though total 3 records are there

db.student.createIndex({ name: "text" });
db.student.find({ $text: { $search: "BBB" } });

// { "_id": 123434, "name": "BBB", "age": 20 }
// { "_id": 123435, "name": "AAA BBB", "age": 10 }

db.student.createIndex({ age: 1 });
db.student.find({ age: { $gt: 15 } });

// { "_id": 123433, "name": "DDD", "age": 32 }
// { "_id": 123434, "name": "BBB", "age": 20 }



//QB-557
// Create a React form which accepts Name,Rollno and totalmarks,on submitting the form it should be
// saved in data table inside MongoDB database named student. 

// server.js
const app = express();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/student');

const studentSchemaa = new mongoose.Schema({
    name: String,
    rollno: Number,
    totalmarks: Number
});

const Student2 = mongoose.model('Student', studentSchemaa);

app.post('/add-student', async (req, res) => {
    const { name, rollno, totalmarks } = req.body;

    const student = new Student({ name, rollno, totalmarks });
    await student.save();
});app.listen(5000)


// src/StudentForm.js
import React, { useState } from 'react';
import axios from 'axios';

const StudentForm2 = () => {
    const [name, setName] = useState('');
    const [rollno, setRollno] = useState('');
    const [totalmarks, setTotalmarks] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/add-student', {
                name,
                rollno,
                totalmarks
            });
            setName('');
            setRollno('');
            setTotalmarks('');
            alert('Student added successfully');
        } catch (error) {
            console.error(error);
            alert('Failed to add student');
        }
    };

    return (
        <div>
            <h1>Add Student</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Roll No:</label>
                    <input
                        type="number"
                        value={rollno}
                        onChange={(e) => setRollno(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Total Marks:</label>
                    <input
                        type="number"
                        value={totalmarks}
                        onChange={(e) => setTotalmarks(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default StudentForm2;



// src/App.js
import React from 'react';
import StudentForm from './StudentForm';

const App = () => {
    return (
        <div className="App">
            <StudentForm />
        </div>
    );
};

export default App;


//QB-558
// Create a form containing username and submit button using .html file.After clicking on submit
// button,insert value of username in the database.(Note: .html and .js file required)

// server.js
const app = express();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');


app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect('mongodb://localhost:27017/userdb');

const userSchema4 = new mongoose.Schema({
    username: String
});

const User4 = mongoose.model('User', userSchema4);

app.post('/submit-username', async (req, res) => {

    const { username } = req.body;
    const user = new User4({ username });
    await user.save();
});app.listen(5000)



// <!-- public/index.html -->
// <!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>Submit Username</title>
// </head>
// <body>
//     <h1>Submit Username</h1>
//     <form id="usernameForm">
//         <label for="username">Username:</label>
//         <input type="text" id="username" name="username" required>
//         <button type="submit">Submit</button>
//     </form>
//     <script src="script.js"></script>
// </body>
// </html>



// public/script.js
document.getElementById('usernameForm4').addEventListener('submit', async function(event) 
{
    event.preventDefault(); 

    const username = document.getElementById('username').value;

    try {
        const response = await fetch('/submit-username', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username })
        });

        if (response.ok) {
            const data = await response.json();
            alert(data.message);
        } else {
            const errorData = await response.json();
            alert('Error: ' + errorData.message);
        }
    } catch (error) {
        console.error('Error:', error);
    }
});


//QB-559
// Write a node.js script to define a schema having fields like name, age and gender
// Apply following validations:
// (1) name field must be required field with minimum and maximum length of 4 & 12 respectively
// (2) age must accept a value from 1<=age<=35 only.
// (3) gender must accept values in capital letters only and allowed values are “male” & “female”
// only.

// schema.js
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/validationdb');

const { Schema5 } = mongoose;

const userSchema = new Schema5({
    name: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 12
    },
    age: {
        type: Number,
        required: true,
        min: 1,
        max: 35
    },
    gender: {
        type: String,
        required: true,
        enum: ['MALE', 'FEMALE'],
        uppercase: true
    }
});


const User = mongoose.model('User', userSchema);

// Example of creating a document
async function createUser() {
    const user = new User({
        name: 'jay',
        age: 25,
        gender: 'male'
    });
    await user.save();
}


createUser();

mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('Disconnected from MongoDB');
});


//QB-560
// Write a script to have a “NAME” text field and a submit button in Form.js file. After clicking on
// submit button, insert that value of text field in database named ‘mydb’. (React MongoDB
// Connectivity)

// src/Form.js
import React, { useState } from 'react';
import axios from 'axios';

const Form = () => {
    const [name, setName] = useState('');

    const handleChange = (e) => {
        setName(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/submit', { name });
            alert('Name submitted successfully!');
            setName('');
        } catch (error) {
            console.error('Error submitting name:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={handleChange}
                    required
                />
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

export default Form;

// src/App.js
import React from 'react';
import Form from './Form';

function App() {
    return (
        <div className="App">
            <h1>Submit Name</h1>
            <Form />
        </div>
    );
}

export default App;



// backend/server.js
const app = express();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/mydb');

const db = mongoose.connection;

const nameSchema = new mongoose.Schema({
    name: { type: String, required: true }
});
const Name = mongoose.model('Name', nameSchema);

app.post('/api/submit', async (req, res) => {
    const { name } = req.body;
    const newName = new Name({ name });
    await newName.save();
});app.listen(5000)


//QB-561
// Consider following citizens collection:
// [
//  {_id:123433, name: “DD", surname: "abc", age:61},
//  {_id:123434, name: "LL", surname: "def", age:38},
//  {_id:123435, name: "KK", surname: "pqr", age:29}
//  {_id:123436, name: "ZZ", surname: "xyz", age:62}
// ]
// Insert above data in "userdata” collection under database named “maindata” and write a query to
// perform below task in node.js.
// (1)Insert a category field with value “SeniorCitizen” having age greater than 60.
// (2)Display total number of documents having age between 30 and 60 only.

db.userdata.insertMany([
    { _id: 123433, name: "DD", surname: "abc", age: 61 },
    { _id: 123434, name: "LL", surname: "def", age: 38 },
    { _id: 123435, name: "KK", surname: "pqr", age: 29 },
    { _id: 123436, name: "ZZ", surname: "xyz", age: 62 }
]);


const updateResult = await collection.updateMany(
    { age: { $gt: 60 } },
    { $set: { category: 'SeniorCitizen' } }
);

const count = await collection.countDocuments({ age: { $gte: 30, $lte: 60 } });


//QB-562
// Consider collection named “movie” having documents like this:
// [
//  {"title": "Inception", "director": "Christopher Nolan", "release_year": 2010},
//  {"title": "The Matrix", "director": "The Wachowskis", "release_year": 1999},
//  {"title": "The Avengers", "director": "Joss Whedon", "release_year": 2012,}
// ]
// Do as directed:
// (1) Create a subset-based index that includes only movies released after the year 2000. Specify the
// field or condition used in the subset. Additionally, write a command to get a scan stage =
// “IXSCAN” for movie released after the year 2000 and give the values of nReturned and
// docExamined.
// (2) Generate indexing on director and release_year. Additionally, write a command to get movie
// released on or before the year 2010 and give the values of nReturned, docExamined and its scan
// stage.

db.movie.createIndex(
    { title: 1 },
    { partialFilterExpression: { release_year: { $gt: 2000 } } }
);
db.movie.find({ release_year: { $gt: 2000 } }).explain("executionStats");


db.movie.createIndex({ director: 1, release_year: 1 });
db.movie.find({ release_year: { $lte: 2010 } }).explain("executionStats");


//QB-563
// Write a node.js script to define a schema having fields like Firstname, age, email, citychoice and
// insert one random document having collection name “applicant” under “applicantdata” database.
// Apply following validations:
// (1) Firstname field must remove leading/trailing spaces, minimum and maximum length should be
// 3& 10 respectively.
// (2) aplicant’s age must be between 18 to 30.
// (3) Perform Email ID validation on email field.
// (4). citychoice must accept values in capital letters only and allowed values are “AHMEDABAD”,
// “ PUNE” & “ BANGALORE ” only.

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/applicantdata');

const applicantSchemas = new mongoose.Schema({
  Firstname: {
    type: String,
    trim: true,  
    required: [true, 'Firstname is required'],
    minlength: [3, 'Firstname must be at least 3 characters long'],
    maxlength: [10, 'Firstname cannot be more than 10 characters long'],
  },
  age: {
    type: Number,
    required: [true, 'Age is required'],
    min: [18, 'Age must be between 18 and 30'],
    max: [30, 'Age must be between 18 and 30'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    validate: {
      validator: function(v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: props => `${props.value} is not a valid email!`,
    },
  },
  citychoice: {
    type: String,
    required: [true, 'Citychoice is required'],
    uppercase: true,  
    enum: {
      values: ['AHMEDABAD', 'PUNE', 'BANGALORE'],
      message: 'Citychoice must be either AHMEDABAD, PUNE, or BANGALORE',
    },
  },
});


const Applicants = mongoose.model('Applicant', applicantSchemas);

const newApplicants = new Applicants({
  Firstname: 'rohit yadav',
  age: 25,
  email: 'rohit@gmail.com',
  citychoice: 'PUNE',
});
newApplicants.save()



// QB-564
// Consider following faculty collection:
// [{_id:123456788, name: “ABC”, subject: “FSD-2”, age:27},
// {_id:123456789, name: “PQR”, subject: “PYTHON-2”, age:31},
// {_id:123456790, name: “XYZ”, subject: “FSD-2”, age:29}]
// Write a query for following:
// (1) Update name= “DEF” & age= 32, where subject= “JAVA-2”. Insert new document, if record is
// not found.
// (2) Retrieve only name & age of documents having age greater than 28 & less than equal to 30


db.faculty.updateOne({ subject: "JAVA-2" },{$set: { name: "DEF", age: 32 }},{ upsert: true });
 db.faculty.find({ age: { $gt: 28, $lte: 30 } },{ _id: 0, name: 1, age: 1 });

  
//QB-565
// Write a node.js script to define a schema having fields like name & age.
// Apply following validations:
// (1) Name field must remove leading/trailing spaces, must accept values in lowercase, allowed
// values are “abc”, “def”, “pqr”, “xyz” & maximum length should be 10.
// (2) age must accept a value from 1<=age<=100 only

const mongoose = require('mongoose');
const { Schemax } = mongoose;

mongoose.connect('mongodb://localhost:27017/yourDatabaseName');

const applicantSchemax = new Schema({
  name: {
    type: String,
    trim: true,
    lowercase: true,
    enum: ['abc', 'def', 'pqr', 'xyz'],
    maxlength: 10,
    required: true
  },
  age: {
    type: Number,
    min: 1,
    max: 100,
    required: true
  }
});

const Applicant = mongoose.model('Applicant', applicantSchemax);

const newApplicant = new Applicant({
  name: 'abc',
  age: 25
});

newApplicant.save()
  









