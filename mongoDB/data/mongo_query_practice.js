const product_data = require('../model/product_model');
const order_data = require('../model/order_model');
const user_data = require('../model/user_model');

// exports.mongo_result = async()=>{
//     return await user_data.aggregate([
//         { $lookup : {
//             from : 'products',
//             localField : '_id',
//             foreignField : 'user_id',
//             as : 'products'
//         } },
//         { $unwind : {path:'$products',preserveNullAndEmptyArrays:true }},
//         { $lookup : {
//             from : 'orders',
//             localField : 'products._id',
//             foreignField : 'product_id',
//             as : 'orders'
//         } },
//         { $unwind : '$orders' },

//     ])
// }
exports.mongo_result = async () => {
    return await user_data.aggregate([
        {
            $lookup: {
                from: 'products',
                let: { user_id: "$_id" },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $and: [
                                    { $eq: ["$user_id", "$$user_id"] }
                                ],
                            },
                        },
                    },
                   // { "$project": { "_id": 0, "name": 1 }}
                ],

                as: "products",
            },
        },
        {$project:{_id:0}},
        { $unwind: { path: '$products', preserveNullAndEmptyArrays: true } },
        {
            $lookup: {
                from: 'orders',
                let: { product_id: "$products._id" },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $and: [
                                    { $eq: ["$product_id", "$$product_id"] }
                                ],
                            },
                        },
                    },
                   { "$project": { "_id": 0 ,"order_details":1}}
                ],

                as: "orders",
            }
        },
        { $unwind: { path: '$orders', preserveNullAndEmptyArrays: true } },
        {
            $addFields: {
                is_exist: {
                    $cond: {
                        if: { $eq: ["$orders.product_id", "$products._id"] },
                        then: true,
                        else: false,
                    },
                },
            },
        },

    ])
}