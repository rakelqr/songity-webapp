import React from 'react';
import { Formik } from 'formik';

const modalSignUp = () => {
    const initialValues = {
        name: '',
        password: '',
        email: '',
    };

    return (
        <div>
            <Formik
                initialValues={initialValues}
                onSubmit={values => console.log('submitting', values)}
            >
                {({ handleSubmit, handleChange, values }) => (
                    <form onSubmit={handleSubmit}>
                        <div>
                            <input onChange={handleChange}
                                value={values.email}
                                name="email"
                                type="text"
                                placeholder="Email">
                            </input>
                            <input onChange={handleChange}
                                value={values.password}
                                name="password"
                                type="text"
                                placeholder="Password">
                            </input>
                            <input onChange={handleChange}
                                value={values.name}
                                name="name"
                                type="text"
                                placeholder="Name">
                            </input>
                        </div>
                        <div>
                            <button>Submit</button>
                        </div>
                    </form>
                )}
            </Formik>


        </div>
    )
}
export default modalSignUp;