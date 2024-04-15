import styled from "styled-components";

export const S = {
  Wrapper: styled.div`
    width: 100%;
    margin-bottom: 27px;
    position: relative;
  `,
  Label: styled.label`
    display: block;
    font-weight: bold;
    margin-bottom: 10px;
    color: #333;
  `,
  Input: styled.input`
    height: 45px;
    width: 100%;
    padding: 5px;
    outline: none;
    font-size: 16px;
    border-radius: 5px;
    padding-left: 15px;
    border: 1px solid #ccc;
    border-bottom-width: 2px;
    box-sizing: border-box;
    transition: all 0.3s ease;
    &:focus {
      border-color: #5353ec;
    }
  `,
  Error: styled.span`
    color: rgb(255, 0, 50);
    font-size: 12px;
    margin-top: 4px;
    padding: 5px;
    position: absolute;
    bottom: -23px;
    left: 0;
  `,
  Select: styled.select`
    height: 45px;
    width: 100%;
    font-size: 16px;
    border-radius: 5px;
    padding: 10px;
    border: 1px solid #ccc;
    border-bottom-width: 2px;
    box-sizing: border-box;
    transition: all 0.3s ease;
    &:focus {
      border-color: #5353ec;
    }
  `,
  RadioItem: styled.div`
    margin-bottom: 8px;

    & input {
      margin-right: 10px;
    }
  `,
  CheckboxInput: styled.input`
    margin-right: 10px;
    height: 20px;
    width: 20px;
    outline: none;
    border-radius: 3px;
    border: 1px solid #ccc;
    box-sizing: border-box;
    transition: all 0.3s ease;
    cursor: pointer;

    &:focus {
      border-color: #5353ec;
      box-shadow: 0 0 0 2px rgba(155, 89, 182, 0.25);
    }
  `,
  LabelWrapper: styled.div`
    display: flex;
  `,
};
