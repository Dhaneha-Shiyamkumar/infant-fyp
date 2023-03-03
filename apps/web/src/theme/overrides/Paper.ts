import { DefaultTheme } from '@mui/private-theming';

export default function Paper(theme: DefaultTheme) {
  return {
    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
  };
}
