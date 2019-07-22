import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 960px;
  margin: 50px auto;
  padding: 0 30px;

  @media (max-width: 768px) {
    margin: 30px auto;
  }

  form {
    display: flex;
    flex-direction: column;

    input,
    textarea {
      background: #fff;
      width: 100%;
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

    textarea {
      resize: none;
      height: 200px;
      padding: 15px;
    }

    span {
      display: block;
      color: #e65175;
      margin: -5px 0 10px;
      font-weight: bold;
      text-align: left;
    }

    > button {
      margin: 10px 0 0;
      align-self: flex-end;
      background: #445ae3;
      font-weight: bold;
      letter-spacing: 0.5px;
      color: #fff;
      border: 0;
      border-radius: 4px;
      padding: 10px 14px;
      font-size: 16px;
      transition: background 0.2s;
      display: flex;
      align-items: center;

      svg {
        margin-right: 8px;
      }

      &:hover {
        background: ${darken(0.045, '#445ae3')};
      }

      &:disabled {
        opacity: 0.7;
        cursor: wait;
      }
    }
  }
`;
