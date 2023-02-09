const mongo_query = require('../data/mongo_query_practice');

exports.mongo_result =  async()=>{
    return await mongo_query.mongo_result();
}