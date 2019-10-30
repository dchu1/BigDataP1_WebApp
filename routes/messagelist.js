const twitterDataDAO = require("../models/twitterDataDAO");

class MessageList {
    constructor(twitterDataDAO) {
        this.twitterDataDAO = twitterDataDAO;
    }

    async showMessages(req, res) {
        try{
        const resp = await this.twitterDataDAO.getMessages(req.body.uid);

        // check for empty body
        let messages = undefined
        if (resp == "")
            messages = []
        else
            messages = JSON.parse(resp)
        res.render("messages", {
            input_value: req.body.uid,
            title: "Messages",
            items: messages
          });
        } catch (err) {
            throw err
        }
    }
}

module.exports = MessageList