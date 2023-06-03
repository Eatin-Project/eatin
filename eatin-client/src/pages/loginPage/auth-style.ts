import styled from "styled-components";
import {Button, TextField} from "@mui/material";

export const A = styled.a`
  color: #E14483;
`;

export const FormInput = styled(TextField)`
  font-size: 16px;
`;

export const ButtonWrapper = styled(Button)`
  background: linear-gradient(90deg, #E04490 0%, #E14026 47.92%, #E5622D 98.44%);
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
  background: #E14026;
  height: 100%;
  overflow: hidden;
`;

export const Form = styled.form`
  width: 50%;
  height: 70%;
`;

export const Card = styled.div`
  width: 60%;
  height: 100%;
  border-radius: 38px;
  box-shadow: 0 0 8px 2px rgba(0, 0, 0, .125);
  background: #EBEBEB;
  position: relative;
  left: 3%;
`;

export const AnimationText = styled.div`
  color: white;
  font-size: 32px;
  font-weight: 600;
  white-space: pre-line;
`;