const userController = {
    //create user
    createUser : async(req,res) => {
        const {username,email,password,firstname,lastname} = req.body;
        if(username || email || password || firstname || lastname)
        console.log({username,email,password,firstname,lastname});
        res.status(200).json({
            message : "Data Received"
        })        
    }
    //get user
    //update user
    //delete user from the database
}

module.exports = userController;