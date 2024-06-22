module.exports = catchErr => (req, res, next)=>{
    Promise.resolve(catchErr(req, res, next)).catch(next)
}