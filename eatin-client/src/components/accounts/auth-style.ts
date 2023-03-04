import styled from "styled-components";
import {Dropdown} from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


export const H1 = styled.h1`
  color: #FF473C;
`;

export const A = styled.a`
  color: #FF473C;
`;

export const FormInput = styled.input`
  background-color: #f6f6f6;
  font-size: 16px;
  border-radius: 2px;
`;

export const DatePickerWrapper = styled(DatePicker)`
  background-color: #f6f6f6;
  font-size: 16px;
  border-radius: 2px;
`;

export const DropdownToggle = styled(Dropdown.Toggle)`
  background-color: #F6F6F6FF;
  font-size: 16px;
  border-radius: 2px;
  text-align: start;
  border-color: #ced4da;
  color: #6c757d;
  &:hover, &:active {
    background-color: #F6F6F6FF;
    border-color: #ced4da;
    color: #212529;
  }
`;

export const DropdownMenu = styled(Dropdown.Menu)`
  max-height: 25rem;
  overflow-y: scroll;
  color: #FD7269;
  background-color: #F6F6F6FF;
  &:hover, &:active {
    background-color: #F6F6F6FF;
    border-color: #ced4da;
  }
`;

export const Button = styled.button`
  background-color: #FD7269;
  border-color: #FF473C;
  border-radius: 2px;
  &:hover, &:active {
    background-color: #FD7269;
    border-color: #FF473C;
  }
`;

export const Wrapper = styled.div`
    display: flex;
    justify-content: space-around;
`;

export const Form = styled.form`
    padding: 2em 2em 2em 2em;
`;

export const Card = styled.div`
    margin: 3em 0 0 0;
    width: 30%;
    border: 1px solid rgba(0,0,0,.125);
    border-radius: .5rem;
    box-shadow: 0 0 8px 2px rgba(0,0,0,.125);
`;