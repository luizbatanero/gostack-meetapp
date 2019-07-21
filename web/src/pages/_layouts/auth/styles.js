import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  min-height: 100%;
  display: flex;
  padding: 30px;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 315px;
  margin: auto;
  text-align: center;
  background: #fff;
  padding: 45px 30px 30px;
  border-radius: 4px;
  box-shadow: 5px 10px 45px rgba(93, 97, 164, 0.25);
  position: relative;
  overflow: hidden;

  &:before {
    content: '';
    position: absolute;
    width: 100%;
    height: 200px;
    background: #f3f4fe;
    top: -90px;
    left: 0;
    transform: skewY(-10deg);
  }

  img {
    position: relative;
    z-index: 2;
  }

  form {
    display: flex;
    flex-direction: column;
    margin-top: 40px;
    position: relative;
    z-index: 2;

    .input-wrapper {
      position: relative;
      margin: 0 0 10px;
    }

    input {
      width: 100%;
      background: none;
      border: 0;
      border-bottom: 2px solid #eee;
      height: 44px;
      padding: 0;
      color: #444;
      transition: border 0.2s;

      &:focus ~ .input-border {
        width: 100%;
      }

      &::placeholder {
        color: #999;
      }
    }

    .input-border {
      position: absolute;
      top: 42px;
      left: 0;
      width: 0;
      height: 2px;
      background: #8e92de;
      transition: all 0.2s ease;
    }

    span {
      display: block;
      color: #e65175;
      margin: 5px 0 0;
      font-weight: bold;
      text-align: left;
    }

    button {
      margin: 25px 0 0;
      height: 44px;
      background: #445ae3;
      font-weight: bold;
      letter-spacing: 0.5px;
      color: #fff;
      border: 0;
      border-radius: 4px;
      font-size: 16px;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.045, '#445AE3')};
      }

      &:disabled {
        cursor: wait;
        opacity: 0.6;
      }
    }

    p {
      margin-top: 55px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      text-align: left;
      cursor: default;
      color: #777;
    }

    a {
      display: inline-block;
      padding: 5px 15px;
      border-radius: 3px;
      background: #9a68ed;
      color: #fff;
      font-size: 15px;
      letter-spacing: 0.5px;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.045, '#9a68ed')};
      }
    }
  }
`;
