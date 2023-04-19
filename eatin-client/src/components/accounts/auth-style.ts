import styled from "styled-components";
import { Button, TextField } from "@mui/material";

export const A = styled.a`
    color: #e14483;
`;

export const FormInput = styled(TextField)`
    font-size: 16px;
`;

export const ButtonWrapper = styled(Button)`
    background: linear-gradient(90deg, #e04490 0%, #e14026 47.92%, #e5622d 98.44%);
    border-radius: 15px !important;
    color: white !important;
`;

export const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    height: 100%;
`;

export const ColumnWrapper = styled.div`
    display: flex;
    flex-direction: column;
    text-align: start;
    margin-top: 16%;
    margin-left: 10%;
`;

export const Container = styled.div`
    background: #e14026;
    height: 100%;
    overflow-y: hidden;
    overflow-x: hidden;
`;

export const Form = styled.form`
    //padding: 15% 29% 20% 26%;
    width: 50%;
    height: 75%;
`;

export const Card = styled.div`
    width: 60%;
    height: 100%;
    border-radius: 38px;
    box-shadow: 0 0 8px 2px rgba(0, 0, 0, 0.125);
    background: #ebebeb;
    position: relative;
    left: 3%;
`;

export const AnimationText = styled.div`
    color: white;
    font-size: 32px;
    font-weight: 600;
    white-space: pre-line;
`;
