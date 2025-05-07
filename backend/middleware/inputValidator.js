import Joi from "joi";  

const userSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    name: Joi.string().min(3).required(),
    country: Joi.string().required()
});

export const validateUser = (req, res, next) => {
    const { error, value } = userSchema.validate(req.body);
    if (error) {
        return res.status(400).json({status:400, message: error.details[0].message });
    }
    next();
};
    