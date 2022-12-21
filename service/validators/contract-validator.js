import joi from 'joi';

const validation = joi.object({
    affair_limit: joi.number().integer(),
    signed_date: joi.date(),
    end_date: joi.date(),
    contract_details: joi.optional()
});

const validateContract = (params) => {
   const { error } = validation.validate(params);
   
   if (error) {
       throw error;
   }
   
   return true;
}
  
export default validateContract;