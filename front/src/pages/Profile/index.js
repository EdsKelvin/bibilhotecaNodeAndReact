import * as React from 'react';
import {
    AppBar,
    Box,
    Container,
    CssBaseline,
    IconButton,
    Toolbar,
    Typography,
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const navigate = useNavigate();
    const handleHomeClick = () => {
        navigate('/home');
    };
    return (
        <div>
            <CssBaseline />
            <AppBar position="relative">
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <IconButton onClick={handleHomeClick}>
                        <MenuBookIcon sx={{ color: 'white' }} />
                    </IconButton>
                    <Typography variant="h6" color="inherit" align="center" sx={{ flexGrow: 1 }}>
                        Perfil
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container component="main" maxWidth="xs">
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        bgcolor: 'background.paper',
                        pt: 5,
                        pb: 6,
                    }}
                >
                    <IconButton>
                        <AccountCircleIcon sx={{ fontSize: 60 }} />
                    </IconButton>
                    <Typography>Email: example@example.com</Typography>
                    <Typography>Location: Country</Typography>
                    <Typography>Company: ABC Company</Typography>
                    <Typography>Position: Developer</Typography>
                    <Typography>Work Number: +123456789</Typography>
                    <Typography>Mobile Number: +987654321</Typography>
                    <Typography>Work Address: Address</Typography>
                </Box>         
            </Container>
        </div>
    );
};

export default Profile;