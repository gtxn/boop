import React from "react";
import styled from "styled-components";
import { Link } from "gatsby";

import $ from "../styles/globals";

const Container = styled.div`
  font-family: montserrat;
  color: white;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  width: 80%;
  padding: 20px;
  box-shadow: 2px 2px 10px white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 3;
`;

const LinkStyled = styled(Link)`
  color: ${$.colors.primary[100]};
`;

const NotFoundPage = () => {
  return (
    <main>
      <Container>
        <Wrapper>
          <title>Not found</title>
          <h1>Page not found</h1>
          <p>
            Sorry{" "}
            <span role="img" aria-label="Pensive emoji">
              😔
            </span>{" "}
            we couldn’t find what you were looking for.
            <br />
            <br />
            <LinkStyled to="/">Go home</LinkStyled>
          </p>
        </Wrapper>
      </Container>
    </main>
  );
};

export default NotFoundPage;
