import { ConnectedRouter } from 'connected-react-router';
import { ErrorBoundary } from 'react-error-boundary';
import { Switch, Route } from 'react-router';
import history from './history';
import AddPresenter from './pages/AddPresenter';
import DetailPresenter from './pages/DetailPresenter';
import EditPresenter from './pages/EditPresenter';
import ErrorPresenter from './pages/ErrorPresenter';
import HomePresenter from './pages/HomePresenter';
import NotFoundPresenter from './pages/NotFoundPresenter';
import SigninPresenter from './pages/SigninPresenter';

const Router: React.FC = () => {
  return (
    <ErrorBoundary FallbackComponent={ErrorPresenter}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route exact path="/edit/:id" component={EditPresenter} />
          <Route exact path="/books/:id" component={DetailPresenter} />
          <Route exact path="/add" component={AddPresenter} />
          <Route exact path="/signin" component={SigninPresenter} />
          <Route exact path="/" component={HomePresenter} />
          <Route component={NotFoundPresenter} />
        </Switch>
      </ConnectedRouter>
    </ErrorBoundary>
  );
};
export default Router;
