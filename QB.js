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
// 3) Update position of all employees to “Software Developer” whose name is “XYZ” and age
// is equal to 31. If not such document available than insert the document with updated values.
// 4) Display position and name of the employee having lowest salary.

