import { body } from "express-validator";

export const loginValidator = [
    body('username').trim()
    .notEmpty().withMessage('Username is required.'),

    body('password').trim()
    .notEmpty().withMessage('Password is required.'),
];

export const signupValidator = [
    body('username').trim()
    .notEmpty().withMessage('Username is required.').bail()
    .isLength({min: 8, max: 30}).withMessage('Username must be 8–30 characters long.')
    .matches(/^[A-Za-z0-9._-]+$/).withMessage('Username must only contain letters, numbers, dots (.), underscores (_) and hyphens (-).')
    .not().matches(/^[._-]/).withMessage('Username must not start with special characters (. _ -).')
    .not().matches(/[._-]$/).withMessage('Username must not end with special characters (. _ -).')
    .not().matches(/[._-]{2}/).withMessage('Username must not contain consecutive special characters (. _ -).'),

    body('password').trim()
    .notEmpty().withMessage('Password is required.').bail()
    .isLength({min: 8}).withMessage('Password must be at least 8 characters long.')
    .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter.')
    .matches(/[a-z]/).withMessage('Password must contain at least one lowercase letter.')
    .matches(/[\d]/).withMessage('Password must contain at least one number.')
    .matches(/[@#$%^&*!]/).withMessage('Password must contain at least one of the special characters (@#$%^&*!).')
    .matches(/^[A-Za-z\d@#$%^&*!]+$/).withMessage('Password must only include letters, numbers, and these special character: @#$%^&*!'),

    body('confirmPassword')
    .notEmpty().withMessage('Please confirm your password.').bail()
    .custom((value, {req}) => {
        if(value !== req.body.password){
            throw new Error('Passwords must match.');
        }
        return true;
    }),
];