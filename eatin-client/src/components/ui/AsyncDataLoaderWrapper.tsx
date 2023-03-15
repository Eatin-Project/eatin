import styled from 'styled-components';
import { Spinner } from 'react-bootstrap';
import {FC} from "react";

interface Props {
    loading: boolean,
    text: string,
    children: any
}

const AsyncDataLoaderWrapper: FC<Props> = ({loading, text, children}) => {
  return (
    <>
    {loading ? (
      <SpinnerContainer>
      <div>
        <StyledSpinner />
        <h6>{text}</h6>
      </div>
    </SpinnerContainer>
    ) : (
      children
    )}
    </>
  );
}

const StyledSpinner = styled(Spinner)`
  width: 8rem;
  height: 8rem;
  border: 10px solid #f3f3f3;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: auto;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
      border-top-color: #FFEAEE;
    }
    25% {
      border-top-color: #fc9fb4;
    }
    50% {
      border-top-color: #d33354;
    }
    75% {
      border-top-color: #9f0c2c;
    }
    100% {
      transform: rotate(360deg);
      border-top-color: #540110;
    }
  }
`;

const SpinnerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background-color: rgba(255, 255, 255, 0.47);
`;

export default AsyncDataLoaderWrapper;
