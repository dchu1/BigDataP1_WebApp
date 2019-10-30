const twitterDataDAO = require("../models/twitterDataDAO");

class FollowerList {
    constructor(twitterDataDAO) {
        this.twitterDataDAO = twitterDataDAO;
    }

    async showFollowers(req, res) {
        try{
        const resp = await this.twitterDataDAO.getFollowers(req.body.uid);

        // check for empty body
        let followers = undefined
        if (resp == "")
            followers = []
        else
            followers = JSON.parse(resp) 
        res.render("followers", {
            input_value: req.body.uid,
            title: "Followers",
            items: followers
          });
        } catch (err) {
            throw err
        }
    }
}

module.exports = FollowerList