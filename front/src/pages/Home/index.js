import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'; 
import BookmarkIcon from '@mui/icons-material/Bookmark'; 
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { IconButton } from '@mui/material';

const defaultTheme = createTheme();
const Home = () => {
  const [selectedBooks, setSelectedBooks] = React.useState([]);
  const { signout } = useAuth();
  const navigate = useNavigate();
  const handleBookmarkClick = (bookId) => {
    setSelectedBooks((prevSelectedBooks) => {
      if (prevSelectedBooks.includes(bookId)) {
        return prevSelectedBooks.filter((id) => id !== bookId);
      } else {
        return [...prevSelectedBooks, bookId];
      }
    });
  };
  const handleSignOut = () => {
    signout();
    navigate("/");
  };
  const handleProfileClick = () => {
    navigate("../Profile");
  };
  const books = [
    {
      id: 1,
      title: "Senhor dos anéis",
      author: "J.R.R. Tolkien",
      genre: "Ação",
      image: "https://osmelhoreslivros.com.br/wp-content/uploads/2022/09/o-senhor-dos-aneis.jpeg",
    },
    {
      id: 2,
      title: "Hamlet",
      author: "William Shakespeare",
      genre: "Drama",
      image: "https://m.media-amazon.com/images/I/51-8tjN4K3L.jpg",   
    },
  ];

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <MenuBookIcon sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" noWrap>
            Home Page
          </Typography>
          <IconButton color="inherit" onClick={handleProfileClick}>
            <AccountCircleIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <main>
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 5,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              DreamWork Books
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              DreamWork é um aplicativo gratuito para visualização de livros sendo lidos e para filtragem de livros por gênero preferido pelo usuário.
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button variant="contained">Ação</Button> 
              <Button variant="contained">Drama</Button>
            </Stack>
          </Container>
        </Box>
        <Container sx={{ py: 1 }} maxWidth="md">
          <Grid container spacing={4}>
            {books.map((book) => (
              <Grid item key={book.id} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="div"
                    sx={{
                    
                      pt: '100%',
                      objectFit: 'cover',
                    }}
                    image={book.image}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {book.title}
                    </Typography>
                    <Typography>
                      {book.author}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">View</Button>
                    <Button
                      size="small"
                      onClick={() => handleBookmarkClick(book.id)}
                    >
                      {selectedBooks.includes(book.id) ? <BookmarkIcon /> : <BookmarkBorderIcon />}
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
        <Button variant="contained" size="large" onClick={handleSignOut}>
          Sair
        </Button>
      </Box>
    </ThemeProvider>
  );
}

export default Home;