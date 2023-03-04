import { ChangeEvent, FormEvent, useState } from 'react';
import { signInUser } from '../../firebase/firebase';
import { useNavigate } from 'react-router-dom';
import {A, Button, Card, Form, FormInput, H1, Wrapper} from "./auth-style";

const defaultFormFields = {
    email: '',
    password: ''
}

function SignIn() {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const resetFormFields = () => {
        return (
            setFormFields(defaultFormFields)
        );
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            setLoading(true);
            const userCredential = await signInUser(email, password);

            if (userCredential) {
                resetFormFields();
                navigate('/profile');
            }
        } catch (error:any) {
            console.log('User Sign In Failed', error.message);
        }

        setLoading(false);
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        setFormFields({...formFields, [name]: value })
    }

    return (
        <Wrapper>
            <Card>
                <Form onSubmit={handleSubmit}>
                    <H1 className="mb-4">Sign In</H1>
                    <div className="my-3">
                        <FormInput
                            name="email"
                            type="email"
                            className="form-control"
                            required
                            placeholder="Email"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <FormInput
                            name="password"
                            type="password"
                            className="form-control"
                            required
                            placeholder="Password"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="d-grid mb-3">
                        <Button type="submit" disabled={loading} className="btn btn-primary">
                            Submit
                        </Button>
                    </div>
                    <p className="forgot-password text-right">
                        Don't have an account? <A href="/signUp">Sign Up</A>
                    </p>
                </Form>
            </Card>
        </Wrapper>
    );
}

export default SignIn;
