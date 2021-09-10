import { ErrorBoundary } from 'react-error-boundary';
import { Switch, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import Add from './pages/AddPresenter';
import Detail from './pages/DetailPresenter';
import Edit from './pages/EditPresenter';
import Error from './pages/Error';
import Home from './pages/HomePresenter';
import NotFound from './pages/NotFoundPresenter';
import Signin from './pages/SigninPresenter';

const Router: React.FC = () => {
  return (
    <ErrorBoundary FallbackComponent={Error}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/edit/:id" component={Edit} />
          <Route exact path="/book/:id" component={Detail} />
          <Route exact path="/add" component={Add} />
          <Route exact path="/signin" component={Signin} />
          <Route exact path="/" component={Home} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    </ErrorBoundary>
  );
};
export default Router;
