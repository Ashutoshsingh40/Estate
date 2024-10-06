import { Listing } from '../models/listing.model.js';
export const getvalue=async(req,res)=>
{
    try
    {
        const data=req.query.value;
   
    if(data==='hgPrice')
    {
      const a=await Listing.aggregate([
        {
          '$sort':
          {
            'regular':-1
          }  
        },
        {
           '$limit':5
        },
        {
            '$project':
            {
                'name':1,
                 'description':1,
                 'address':1,
                 'rent':1,
                 'sell':1,
                 'offer':1,
                 'regular':1,
                 'list':{ '$arrayElemAt': ["$list", 0] },
                 'bed':1,
                 'bath':1 
            }
        }
      ])
     
      return res.json({'r':a});
    }
    else if(data==='lwPrice')
    {
        const a=await Listing.aggregate([
            {
              '$sort':
              {
                'regular':1
              }  
            },
            {
                '$limit':5
             },
            {
                '$project':
                {
                    'name':1,
                     'description':1,
                     'address':1,
                     'rent':1,
                     'sell':1,
                     'offer':1,
                     'regular':1,
                     'list':{ '$arrayElemAt': ["$list", 0] },
                     'bed':1,
                     'bath':1 
                }
            }
          ])
          return res.json({'r':a});
    }
    else if(data==='latest')
    {
        const a=await Listing.aggregate([
            {
              '$sort':
              {
               'createdAt':-1
              }  
            },
            {
                '$limit':5
            },
            {
                '$project':
                {
                    'name':1,
                     'description':1,
                     'address':1,
                     'rent':1,
                     'sell':1,
                     'offer':1,
                     'regular':1,
                     'list':{ '$arrayElemAt': ["$list", 0] },
                     'bed':1,
                     'bath':1 
                }
            }
          ])
          return res.json({'r':a});
    }
    else
    {
        const a=await Listing.aggregate([
            {
              '$sort':
              {
                'createdAt':1
              }  
            },
            {
                '$limit':5
            },
            {
                '$project':
                {
                    'name':1,
                     'description':1,
                     'address':1,
                     'rent':1,
                     'sell':1,
                     'offer':1,
                     'regular':1,
                     'list':{ '$arrayElemAt': ["$list", 0] },
                     'bed':1,
                     'bath':1 
                }
            }
          ])
          return res.json({'r':a});
    }
    }
    catch(err)
    {
        console.log(err)
    }
}