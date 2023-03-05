import { Helmet } from 'react-helmet-async';
// @mui
import { styled } from '@mui/material/styles';
import {
  Link,
  Container,
  Typography,
  Divider,
  Stack,
  Button,
} from '@mui/material';
import Iconify from '../../components/iconify';
import LoginForm from './components/form';
import { AppConfig } from '../../config';

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

export default function LoginPage() {
  return (
    <>
      <Helmet>
        <title> Login | {AppConfig.name} </title>
      </Helmet>

      <Container maxWidth="lg">
        <StyledContent>
          <Typography variant="h4" gutterBottom>
            Sign in to {AppConfig.name}
          </Typography>

          <Typography variant="body2" sx={{ mb: 5 }}>
            Don’t have an account? {''}
            <Link variant="subtitle2">Get started</Link>
          </Typography>

          <Stack direction="row" spacing={2}>
            <Button fullWidth size="large" color="inherit" variant="outlined">
              <Iconify
                icon="eva:google-fill"
                color="#DF3E30"
                width={22}
                height={22}
              />
            </Button>

            <Button fullWidth size="large" color="inherit" variant="outlined">
              <Iconify
                icon="eva:facebook-fill"
                color="#1877F2"
                width={22}
                height={22}
              />
            </Button>

            <Button fullWidth size="large" color="inherit" variant="outlined">
              <Iconify
                icon="eva:twitter-fill"
                color="#1C9CEA"
                width={22}
                height={22}
              />
            </Button>
          </Stack>

          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              OR
            </Typography>
          </Divider>

          <LoginForm />
        </StyledContent>
      </Container>
    </>
  );
}
