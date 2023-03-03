import { DefaultTheme } from '@mui/private-theming';

export default function Table(theme: DefaultTheme) {
  return {
    MuiTableCell: {
      styleOverrides: {
        head: {
          color: theme.palette.text.secondary,
          backgroundColor: theme.palette.background.default,
        },
      },
    },
  };
}
