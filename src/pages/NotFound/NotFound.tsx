import { Layout } from '../../components/modules/Layout';
import { Link } from 'react-router-dom';
import { CustomButtonPrimary } from '../../components/base';
import styles from './NotFound.module.scss';

export const NotFound = () => {


  return (
    <Layout>
      <div className={styles.notFound}>
        <div className={styles.notFoundContent}>
          <h1>404</h1>
          <h2>Page Not Found</h2>
          <p>The page you are looking for does not exist or has been moved.</p>
          <Link to="/">
            <CustomButtonPrimary>
              Return to Home Page
            </CustomButtonPrimary>
          </Link>
        </div>
      </div>
    </Layout>
  );
};
