export const resFormat = (body)=>{
    console.log("body is : ", body)
    return {
        status : body.status,
        result  : body.result,
        error : body.error
    }
}