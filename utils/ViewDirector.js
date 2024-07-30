import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { useAuth } from './context/authContext';
import Loading from '../components/Loading';
import Signin from '../components/Signin';
import NavBar from '../components/NavBar';
import RegisterForm from '../components/RegisterForm';
import Footer from '../components/Footer';

const ViewDirectorBasedOnUserAuthStatus = ({
  component: Component, pageProps, hideNavbar, hideFooter,
}) => {
  const { user, userLoading, updateUser } = useAuth();
  const router = useRouter();
  const isHomePage = router.pathname === '/';

  if (userLoading) {
    return <Loading />;
  }

  if (user) {
    return (
      <>
        {!hideNavbar && <NavBar />}
        <div className="container">
          {'valid' in user ? (
            <RegisterForm user={user} updateUser={updateUser} />
          ) : (
            <Component {...pageProps} />
          )}
        </div>
        {!hideFooter && !isHomePage && <Footer />}
      </>
    );
  }

  return <Signin />;
};

ViewDirectorBasedOnUserAuthStatus.propTypes = {
  component: PropTypes.func.isRequired,
  pageProps: PropTypes.oneOfType([PropTypes.object]).isRequired,
  hideNavbar: PropTypes.bool,
  hideFooter: PropTypes.bool,
};

ViewDirectorBasedOnUserAuthStatus.defaultProps = {
  hideNavbar: false,
  hideFooter: false,
};

export default ViewDirectorBasedOnUserAuthStatus;
