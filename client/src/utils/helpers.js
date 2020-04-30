import React from 'react';
import validator from 'validator';
import Joi from '@hapi/joi';

const signUpSchema = Joi.object({
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{5,30}$'))
        .required(),
    // repeat_password: Joi.ref('password'),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'es'] } })
        .required()
});

const newSongSchema = Joi.object({
    songName: Joi.string().min(5).max(30).required(),
    songSession: Joi.string().min(5).max(30).required(),
    songGoodIdea: Joi.boolean().required(),

});

export const apiRequest = async ( url, method, bodyParams ) => {
    const response = await fetch(`http://localhost:3003${url}`, {
        method,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: bodyParams ? JSON.stringify(bodyParams) : undefined,
    });
    return await response.json();
};

export const getStoredUserAuth = () => {
    const auth = window.localStorage.getItem("UserAuth");
    if (auth) {
        return JSON.parse(auth);
    }
    return { id: '', email: '' };
};

export const validateLoginForm = (email, password, setError) => {
    if (!email || !password) {
        setError('Please enter a valid email and password.');
        return false;
    }
    if (!validator.isEmail(email)) {
        setError('Please enter a valid email address.');
        return false;
    }
    return true;
};
export const validateSignUpForm = async (email, password, setError) => {
    try {
        const { error, value } = await signUpSchema.validateAsync({ email, password }, signUpSchema);
        if (error) {
            setError(error);
            return false;
        }
        return true;
    } catch (err) {
        setError('There was an error while validation');
        return false;
    };
};

export const validateNewSongForm = async (songName, songSession, songGoodIdea, setError) => {
    try {
        const { error, value } = await newSongSchema.validateAsync({ songName, songSession, songGoodIdea }, newSongSchema);
        if (error) {
            setError(error);
            return false;
        }
        return true;
    }
    catch (err) { 
        setError('There was an error while validation');
        return false;
    };
};

export default { 
    apiRequest, 
    getStoredUserAuth,
    validateLoginForm,
    validateSignUpForm,
    validateNewSongForm
};
