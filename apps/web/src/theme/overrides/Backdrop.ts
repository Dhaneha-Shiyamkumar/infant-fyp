import { alpha } from '@mui/material/styles';
import { DefaultTheme } from '@mui/private-theming';

export default function Backdrop(theme: DefaultTheme) {
  return {
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backgroundColor: alpha(theme.palette.grey[800], 0.8),
        },
        invisible: {
          background: 'transparent',
        },
      },
    },
  };
}
