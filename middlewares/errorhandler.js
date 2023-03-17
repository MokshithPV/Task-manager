const errorhandler = (error,req,res,next)=>{
    res.status(500).json({msg:error});
    next();
}
module.exports = errorhandler;