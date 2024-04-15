import styled from "styled-components";

export const S = {
  Wrapper: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: rgb(224, 235, 255);
    background: linear-gradient(
      90deg,
      rgba(224, 235, 255, 1) 0%,
      rgba(223, 223, 255, 1) 45%,
      rgba(188, 211, 240, 1) 100%
    );
  `,
  Form: styled.form`
    width: 90%;
    max-width: 700px;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #f9f9f9;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    @media screen and (min-width: 768px) {
      width: 70%;
    }
  `,
  Button: styled.button`
    width: 100%;
    padding: 10px 20px;
    background-color: ${(props) => (props.disabled ? "#ccc" : "#007bff")};
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
    font-size: 16px;

    &:hover {
      background-color: ${(props) => (props.disabled ? "#ccc" : "#0056b3")};
    }
  `,
  Title: styled.div`
    font-size: 25px;
    font-weight: 500;
    margin-bottom: 30px;
    position: relative;

    &::before {
      content: "";
      position: absolute;
      left: 0;
      bottom: 0;
      height: 3px;
      width: 30px;
      border-radius: 5px;
      background: linear-gradient(135deg, #71b7e6, #9b59b6);
    }
  `,
};
