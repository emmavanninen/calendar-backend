
const jwt = require("jsonwebtoken");
const User = require("../routes/models/User");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    console.log(`token`, token);
    
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token
    });

    if (!user) {
      throw new Error();
    }
    console.log(`user`, user);
    
    req.token = token;
    req.user = user;
    next();
  } catch (e) {
    res.status(401).send({ error: "please authenticate" });
  }
};

module.exports = auth;



// const jwt = require("jsonwebtoken");
// const User = require("../routes/models/User");

// const auth = (req, res, next) => {

//     const token = req.header("Authorization").replace("Bearer ", "");

//     const decoded = jwt.verify(token, process.env.SECRET_KEY);

//     const user = new Promise((resolve, reject) => {
 
//     User.findOne({_id: decoded._id, "tokens.token": token});
//         .then(result =>{
          
//             if (!user) {
//                 console.log('error in auth');
//             } else {
//             req.token = token;
//             req.user = user;
        
//             next()
//             }
    
//         })
//         .catch (error => reject(error))

// }


// module.exports = auth;
