const User = require("./schemas/user");
const Bill = require("./schemas/bill");

let userId = null;

User.insertMany([
    {
        firstName: "Vardenis",
        surname: "Pavardenis",
        userName: "Slapyvardiz",
        password: "1555a2",
        email: "test@test.com",
        phoneNumber: "8600000"
    },
    {
        firstName: "Jonas",
        surname: "Petraitis",
        userName: "Okkzzz",
        password: "8fsgss",
        email: "test@gmail.com",
        phoneNumber: "8600001"
    }
]).then(customers => {
    console.log(customers);
    //return User.deleteOne({name: "Jonas"});
    return User.find({name: "Jonas"});
}).then(remaining => {
    //console.log(remaining);
    userId = remaining[0]._id;
    Bill.create({
        date: "2010-10-10",
        amount: 60,
        user_id: userId
    })
    return Bill.find({user_id: userId});
}).then(selected => {
    console.log("Selected bill: " + selected);
})
.catch(e => {
    throw e;
})