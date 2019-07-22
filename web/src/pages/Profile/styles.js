import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 600px;
  margin: 50px auto;
  padding: 0 30px;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    margin: 30px auto;
  }

  form {
    display: flex;
    flex-direction: column;

    input {
      background: #fff;
      border: 0;
      border-radius: 4px;
      height: 48px;
      padding: 0 15px;
      color: #515366;
      margin: 0 0 10px;
      transition: box-shadow 0.2s;

      &:focus {
        box-shadow: 0 0 3px rgba(93, 97, 164, 0.35);
      }

      &::placeholder {
        color: #999;
      }
    }

    span {
      display: block;
      color: #e65175;
      margin: -5px 0 10px;
      font-weight: bold;
      text-align: left;
    }

    hr {
      border: 0;
      margin: 25px 0 0;
    }

    button {
      margin: 15px 0 0;
      height: 52px;
      background: #445ae3;
      font-weight: bold;
      letter-spacing: 0.5px;
      color: #fff;
      border: 0;
      border-radius: 4px;
      font-size: 16px;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.045, '#445ae3')};
      }
    }
  }

  > button {
    display: flex;
    align-items: center;
    align-self: center;
    margin-top: 15px;
    height: 44px;
    font-weight: bold;
    background: none;
    color: #888;
    border: 0;
    font-size: 15px;
    letter-spacing: 0.5px;
    transition: opacity 0.2s;
    opacity: 0.7;

    svg {
      margin-left: 10px;
    }

    &:hover {
      opacity: 1;
    }
  }
`;
