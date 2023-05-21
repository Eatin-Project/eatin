import "./auth-style.css";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthErrorCodes } from "@firebase/auth";
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
import { Gender } from "./types/genders.enum";
import { useAuth } from "../../context/auth-context";
import { Country } from "./types/countries.enum";
import { useCreateUserMutation } from "../../generated/graphql";
import { Autocomplete, FormControl, InputLabel, Select, SelectChangeEvent } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ReactComponent as ChefAnimation } from "../../assets/Chef.svg";
import { ReactComponent as MediumLogo } from "../../assets/MediumLogo.svg";
<<<<<<< main:eatin-client/src/components/accounts/sign-up.tsx
import { useUpdateUserRecommendations } from "../../graphql/queries/update_user_recommendations.query";
=======
import { useToastNotification } from "./../../components/functions/useToastNotification";
>>>>>>> Adding notification when the user does something wrong:eatin-client/src/pages/loginPage/sign-up.tsx

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
<<<<<<< main:eatin-client/src/components/accounts/sign-up.tsx
    const [userId, setUserId] = useState<string>("");
    const [updateRecommendations, setUpdateRecommendations] = useState<Boolean>(false);
=======

>>>>>>> Adding notification when the user does something wrong:eatin-client/src/pages/loginPage/sign-up.tsx
    const { firstName, lastName, email, password, phone, gender, country } = formFields;
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { signUpUser } = useAuth();
    const { notify } = useToastNotification();

    const resetFormFields = () => {
        return setFormFields(defaultFormFields);
    };

    const [createUser] = useCreateUserMutation();
<<<<<<< main:eatin-client/src/components/accounts/sign-up.tsx
    const { isUpdated: areUserRecommendationsUpdated } = useUpdateUserRecommendations(
        userId,
        updateRecommendations,
        setUpdateRecommendations,
    );

    useEffect(() => {
        if (areUserRecommendationsUpdated) {
            resetFormFields();
            navigate("/home");
        }
    }, [areUserRecommendationsUpdated, navigate]);
=======
    const ALPHA_NUMERIC_DASH_REGEX = /^[a-zA-Z]+$/;
>>>>>>> Adding notification when the user does something wrong:eatin-client/src/pages/loginPage/sign-up.tsx

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        try {
            const userCredential: { user: { uid: any } } = await signUpUser(
                firstName,
                lastName,
                email,
                password,
                phone,
                gender,
                birthDate,
                country,
<<<<<<< main:eatin-client/src/components/accounts/sign-up.tsx
            ).then((userCredential: { user: { uid: any } }) => {
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
                            country: country,
                        },
                    }).then((user) => {
                        setUserId(userCredential.user.uid);
                        setUpdateRecommendations(true);
                        console.log(user.data?.createUser);
                    });
                }
            });
        } catch (error: any) {
            console.log("User Sign Up Failed", error.message);
            setLoading(false);
        }
=======
            );
            if (userCredential) {
                const user = await createUser({
                    variables: {
                        id: userCredential.user.uid,
                        firstname: firstName,
                        lastname: lastName,
                        email: email,
                        phone: phone,
                        gender: gender,
                        birthdate: birthDate,
                        country: country,
                    },
                });
                console.log(user.data?.createUser);
                navigate("/home");
            } else {
                notify("Something went wrong when creating the user. Please try again later");
            }
        } catch (e: any) {
            if (e.code === AuthErrorCodes.WEAK_PASSWORD) {
                notify("The password should be at least 6 characters");
            } else if (e.code === AuthErrorCodes.EMAIL_EXISTS) {
                notify("The chosen email is already in used");
            } else {
                console.log(e);
                notify("Something went wrong when creating the user. Please try again later");
            }
        } finally {
            resetFormFields();
            setLoading(false);
        }
    };

    const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (value !== "" && !ALPHA_NUMERIC_DASH_REGEX.test(value)) {
            notify("You can only use letters in name fields");
            return;
        }
        handleChange(event);
    };

    const handlePhone = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.value.length <= 10) {
            handleChange(event);
        } else {
            notify("You can't have more then ten numbers in a phone number");
        }
