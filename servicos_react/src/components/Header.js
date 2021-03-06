import React, { useState, useLayoutEffect } from "react";

import { useHistory } from "react-router-dom";
import Firebase from "../services/FirebaseConnect";
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import styled from "styled-components";


function Header() {

  const Nav = styled.nav`
    background: #ffb816;
    height: 90px;
    display: flex;
    justify-content: space-between;
    padding: 0.5rem calc((100vw - 1000px) / 2);
    z-index: 10;
    width: 100%;

    /* Third Nav */
    /* justify-content: flex-start; */
  `;

  const NavLink = styled(Link)`
    color: #000;
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 0 1rem;
    height: 100%;
    cursor: pointer;

    &.active {
      color: #15cdfc;
    }
  `;

  const Bars = styled(FaBars)`
    display: none;
    color: #fff;

    @media screen and (max-width: 768px) {
      display: block;
      position: absolute;
      top: 0;
      right: 0;
      transform: translate(-100%, 75%);
      font-size: 1.8rem;
      cursor: pointer;
    }
  `;

  const NavMenu = styled.div`
    display: flex;
    align-items: center;
    margin-right: -24px;

    /* Second Nav */
    /* margin-right: 24px; */

    /* Third Nav */
    /* width: 100vw;
  white-space: nowrap; */

    @media screen and (max-width: 768px) {
      display: none;
    }
  `;

  const NavBtn = styled.nav`
    display: flex;
    align-items: center;
    margin-right: 24px;

    /* Third Nav */
    /* justify-content: flex-end;
  width: 100vw; */

    @media screen and (max-width: 768px) {
      display: none;
    }
  `;

  const NavBtnLink = styled(Link)`
    border-radius: 4px;
    background: #000;
    padding: 10px 22px;
    color: #fff;
    outline: none;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    text-decoration: none;

    /* Second Nav */
    margin-left: 24px;

    &:hover {
      transition: all 0.2s ease-in-out;
      background: #fff;
      color: #010606;
    }
  `;

  var isProfissional = false;

  let history = useHistory();

  const logoff = () => {
    sessionStorage.removeItem("uuid");
    Firebase.auth()
      .signOut()
      .then(() => {
        history.push("/");
      })
      .catch(() => {
        history.push("/");
      });
  };

  function selecionaUsuario() {
    Firebase.database()
      .ref("usuario/" + sessionStorage.getItem("uuid"))
      .on("value", (snapshot) => {
          if(snapshot.val()){
                isProfissional =  snapshot.val().profissional;
          }
      });
  };

  

  return (
    <>
    {selecionaUsuario()}
      <Nav>
        <NavLink to="/menu">
          <img src="logo.png" alt="logo" width="90px" />
        </NavLink>
        <Bars />
        <NavMenu>
          <NavLink to={isProfissional ? "/meus-servicos" : "/servicos-contratados-cliente"} activeStyle>
            {isProfissional ? "Meus Serviços" : "Serviços Contratados"}
          </NavLink>
          <NavLink to={isProfissional ? "/servicos-contratados-profissional" : "/pesquisar-profissional"} activeStyle>
            {isProfissional ? "Serviços Contratados" : "Pesquisar Profissional"}
          </NavLink>
          <NavLink to="/perfil" activeStyle>
            Perfil
          </NavLink>
        </NavMenu>
        <NavBtn>
          <NavBtnLink onClick={logoff}>Logoff</NavBtnLink>
        </NavBtn>
      </Nav>
    </>
  );
}

export default Header;
