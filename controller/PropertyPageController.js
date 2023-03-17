const model = require('../model/Model');

module.exports = {

    fetchPropertyDetails: async(inputId)=>{
        let result = await model.getProperty({_id:inputId});
        let res = {
            response: result
        }
        return res;
    }
}