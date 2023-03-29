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

          <LoginForm />
        </StyledContent>
      </Container>
    </>
  );
}
