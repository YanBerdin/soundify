import  React from 'react';
import styled from 'styled-components';

export function Login() {
    return (
        <Container>
            <img src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg" alt="spotify-logo" />
            <button>LOGIN WITH SPOTIFY</button>
        </Container>
    )
}
const Container = styled.div`
    ${'' /* display: grid;
    place-items: center;
    height: 100vh;
    background-color: #f1f2f4; */}
`;
export default Login
