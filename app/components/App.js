import React from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background-color: black;
  font-family: 'Nunito', sans-serif;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const TextContainer = styled.div`
  opacity: 0;
  animation: ${fadeIn} 0.5s 0.1s ease-in forwards;
  color: white;
  font-size: ${props => props.big ? '1.55em' : '1em'};
  max-width: 30em;
  min-width: 10em;
  ${props => props.big ? 'text-align: center; font-weight: bold' : ''};
  

  .code {
    background-color: #2e2e2e;
    word-wrap: break-word;
    padding: 0.5em;
    border-radius: 6px;
    
    a {
      text-decoration: none;
      color: orange;
      transition: color 0.1s ease-in-out;
    }
    
    a:hover {
      color: blue;
    }
  }

  @media (max-width: 420px) {
    font-size: ${props => props.big ? '1.35em' : '0.8em'};
    max-width: 25em;
    min-width: 8em;
  }

`;

/* the main page for the index route of this app */
const App = () =>  {
    const example = JSON.stringify({
                      "original_url": "https://www.gmail.com",
                      "short_url": "https://microurlshort.glitch.me/SJccqajHz"
                    }, null, 2);
    return ( 
      <Container>
        <TextContainer big>
          <p>This is a url shortening microservice.</p>
        </TextContainer>
        <TextContainer>
          <p>Example of creating a short URL:</p>
          <p className='code'>https://microurlshort.glitch.me/new/https://www.gmail.com</p>
          <p>Sample Response</p>
          <p className='code'>{ example }</p>
          <p>Usage:</p>
          <p className='code'><a href='https://microurlshort.glitch.me/SJccqajHz'>https://microurlshort.glitch.me/SJccqajHz</a></p>
          <p>Will redirect to: </p>
          <p className='code'>https://www.gmail.com</p>
        </TextContainer>
      </Container>
    )
}

export default App;