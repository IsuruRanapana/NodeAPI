const protect = (req, res, next) => {
    const {name, email, password} = req.body;
    console.log(name);
    next();
}
module.exports = protect;