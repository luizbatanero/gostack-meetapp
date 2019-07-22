import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 960px;
  margin: 50px auto;
  padding: 0 30px;

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
      font-weight: 400;
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
  }

  .image-wrapper {
    border-radius: 3px;
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

  main p {
    font-size: 16px;
    margin: 15px 0 30px;
    color: #545a8f;
  }

  footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid rgba(0, 0, 0, 0.06);
    padding-top: 20px;

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

export const Subscriptions = styled.div``;
