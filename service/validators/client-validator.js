import joi from 'joi';

const validation = joi.object({
    full_name: joi.string().min(3).max(30).trim(true).required(),
    email: joi.string().email().trim(true).required(),
    contact: joi.string().pattern(/[6-9]{1}[0-9]{9}/).required(),
    address: joi.string().min(3).max(30).trim(true).required(),
    client_type: joi.number().integer().min(1).max(2)
.default([]),
   is_deleted: joi.boolean().default(false),
});

const validateClient = (params) => {
   const { error } = validation.validate(params);
   
   if (error) {
       throw error;
   }
   
   return true;
}
  
export default validateClient;