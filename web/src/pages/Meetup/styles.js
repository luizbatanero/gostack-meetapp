import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 960px;
  margin: 50px auto;
  padding: 0 30px;

  @media (max-width: 768px) {
    margin: 30px auto;
  }

  .loading {
    display: flex;
    justify-content: center;
  }
`;

export const Details = styled.div`
  header {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 40px;

    h1 {
      color: #9a68ed;
      font-weight: 300;
      letter-spacing: 0.5px;
      font-size: 28px;
    }

    nav {
      display: flex;
    }

    button {
      border-radius: 4px;
      border: 0;
      padding: 8px 12px;
      display: flex;
      align-items: center;
      font-weight: bold;
      font-size: 14px;
      letter-spacing: 0.5px;
      color: #fff;
      transition: background 0.3s;

      + button {
        margin-left: 5px;
      }

      &.edit {
        background: #445ae3;
        &:hover {
          background: ${darken(0.03, '#445ae3')};
        }
      }

      &.cancel {
        background: #e65175;
        &:hover {
          background: ${darken(0.03, '#e65175')};
        }
      }

      svg {
        margin-right: 6px;
      }
    }

    @media (max-width: 768px) {
      flex-direction: column;
      margin-bottom: 30px;

      h1 {
        font-size: 24px;
        margin-bottom: 10px;
      }
    }
  }

  main {
    background: #fff;
    border-radius: 4px;
    overflow: hidden;
    box-shadow: 0 1px 3px rgba(93, 97, 164, 0.2);
  }

  .image-wrapper {
    overflow: hidden;
    background: rgba(0, 0, 0, 0.045);
    height: 0;
    width: 100%;
    padding-top: 37.778%;
    position: relative;

    img {
      display: block;
      max-width: 100%;
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
    }
  }

  .wrapper {
    padding: 25px 30px 30px;

    @media (max-width: 768px) {
      padding: 15px 20px 20px;
    }

    > p {
      font-size: 16px;
      margin: 0 0 30px;
      color: #545a8f;
    }
  }

  footer {
    display: flex;
    justify-content: space-between;
    border-top: 1px solid rgba(0, 0, 0, 0.06);
    padding-top: 20px;

    @media (max-width: 768px) {
      flex-direction: column;
    }

    p {
      color: #777;
      display: flex;
      align-items: center;

      + p {
        margin-top: 6px;
      }

      svg {
        margin-right: 8px;
      }
    }
  }
`;

export const Subscriptions = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    margin-top: 15px;
  }

  div {
    display: flex;

    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      border: 2px solid #fff;

      + img {
        margin-left: -10px;
      }
    }

    .dots {
      margin-left: -10px;
      background: rgba(0, 0, 0, 0.05);
      width: 40px;
      height: 40px;
      border: 2px solid #fff;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;

      div {
        width: 3px;
        height: 3px;
        background: rgba(0, 0, 0, 0.15);
        border-radius: 50%;
        margin-left: 2px;
      }
    }
  }

  span {
    margin-left: 10px;
    font-size: 13px;
    color: #777;

    strong {
      font-size: 14px;
      color: #9a68ed;
    }
  }
`;
