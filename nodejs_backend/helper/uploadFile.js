const { v4 } = require("uuid");
const ErrorType = require("../errors/error-type");
const ServerError = require("../errors/server-error");

function uploadFile(request,result,next){
//when i do update it may that the user not chnage the image and stay with the old 
console.log(request.body.image)
if(req.body.image !== undefined){
    return next()
}
 else if(!req.files){
    return  next(new ServerError(ErrorType.NOT_PROVIDE_IMAGE_FILE))
 }
 const {productImage} = request.files;
 const fileExtinstionIndex = productImage.name.lastIndexOf(".");
 const fileExtinstion = productImage.name.substr(fileExtinstionIndex);
 const newFileName = v4() + fileExtinstion;
 productImage.mv("./images/"+newFileName,(error)=>console.log("file upload successfully"))
 request.body.image = `http://localhost:3006/images/${newFileName}`;
 return next()
}

module.exports = uploadFile;