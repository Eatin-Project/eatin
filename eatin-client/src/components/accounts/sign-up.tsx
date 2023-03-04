import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  A,
  Button,
  Card,
  DatePickerWrapper,
  DropdownMenu,
  DropdownToggle,
  Form,
  FormInput,
  H1,
  Wrapper,
} from "./auth-style";
import { Dropdown } from "react-bootstrap";
import { gendersEnum } from "./genders";
import { useAuth } from "../../context/auth-context";

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
  const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null);
  const { firstName, lastName, email, password, phone, gender, country } =
    formFields;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { signUpUser } = useAuth();
  const resetFormFields = () => {
    return setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      // TODO: validate fields
      setLoading(true);
      const userCredential = await signUpUser(
        firstName,
        lastName,
        email,
        password,
        phone,
        gender,
        dateOfBirth,
        country
      );

      if (userCredential) {
        resetFormFields();
        navigate("/home");
      }
    } catch (error: any) {
      console.log("User Sign Up Failed", error.message);
    }

    setLoading(false);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleGenderChange = (gender: string) => {
    setFormFields({ ...formFields, gender: gender });
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
            <Dropdown>
              <DropdownToggle id="dropdown" className="form-control">
                {!!formFields.gender ? formFields.gender : "Gender"}
              </DropdownToggle>
              <DropdownMenu className="form-control">
                {Object.keys(gendersEnum)?.map((gender) => (
                  <Dropdown.Item
                    name="gender"
                    key={gender}
                    onClick={() => handleGenderChange(gender)}
                  >
                    {gender}
                  </Dropdown.Item>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
          <div className="mb-3">
            <DatePickerWrapper
              required
              name="dateOfBirth"
              placeholderText="Date of birth"
              className="form-control"
              selected={dateOfBirth}
              onSelect={(date: Date) => setDateOfBirth(date)}
              onChange={(date: Date) => setDateOfBirth(date)}
            ></DatePickerWrapper>
          </div>
          <div className="mb-3">
            <FormInput
              name="country"
              type="text"
              className="form-control"
              required
              placeholder="Country"
              onChange={handleChange}
            />
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
