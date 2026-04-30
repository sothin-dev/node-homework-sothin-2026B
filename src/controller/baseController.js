export class baseController {
    success(res, message, data, statusCode = 200){
        return res.status(statusCode).json({
            success: true,
            message: message,
            data: data
        })
    }

    error(res,statusCode, message ){
        return res.status(statusCode).json({
            success: false,
            message: message,
        })
    }
}