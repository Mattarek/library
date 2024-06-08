import { styled } from "@mui/material";
import { NavLink } from "react-router-dom";

export const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: black;
  &.active li {
    border-left: 3px solid #323334;
  }
`;