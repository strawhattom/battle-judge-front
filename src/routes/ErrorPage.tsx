import React from 'react';
import { isRouteErrorResponse, useRouteError, Link } from 'react-router-dom';
import { Container } from '@/components';

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
      <Container cols={1}>
        <h1 className="text-2xl">Oops! {error.status}</h1>
        <p className="text-xl">{error.statusText}</p>
        {/* eslint-disable-next-line @typescript-eslint/strict-boolean-expressions */}
        {error.data?.message && (
          <p>
            <i className="text-lg text-red-600">{error.data.message}</i>
          </p>
        )}
        <p className="text-lg">
          go{' '}
          <Link to="/" className="text-sky-600">
            back
          </Link>
        </p>
      </Container>
    );
  else if (error instanceof Error)
    return (
      <Container cols={1}>
        <h1 className="text-2xl">Oops! Unexpected Error</h1>
        <p className="text-xl">Something went wrong.</p>
        <p>
          <i className="text-lg text-red-600">{error.message}</i>
        </p>
        <p className="text-lg">
          go{' '}
          <Link to="/" className="text-sky-600">
            back
          </Link>
        </p>
      </Container>
    );
  else return <></>;
};

export default ErrorPage;
