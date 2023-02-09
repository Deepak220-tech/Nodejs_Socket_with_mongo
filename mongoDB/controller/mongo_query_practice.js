const mongo_query =  require('../services/mongo_query_practice');
const apiResponse = require('../helper/response');
exports.mongo_result  = async(req,res)=>{
    const data  = await mongo_query.mongo_result();
    if(data.length >0)
      return apiResponse.successResponseWithData(res,"Data Found",data);
      return apiResponse.ErrorResponse(res,"Data not found");
}