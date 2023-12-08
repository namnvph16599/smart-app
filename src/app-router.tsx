import { memo } from "react";
import { RouterProvider } from "react-router-dom";
import useRouter from "./routers/use-router";

const AppRouter = memo(() => {
  const router = useRouter();

  return <RouterProvider router={router} />;
});

export default AppRouter;
