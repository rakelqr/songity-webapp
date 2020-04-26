import React from 'react'
import { Formik } from 'formik';

const modalSignIn = () => {
    const initialValues = {
        name: '',
        password: ''
    };
    return (
        <div>
            <Formik
                initialValues={initialValues}
                onSubmit={values => console.log('submitting', values)}
            >
                {({ handleSubmit, handleChange, values }) => (
                    <form onSubmit={handleSubmit}>
                        <input onChange={handleChange}
                            value={values.name}
                            name="name"
                            type="text"
                            placeholder="Name">
                        </input>
                        <button>Submit</button>
                    </form>
                )}
            </Formik>
            
        </div>
    )
}
export default modalSignIn;
