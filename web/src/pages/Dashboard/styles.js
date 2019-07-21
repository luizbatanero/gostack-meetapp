import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 960px;
  margin: 50px auto;
  padding: 0 30px;

  header {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 40px;

    h1 {
      color: #9a68ed;
      font-weight: 200;
      letter-spacing: 0.5px;
      font-size: 28px;
      text-transform: uppercase;
    }

    a {
      background: #9a68ed;
      border-radius: 4px;
      padding: 10px 14px;
      display: flex;
      align-items: center;
      font-weight: bold;
      font-size: 15px;
      letter-spacing: 0.5px;
      color: #fff;
      transition: background 0.3s;

      &:hover {
        background: ${darken(0.03, '#9a68ed')};
      }

      svg {
        margin-right: 8px;
      }
    }
  }
`;

export const MeetupsList = styled.div`
  .empty {
    border: 1px solid rgba(0, 0, 0, 0.05);
    border-radius: 4px;
    background: rgba(255, 255, 255, 0.15);
    padding: 15px;
    text-align: center;
    color: #545a8f;
  }

  a {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    background: #fff;
    border-radius: 4px;
    opacity: 0.8;
    transition: transform 0.3s, box-shadow 0.2s, opacity 0.2s;
    box-shadow: 0 1px 3px rgba(93, 97, 164, 0.2);

    + a {
      margin-top: 10px;
    }

    > p {
      margin: 0;
      color: #545a8f;
      font-size: 20px;
    }

    aside {
      color: #777;

      p {
        display: flex;
        align-items: center;
        margin: 0;

        svg {
          margin-right: 10px;
        }
      }
    }

    &:hover {
      opacity: 1;
      transform: translateY(-2px);
      box-shadow: 0 2px 7px rgba(93, 97, 164, 0.15);
    }

    &:active {
      transform: translateY(0);
      box-shadow: 0 1px 2px rgba(93, 97, 164, 0.25);
    }
  }
`;
