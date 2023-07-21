import { useRouteError } from "react-router-dom";

function ErrorPage() {
  const error: any = useRouteError();
  console.log(error, "error...");
  return <div>{error.statusText || error.message}</div>;
}

export default ErrorPage;
