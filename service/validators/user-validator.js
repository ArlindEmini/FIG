import joi from 'joi';

const validation = joi.object({
    username: joi.string().alphanum().min(3).max(30).trim(true).required(),
    full_name: joi.string().min(5).max(30).trim(true).required(),
    email: joi.string().email().trim(true).required(),
    password: joi.string().min(8).trim(true).required(),
    contact: joi.string().pattern(/[6-9]{1}[0-9]{9}/).required(),
    user_type: joi.number().integer().min(1).max(2)
.default([]),
   is_deleted: joi.boolean().default(false),
});

const validateUser = (params) => {
   const { error } = validation.validate(params);
   
   if (error) {
       throw error;
   }
   
   return true;
}
  
export default validateUser;