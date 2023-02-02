import React from 'react';
import { isRouteErrorResponse, useRouteError, Link } from 'react-router-dom';
import '../assets/css/error.css';

const ErrorPage: React.FC = () => {
  const error = useRouteError();

  if (isRouteErrorResponse(error))
    /* À faire à la fin, quand on devra gérer les erreurs côtés clients
    if (error.status === 401) {
      // ...
    }
    else if (error.status === 404) {
      // ...
    }
    */

    return (
      <div id="error-page">
        <h1>Oops! {error.status}</h1>
        <p>{error.statusText}</p>
        {/* eslint-disable-next-line @typescript-eslint/strict-boolean-expressions */}
        {error.data?.message && (
          <p>
            <i>{error.data.message}</i>
          </p>
        )}
        <p>
          go <Link to="/">back</Link>
        </p>
      </div>
    );
  else if (error instanceof Error)
    return (
      <div id="error-page">
        <h1>Oops! Unexpected Error</h1>
        <p>Something went wrong.</p>
        <p>
          <i>{error.message}</i>
        </p>
        <p>
          go <Link to="/">back</Link>
        </p>
      </div>
    );
  else return <></>;
};

export default ErrorPage;
