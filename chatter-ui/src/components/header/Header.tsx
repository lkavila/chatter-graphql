import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Branding from './Branding';
import MobileNavigation from './mobile/MobileNavigation';
import MobileBranding from './mobile/MobileBranding';
import Navigation from './Navigation';
import Settings from './Settings';
import { useReactiveVar } from '@apollo/client/react';
import authenticatedVar from '../../constants/authenticated';
import { unauthenticatedPages } from '../../constants/guard-exluded-routes';

const pages = [{
  title: "Home",
  path: "/"
}];

const Header = () => {
  const authenticated = useReactiveVar(authenticatedVar);

  return (
    <AppBar position="static" sx={{ height: "6vh"}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Branding />
          <MobileNavigation pages={authenticated ? pages : unauthenticatedPages} />
          <MobileBranding />
          <Navigation pages={authenticated ? pages : unauthenticatedPages} />
          {authenticated && <Settings />}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
