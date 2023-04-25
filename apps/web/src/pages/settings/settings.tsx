import { Helmet } from 'react-helmet-async';
import {
  Grid,
  Container,
  Stack,
  Typography,
  Box,
  Button,
  Card,
  CardHeader,
} from '@mui/material';
import { LanguagesEnum, useLanguageStore } from '../../store/language-store';
import { AppConfig } from '../../config';

export default function SettingsPage() {
  const { lang, setLang } = useLanguageStore();
  return (
    <>
      <Helmet>
        <title> Dashboard: Settings | {AppConfig.name} </title>
      </Helmet>

      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Settings
          </Typography>
        </Stack>

        <Card>
          <CardHeader title={'Change Languages'} />
          <Box sx={{ p: 3, pb: 1 }} dir="ltr">
            <Card sx={{ m: 1, p: 3 }}>
              <Typography variant="h5">English (Default)</Typography>
              <Typography sx={{ mt: 1 }}>
                Change the context in English Language
              </Typography>
              <Button
                variant="contained"
                sx={{ mt: 2 }}
                color="success"
                onClick={() => setLang(LanguagesEnum.ENGLISH)}
              >
                Change
              </Button>
            </Card>

            <Card sx={{ m: 1, p: 3 }}>
              <Typography variant="h5">Sinhala</Typography>
              <Typography sx={{ mt: 1 }}>
                Change the context in Sinhala Language
              </Typography>
              <Button
                variant="contained"
                sx={{ mt: 2 }}
                color="success"
                onClick={() => setLang(LanguagesEnum.SINHALA)}
              >
                Change
              </Button>
            </Card>

            <Card sx={{ m: 1, p: 3 }}>
              <Typography variant="h5">Tamil</Typography>
              <Typography sx={{ mt: 1 }}>
                Change the context in Tamil Language
              </Typography>
              <Button
                variant="contained"
                sx={{ mt: 2 }}
                color="success"
                onClick={() => setLang(LanguagesEnum.TAMIL)}
              >
                Change
              </Button>
            </Card>
          </Box>
        </Card>
      </Container>
    </>
  );
}
