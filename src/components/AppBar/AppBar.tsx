import { styled } from '@mui/material';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

export const AppBar = styled(({ open, ...otherProps }) => <MuiAppBar {...otherProps} />)<AppBarProps>`
z-index: ${({ theme }) => theme.zIndex.drawer + 1};
${({ open }) =>
  open &&
  `
  /* Additional styles when 'open' is true */
`}
`;