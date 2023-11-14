export const errorHandler = (err, req, res, next) => {
    // status code 
    const status = res.statusCode ? res.statusCode : 500;

    // send response 
    res.status(status).json({message: err.message});
};