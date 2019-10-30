const twitterDataDAO = require("../models/twitterDataDAO");

class FetchPush {
    constructor(twitterDataDAO) {
        this.twitterDataDAO = twitterDataDAO;
    }

    async fetchAndPush(req, res) {
        try{
            let query = {}
            if (req.body.min_followers !== undefined)
                query["min_followers"] = req.body.min_followers
            if (req.body.max_messages !== undefined)
                query["max_messages"] = req.body.max_messages
            const resp = await this.twitterDataDAO.addData(req.body.uid, query)
            res.render("fetchpush", {
                input_value: req.body.uid,
                title: "Fetch & Push",
            });
        } catch (err) {
            throw err
        }
    }
}

module.exports = FetchPush