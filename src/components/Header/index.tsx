import React from 'react';
import { Link, AppBar, Toolbar, Box } from '@mui/material';
import { useTheme, styled } from '@mui/material/styles';
import Logo from '../../assets/images/sopra_steria.png';

const Bar = styled(AppBar)(( ) => ({
    position:'relative',
    color:"default"
}))

/*
* Barre de navigation (en cours)
*/
function Header() {
    const theme = useTheme();

    return (
        <Box sx={{flexGrow:1}}>
            <Bar>
                <Toolbar>
                    <Box>
                        <Link href='/'>
                            <Box
                                component="img"
                                sx={{
                                    height: 22,
                                    maxHeight: 22,
                                    mr: 2
                                }}
                                alt="Sopra Steria"
                                src={Logo}
                            />
                        </Link>
                    </Box>

                    <Box 
                        className='header-navigation'>
                        <Link href='/challenges' color='inherit'>Exercices</Link>
                        <Link href='/leaderboard' color='inherit'>Classement</Link>
                        <Link href='/teams' color='inherit'>Equipes</Link>
                    </Box>
                    <Box className='header-side'>
                        <Link href='/profile' color='inherit'>Profile</Link>
                    </Box>
                </Toolbar>
                
            </Bar>
        </Box>
        
    )
}

export default Header;