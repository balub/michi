import { useRouteError } from "react-router-dom";

import Container from "@/components/container";

function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <Container>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </Container>
  );
}

export default ErrorPage;
