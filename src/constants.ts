
export const HTTP_STATUS = {
    BAD_REQUEST: 400,
    INTERNAL_SERVER_ERROR:500,
    CREATED:201,
    OK: 200,
    NOT_FOUND: 404
};

export const RESPONSE_MESSAGES = {
    BAD_REQUEST: {
        status : "bad request",
        message : "problem with name or description"
    },
    INTERNAL_SERVER_ERROR: {
        status: "internal server error",
        message: "internal server error"
    },
    SUCCESSFULLY_CREATED: (entity:string)=> ({
        status: "created",
        message: `Successfully created ${entity}`
    }),
    OK: {
        status: "request was successful",
        message: "request was successful"
    },
    SUCCESSFULLY_UPDATED:(entity:string)=>({
        status: "updated",
        message: `${entity} successfully updated`
    }),
    SUCCESSFULLY_DELETED:(entity:string)=>({
        status: "deleted",
        message: `${entity} successfully deleted`
    }),
    SUCCESSFULLY_FOUND:(entity:string)=>({
        status: `found`,
        message: `${entity} successfully found`
    }),
    NOT_FOUND:(entity:string)=>({
        status:"not found",
        message: `${entity} not found`
    })
}


