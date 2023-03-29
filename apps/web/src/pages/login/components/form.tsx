import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Link,
  Stack,
  IconButton,
  InputAdornment,
  TextField,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Iconify from '../../../components/iconify';
import { useSignInMutation } from '../../../hooks/auth/sign-in';
import { useTokenStore } from '../../../store/token-store';
import { useUserStore } from '../../../store/user-store';

export default function LoginForm() {
  const navigate = useNavigate();
  const signInMutation = useSignInMutation();

  const { setToken } = useTokenStore();
  const { setUser } = useUserStore();

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleClick = async () => {
    const data = (await signInMutation.mutateAsync({
      email: name,
      password: password,
    })) as {
      user: any;
      token: string;
    };

    setToken(data.token);
    setUser(data.user);
    navigate('/dashboard', { replace: true });
  };

  return (
    <>
      <Stack spacing={3}>
        <TextField
          name="email"
          label="Email address"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <TextField
          name="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  <Iconify
                    icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'}
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ my: 2 }}
      >
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        loading={signInMutation.isLoading}
        onClick={handleClick}
      >
        Login
      </LoadingButton>
    </>
  );
}
