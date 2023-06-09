const router = require("express").Router();
const Users = require('../model/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// router.post("/register",async (req, res) => {
//     try {
//         const { username ,password } = req.body
//         let newUserName = username.toLowerCase().replace(/ /g, '')

//         const user_name = await Users.findOne({username: newUserName})
//         if(user_name) return res.status(400).json({msg: "This user name already exists."})

//         if(password.length < 6)
//         return res.status(400).json({msg: "Password must be at least 6 characters."})

//         // const passwordHash = await bcrypt.hash(password, 12)

//         // const newUser = new Users({
//         //      username: newUserName, password: passwordHash
//         // })

//         const newUser = new Users({
//              username: newUserName, password
//         })


//         const access_token = createAccessToken({id: newUser._id})
//         const refresh_token = createRefreshToken({id: newUser._id})

//         res.cookie('refreshtoken', refresh_token, {
//             httpOnly: true,
//             path: '/api/refresh_token',
//             maxAge: 30*24*60*60*1000 // 30days
//         })

//         await newUser.save()

//         res.json({
//             msg: 'Register Success!',
//             access_token,
//             refresh_token,
//             user: {
//                 ...newUser._doc,
//                 password: ''
//             }
//         })
//     } catch (err) {
//         return res.status(500).json({msg: err.message})
//     }
// });

router.post("/login",async (req, res) => {
    try {
        const { username, password } = req.body

        const user = await Users.findOne({username})

        if(!user) return res.status(400).json({msg: "This username does not exist."})

        // const isMatch = await bcrypt.compare(password, user.password)
        const isMatch = password === user.password ? true : false
        if(!isMatch) return res.status(400).json({msg: "Password is incorrect."})

        const access_token = createAccessToken({id: user._id})
        const refresh_token = createRefreshToken({id: user._id})

        res.cookie('refreshtoken', refresh_token, {
            httpOnly: true,
            path: '/api/refresh_token',
            maxAge: 30*24*60*60*1000 
        })

        res.json({
            msg: 'Login Success!',
            access_token,
            refresh_token,
            user: {
                ...user._doc,
                password: ''
            }
        })
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
});

router.post("/logout",  async (req, res) => {
    try {
        res.clearCookie('refreshtoken', {path: '/api/refresh_token'})
        return res.json({msg: "Logged out!"})
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
});

router.post("/refresh_token", async (req, res) => {
    try {
        const rf_token = req.body.rf_token;
        if(!rf_token) return res.status(400).json({msg: "Please login now."})

        jwt.verify(rf_token, process.env.REFRESH_TOKEN, async(err, result) => {
            if(err) return res.status(400).json({msg: "Please login now."})

            const user = await Users.findById(result.id).select("-password")

            if(!user) return res.status(400).json({msg: "This does not exist."})

            const access_token = createAccessToken({id: result.id})

            res.json({
                access_token,
                user
            })
        })
        
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}
);

const createAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN, {
      expiresIn: '3hr',
    });
  };
  
  const createRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN, {
      expiresIn: '7d',
    });
  };



module.exports = router;