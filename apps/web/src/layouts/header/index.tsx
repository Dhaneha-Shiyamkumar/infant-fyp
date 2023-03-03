import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { Box, Stack, AppBar, Toolbar, IconButton } from '@mui/material';
import AccountPopover from './AccountPopover';
import { bgBlur } from '../../utils/css-style';
import Iconify from '../../components/iconify';
import { DefaultTheme } from '@mui/private-theming';
import Searchbar from './Searchbar';

const HEADER_MOBILE = 64;

const HEADER_DESKTOP = 92;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
const StyledRoot = styled(AppBar)(({ theme }: { theme: DefaultTheme }) => ({
  ...bgBlur({ color: theme.palette.background.default }),
  boxShadow: 'none',
  [theme.breakpoints.up('lg')]: {
    width: '100%',
  },
  background: 'transparent',
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: HEADER_MOBILE,
  [theme.breakpoints.up('lg')]: {
    minHeight: HEADER_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

Header.propTypes = {
  onOpenNav: PropTypes.func,
};

export default function Header({ onOpenNav }: { onOpenNav: any }) {
  return (
    <StyledRoot>
      <StyledToolbar>
        <IconButton
          onClick={onOpenNav}
          sx={{
            mr: 1,
            color: 'text.primary',
            display: { lg: 'none' },
          }}
        >
          <Iconify icon="eva:menu-2-fill" />
        </IconButton>

        <Box sx={{ flexGrow: 1 }} />

        <Stack
          direction="row"
          alignItems="center"
          spacing={{
            xs: 0.5,
            sm: 1,
          }}
        >
          <Searchbar />
          <AccountPopover />
        </Stack>
      </StyledToolbar>
    </StyledRoot>
  );
}
