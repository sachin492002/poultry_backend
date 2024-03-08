
const UserModal = require("../models/userModal");
const bcrypt = require("bcrypt");
// GET Methods
exports.getUserById = (req, res, next) => {
  const id = req.params.id;

  UserModal.findById(id)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(404).json({ message: err });
    });
};

// POST Methods
exports.postUser = (req, res, next) => {

  UserModal.findOne({ email: req.body.username }).then((user) => {
    if (!user) {
      return res.status(401).json({ message: "User does not exist" });
    }
    bcrypt.compare(req.body.password, user.password).then((doMatch) => {
      if (doMatch) {
        return res.status(200).json({message:"Logged In..",token:token,user:user});
      }
      else
      return res.status(401).json({ message: "Invalid password" });
    }).catch((err) => {
      console.log(err);
      return res.json({ message: err });
    });
  });
};


exports.postRegister = (req, res, next) => {
  console.log("registration request ayi hai");
  const user = new UserModal({
    name: req.body.name,
    password: req.body.password,
    email: req.body.email,
  });

  user
    .save()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(401).json({ message: err });
    });
};


exports.postUpdateUser = (req, res, next) => {
  const { password, email, field, newvalue } = req.body;
  console.log(email);
  UserModal.findOne({email: email}).then((user) => {
    if (!user) {
        return res.status(403).json({message: "User does not exists"})
    }
     
    bcrypt.compare(password, user.password).then((doMatch) => {
      if (doMatch) {
            user.password = password
            user[field] = newvalue;
            user.save().then((result) => {
              console.log(result)
              return res.status(200).json({message: "Field Updated", result: user})
            });
          
      }
      else{
        return res.status(401).json({message: "Invalid Password"})
      }

    }).catch((err) => {
      console.log(err);
      return res.json({ message: err });
    });

})

};

