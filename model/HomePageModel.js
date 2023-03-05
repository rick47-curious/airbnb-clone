const {MongoClient} = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();
var client = new MongoClient(process.env.MONGODB_URI);

exports.fetchProperties = async ()=>{
    try {
        await client.connect();
        let output = await client.db('sample_airbnb').collection('listingsAndReviews').find().limit(20).toArray();
       return output;
    } catch (error) {
        console.log(error);
    }finally{
        await client.close()
    }

    return null;
}

exports.fetchSearchedResult = async (location,guestCount,havingpets)=>{
    try {
        await client.connect();
        let output;
        if (havingpets){
            output = await client.db('sample_airbnb').collection('listingsAndReviews').find({"address.country":location,accommodates:{$gte:parseInt(guestCount)},house_rules:{$not:{$regex:'.*No Pets.*'}}}).limit(20).toArray();
        }else{
            output = await client.db('sample_airbnb').collection('listingsAndReviews').find({"address.country":location,accommodates:{$gte:parseInt(guestCount)}}).limit(20).toArray();
        }
        return output;
    } catch (error) {
        console.log(error);
    }finally{
        await client.close();
    }
}

exports.authenticateUserDB = async(reqemail,reqphone)=>{
    let output;
    try {
        await client.connect();
        if (reqemail!=''){
            output = await client.db('sample_airbnb').collection('users').find({email:reqemail}).toArray();
        }else if (reqphone!=''){
            let json = {phone:reqphone};
            output = await client.db('sample_airbnb').collection('users').find({phone:reqphone}).toArray();
        }
        return output;
    } catch (error) {
        console.log(error);
    }finally{
        await client.close();
    }
}