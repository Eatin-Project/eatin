import styled from "styled-components";
import { Spinner } from "react-bootstrap";
import { FC, PropsWithChildren } from "react";

interface Props {
    loading: boolean;
    text: string;
    spinnerSize?: string;
    spinnerHeight?: string;
}

const AsyncDataLoaderWrapper: FC<PropsWithChildren<Props>> = ({
                                                                loading,
                                                                text,
                                                                spinnerSize = "8em",
                                                                spinnerHeight = "100%",
                                                                children,
                                                              }) => {
  return (
    <>
      {loading ? (
        <SpinnerContainer size={spinnerHeight}>
          <div>
            <StyledSpinner size={spinnerSize} />
            <h6>{text}</h6>
          </div>
        </SpinnerContainer>
      ) : (
        children
      )}
    </>
  );
};

interface IStyledSpinner {
  size: string;
}

const StyledSpinner = styled(Spinner)<IStyledSpinner | any>`
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  border: 10px solid #f3f3f3;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: auto;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
      border-top-color: #ffeaee;
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

const SpinnerContainer = styled.div<IStyledSpinner>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${(props) => props.size};
  width: 100%;
`;

export default AsyncDataLoaderWrapper;
