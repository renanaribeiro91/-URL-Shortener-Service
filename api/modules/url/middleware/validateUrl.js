const util = require('util');
const urlExists = util.promisify(require('url-exists'));


module.exports = async (req, res, next) => {
    try {
        const { fullURL } = req.body;

        const isExist = await urlExists(fullURL);

        if (!isExist) {
            return res.json({ message: 'URL not exist', type: 'failure' });
        }
        return next();
    } catch (error) {
        return next(error);
    }
};
