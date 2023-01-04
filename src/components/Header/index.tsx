import React from 'react';
import { Link, AppBar, Toolbar, Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import Logo from '../../assets/images/sopra_steria.png';

const Bar = styled(AppBar)(( ) => ({
    position:'static',
}))

const StyledLink = styled(Link)(() => ({
    color:'inherit',
}))

/*
* Barre de navigation (en cours)
*/
function Header() {
    return (
        <Bar>
            <Container>
                <Toolbar>
                    <Container>
                        <StyledLink href='/'>
                            <Container
                                component="img"
                                sx={{
                                    height: 22,
                                    maxHeight: 22,
                                }}
                                alt="Sopra Steria"
                                src={Logo}
                            />
                        </StyledLink>
                    </Container>

                    <Container 
                        className='header-navigation'>
                        <StyledLink href='/challenges'>Exercices</StyledLink>
                        <StyledLink href='/leaderboard'>Classement</StyledLink>
                        <StyledLink href='/teams'>Equipes</StyledLink>
                    </Container>
                    <Container className='header-side'>
                        <StyledLink href='/profile'>Profile</StyledLink>
                    </Container>
                </Toolbar>
            </Container>
            
            
        </Bar>
    )
}

export default Header;