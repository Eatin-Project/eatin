import {ChangeEvent, FormEvent, useState} from "react";
import {useNavigate} from "react-router-dom";
import {
    A,
    Button,
    Card,
    DatePickerWrapper,
    DropdownMenu,
    DropdownToggle,
    DropdownWrapper,
    DropdownItem,
    Form,
    FormInput,
    H1,
    Wrapper,
} from "./auth-style";
import {Gender} from "./genders.enum";
import {useAuth} from "../../context/auth-context";
import {Country} from "./countries.enum";
import {useCreateUserMutation} from "../../generated/graphql";

const defaultFormFields = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    gender: "",
    country: "",
};

function SignUp() {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const [birthDate, setBirthDate] = useState<Date | null>(null);
    const {firstName, lastName, email, password, phone, gender, country} =
        formFields;
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const {signUpUser} = useAuth();
    const resetFormFields = () => {
        return setFormFields(defaultFormFields);
    };
    const [createUser] = useCreateUserMutation();

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            // TODO: validate fields
            setLoading(true);
            signUpUser(
                firstName,
                lastName,
                email,
                password,
                phone,
                gender,
                birthDate,
                country
            ).then((userCredential: { user: { uid: any; }; }) => {
                if (userCredential) {
                    createUser({
                        variables: {
                            id: userCredential.user.uid,
                            firstname: firstName,
                            lastname: lastName,
                            email: email,
                            phone: phone,
                            gender: gender,
                            birthdate: birthDate,
                            country: country
                        }
                    }).then((user) => {
                        console.log(user.data?.createUser);
                    });
                    resetFormFields();
                    navigate("/home");
                }
            });
        } catch (error: any) {
            console.log("User Sign Up Failed", error.message);
        }

        setLoading(false);
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value});
    };

    const handleGenderChange = (gender: string) => {
        setFormFields({...formFields, gender: gender});
    };

    const handleCountryChange = (country: string) => {
        setFormFields({...formFields, country: country});
    };

    return (
        <Wrapper>
            <Card>
                <Form onSubmit={handleSubmit}>
                    <H1 className="mb-4">Sign Up</H1>
                    <div className="my-3 d-flex">
                        <FormInput
                            name="firstName"
                            type="text"
                            className="form-control w-50 me-1"
                            required
                            placeholder="First Name"
                            onChange={handleChange}
                        />
                        <FormInput
                            name="lastName"
                            type="text"
                            className="form-control w-50 ms-1"
                            required
                            placeholder="Last Name"
                            onChange={handleChange}
                        />
                    </div>
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
                    <div className="mb-3">
                        <FormInput
                            name="phone"
                            type="number"
                            className="form-control"
                            required
                            placeholder="Phone Number"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <DropdownWrapper>
                            <DropdownToggle id="gender-dropdown" className="form-control"
                                            style={{color: !!formFields.gender ? '#212529' : '#6c757d'}}>
                                {!!formFields.gender ? formFields.gender : "Gender"}
                            </DropdownToggle>
                            <DropdownMenu className="form-control">
                                {Object.keys(Gender)?.map((gender) => (
                                    <DropdownItem
                                        name="gender"
                                        key={gender}
                                        onClick={() => handleGenderChange(gender)}
                                    >
                                        {gender}
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        </DropdownWrapper>
                    </div>
                    <div className="mb-3">
                        <DatePickerWrapper
                            required
                            name="birthDate"
                            placeholderText="Birth date"
                            className="form-control"
                            selected={birthDate}
                            onSelect={(date: Date) => setBirthDate(date)}
                            onChange={(date: Date) => setBirthDate(date)}
                        ></DatePickerWrapper>
                    </div>
                    <div className="mb-3">
                        <DropdownWrapper>
                            <DropdownToggle id="country-dropdown" className="form-control"
                                            style={{color: !!formFields.country ? '#212529' : '#6c757d'}}>
                                {!!formFields.country ? formFields.country : "Country"}
                            </DropdownToggle>
                            <DropdownMenu className="form-control">
                                {Object.keys(Country)?.map((country) => (
                                    <DropdownItem
                                        name="country"
                                        key={country}
                                        onClick={() => handleCountryChange(country)}
                                    >
                                        {country}
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        </DropdownWrapper>
                    </div>
                    <div className="d-grid">
                        <Button
                            type="submit"
                            disabled={loading}
                            className="btn btn-primary"
                        >
                            Submit
                        </Button>
                    </div>
                    <p className="forgot-password text-right">
                        Already have an account? <A href="/signIn">Sign In</A>
                    </p>
                </Form>
            </Card>
        </Wrapper>
    );
}

export default SignUp;
