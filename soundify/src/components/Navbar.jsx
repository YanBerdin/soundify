import React from "react";
import styled from "styled-components";
import { useProvider } from "../utils/Provider";
import { FaSearch } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";

function Navbar({ $navBackground }) {
  const [{ userInfo }] = useProvider();
  console.log(userInfo); //TODO Remove this line

  return (
    <Container $navBackground={$navBackground}>
      <div className="search__bar">
        <FaSearch />
        <input type="text" placeholder="Artists, songs, or podcasts" />
      </div>
      <div className="avatar">
        <a href={userInfo?.userUrl}>
          <CgProfile />
          <span>{userInfo?.name}</span>
        </a>
      </div>
    </Container>
  );
}

const Container = styled.div`
  --background-default: none;
  --background-active: rgba(0, 0, 0, 0.7);
  --color-icon-default: #c7c5c5;
  --color-icon-hover: white;

  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
  height: 15vh;
  position: sticky;
  top: 0;
  transition: 0.3s ease-in-out;
  background-color: ${({ $navBackground }) =>
    $navBackground ? "var(--background-active)" : "var(--background-default)"};

  .search__bar {
    background-color: white;
    width: 30%;
    padding: 0.4rem 1rem;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    input {
      border: none;
      height: 2rem;
      width: 100%;
      &:focus {
        outline: none;
      }
    }
  }
  .avatar {
    background-color: black;
    padding: 0.3rem 0.4rem;
    padding-right: 1rem;
    border-radius: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    a {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0.5rem;
      text-decoration: none;
      color: var(--color-icon-default);
      font-weight: bold;
      transition: color 0.3s ease-in-out;
        svg {
          font-size: 1.3rem;
          background-color: #282828;
          padding: 0.2rem;
          border-radius: 1rem;
          color: var(--color-icon-default);
          transition: color 0.3s ease-in-out;
        }
        &:hover {
        color: var(--color-icon-hover);
        svg {
          color: var(--color-icon-hover); /* Changez la couleur ici */
        }
    }
  }
`;

export default Navbar;