>>>>>>> Adding notification when the user does something wrong:eatin-client/src/pages/loginPage/sign-up.tsx
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    };

    const handleGenderChange = (event: SelectChangeEvent) => {
        setFormFields({ ...formFields, gender: event.target.value });
    };

    const handleCountryChange = (country: string) => {
        setFormFields({ ...formFields, country: country });
    };

    return (
        <Container>
            <Wrapper>
                <ColumnWrapper>
                    <AnimationText>Let’s Meet!</AnimationText>
                    <AnimationText>Create an Account</AnimationText>
                    <ChefAnimation style={{ marginTop: "20%" }} />
                </ColumnWrapper>
                <Card>
                    <div className="d-flex ms-3 mt-3">
                        <MediumLogo />
                    </div>
                    <div className="d-flex align-items-center justify-content-center w-100 h-100">
                        <Form onSubmit={handleSubmit}>
                            <div className="my-3 d-flex">
                                <FormInput
                                    name="firstName"
                                    type="text"
                                    value={formFields["firstName"]}
                                    className="w-50 me-3"
                                    required
                                    label="First Name"
                                    variant="standard"
                                    onChange={handleNameChange}
                                />
                                <FormInput
                                    name="lastName"
                                    type="text"
                                    value={formFields["lastName"]}
                                    className="w-50 ms-3"
                                    required
                                    label="Last Name"
                                    variant="standard"
                                    onChange={handleNameChange}
                                />
                            </div>
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
                            <div className="mb-3">
                                <FormInput
                                    name="phone"
                                    type="number"
                                    className="w-100"
                                    required
                                    label="Phone Number"
                                    variant="standard"
                                    onChange={handlePhone}
                                    value={formFields["phone"]}
                                />
                            </div>
                            <div className="my-3 d-flex">
                                <FormControl variant="standard" className="w-50 me-3">
                                    <InputLabel id="gender-select-label">Gender *</InputLabel>
                                    <Select
                                        labelId="gender-label"
                                        id="gender-select"
                                        required
                                        value={formFields.gender}
                                        onChange={handleGenderChange}
                                        label="Gender"
                                    >
                                        {Object.keys(Gender)?.map((gender) => (
                                            <MenuItem key={gender} value={gender}>
                                                {gender}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <LocalizationProvider className="w-50" dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        className="ms-3"
<<<<<<< main:eatin-client/src/components/accounts/sign-up.tsx
                                        slotProps={{ textField: { variant: "standard" } }}
=======
                                        slotProps={{
                                            textField: { variant: "standard", required: true },
                                        }}
>>>>>>> Adding notification when the user does something wrong:eatin-client/src/pages/loginPage/sign-up.tsx
                                        label="Date Of Birth"
                                        value={birthDate}
                                        onChange={(date) => setBirthDate(date)}
                                    />
                                </LocalizationProvider>
                            </div>
                            <div className="mb-3">
                                <Autocomplete
                                    disablePortal
                                    id="combo-box-country"
                                    options={Object.values(Country)}
                                    onChange={(event: any, newValue: string | null) => {
                                        handleCountryChange(!!newValue ? newValue : "");
                                    }}
                                    renderInput={(params) => (
                                        <FormInput
                                            {...params}
                                            variant="standard"
                                            required
                                            label="Country"
                                        />
                                    )}
                                />
                            </div>
                            <div className="d-grid mb-2">
                                <ButtonWrapper
                                    type="submit"
                                    disabled={loading}
                                    className="btn btn-primary"
                                >
                                    Submit
                                </ButtonWrapper>
                            </div>
                            <div hidden={!loading}>Signing you up...</div>
                            <div className="forgot-password text-right mt-5">
                                Already have an account? <A href="/signIn">Sign In</A>
                            </div>
                        </Form>
                    </div>
                </Card>
            </Wrapper>
        </Container>
    );
}

export default SignUp;
