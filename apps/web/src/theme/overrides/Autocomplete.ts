import { DefaultTheme } from '@mui/private-theming';

export default function Autocomplete(theme: DefaultTheme) {
  return {
    MuiAutocomplete: {
      styleOverrides: {
        paper: {
          boxShadow: theme.customShadows.z20,
        },
      },
    },
  };
}
