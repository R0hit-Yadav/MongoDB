// const mg = require("mongoose")
// mg.connect("mongodb://127.0.0.1:27017/test")
// .then(()=>{
//     console.log("connected to database")
// })
// .catch((err)=>{console.log(err)})

// const mySchema = new mg.Schema({
//     name :  {type:String,required:true},
    
//     surname : String,
//     age: Number,
//     date : {type:Date, default:new Date()}
// })
// mg.pluralize(null)
// const person = new mg.model("person",mySchema)
// const personData = new person({
//     name : "John",
//     surname : "Doe",
//     age : 21
// })
// personData.save()




// const e = require("express");
// const mg = require("mongoose");

// mg.connect("mongodb://127.0.0.1:27017/test")
//     .then(() => {
//         console.log("Connected to the database");
//     })
//     .catch((err) => {
//         console.log(err);
//     });

// const mySchema1 = new mg.Schema({
//     name: { type: String, required: true },
//     surname: String,
//     age: Number,
//     date: { type: Date, default: new Date() }
// });

// mg.pluralize(null);
// const person1 = mg.model("person", mySchema1);


// const createDoc = async () => {
//     try {
//         const personData = new person({ name: 'def', surname: "dff", age: 18 });
//         const personData1 = new person({ name: 'xyz', surname: "ssd", age: 23 });
//         const result = await person1.insertMany([personData, personData1]);
//         console.log(result);
//     } catch (err) {
//         console.log(err);
//     }
// };
// createDoc();

// const create = async () => {
//     try {
//         const result = [];
//         result.push(await person.find());
//         result.push(await person.deleteOne({ name: "John" }));
//         console.log(result);
//     } catch (err) {
//         console.log(err);
//     }
// };
// create();


// const update = async (id) => {
//     try {
//         const result = await person.findByIdAndUpdate(
//             {__id:id},
//             { $set: { age: 27 } },
//             { new: true } 
//         );
//         console.log(result); 
//         return result;
//     } catch (error) {
//         console.error('Error updating document:', error);
//     }
// };
// update("676767");




const mg = require("mongoose");
const v = require("validator")
const mySchema3 = new mg.Schema({
    Username:{type:String,require:true,lowercase:true,trim:true,minlength:[4,"minimum length must be 4"],
        maxlength:[20,"Maximun length must be 4"]},
    mobilenum:{type:Number,match:[/\d{10}/,"must be 10 nums"]},
    gander:{require:true,enum:['Male',"Female"]},
    role:{type:String,default:"user"},
    age:{type:Number,validate(v1){if(v1<=0){
        throw new Error("value must be +ve")
    }}
    }
})


const person = new mg.model("person1",mySchema3)
const personData = new person({
    Username : "Jay",
    mobilenum : 9898904582,
    gander : "Male",
    role:"student",
    age:22,
})
personData.save()


