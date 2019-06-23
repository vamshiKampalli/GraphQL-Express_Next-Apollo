import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import App from '../components/App';
import Header from '../components/Header';
import BooksList from '../components/BooksList';

const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

export default () => (
  <Query query={IS_LOGGED_IN}>
  {({data})=>(data.isLoggedIn?
    <App>
    <Header />
    <BooksList />
  </App>:'Login Please'
  )}
  </Query>
)
