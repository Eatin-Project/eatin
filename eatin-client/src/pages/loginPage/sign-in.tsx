import "./auth-style.css";
import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    A,
    AnimationText,
    ButtonWrapper,
    Card,
    ColumnWrapper,
    Container,
    Form,
    FormInput,
    Wrapper,
} from "./auth-style";
import { useAuth } from "../../context/auth-context";
import { AuthErrorCodes } from "@firebase/auth";
import { ReactComponent as ChefAnimation } from "../../assets/Chef.svg";
import { ReactComponent as MediumLogo } from "../../assets/MediumLogo.svg";
import { useToastNotification } from "../../components/functions/useToastNotification";

const defaultFormFields = {
    email: "",
    password: "",
};

function SignIn() {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;
    const navigate = useNavigate();
    const { notify } = useToastNotification();

    const [loading, setLoading] = useState(false);
    const { signInUser } = useAuth();
    const resetFormFields = () => {
        return setFormFields(defaultFormFields);
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        try {
            const userCredential = await signInUser(email, password);

            if (userCredential) {
                resetFormFields();
                navigate("/home");
            }
        } catch (e: any) {
            console.log(e.code);

            if (e.code === AuthErrorCodes.INVALID_PASSWORD) {
                notify("The given password is invalid");
            } else if (e.code === AuthErrorCodes.USER_DELETED) {
                notify("The user was not found");
            } else if (e.code === AuthErrorCodes.TOO_MANY_ATTEMPTS_TRY_LATER) {
                notify("Too many attempts to connect were made. Please try again later");
            } else {
                console.log(e);
                notify("Something went wrong when signing in. Please try again later");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    };

    return (
        <Container>
            <Wrapper>
                <ColumnWrapper>
                    <AnimationText>Let’s Find Some Recipes!</AnimationText>
                    <AnimationText>Sign In First</AnimationText>
                    <ChefAnimation style={{ marginTop: "20%" }} />
                </ColumnWrapper>
                <Card>
                    <div className="d-flex ms-3 mt-3">
                        <MediumLogo />
                    </div>
                    <div className="d-flex align-items-center justify-content-center w-100 h-100">
                        <Form onSubmit={handleSubmit}>
                            <div className="my-3">
                                <FormInput
                                    name="email"
                                    type="email"
                                    className="w-100"
                                    required
                                    label="Email"
                                    variant="standard"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-3">
                                <FormInput
                                    name="password"
                                    type="password"
                                    className="w-100"
                                    required
                                    label="Password"
                                    variant="standard"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="d-grid mb-2">
                                <ButtonWrapper
                                    type="submit"
                                    disabled={loading}
                                    className="btn btn-primary"
                                >
                                    Sign In
                                </ButtonWrapper>
                            </div>
                            <div className="forgot-password text-right mt-5">
                                Don't have an account? <A href="/signUp">Sign Up</A>
                            </div>
                        </Form>
                    </div>
                </Card>
            </Wrapper>
        </Container>
    );
}

export default SignIn;
