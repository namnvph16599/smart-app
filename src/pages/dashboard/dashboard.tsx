import AppRoutes from "../../routers/app-router";
import { AppLocation } from "../../components";
import { memo } from "react";

const Dashboard = memo(() => {
  return (
    <div className="bg-white px-[32px] custom-table">
      <AppLocation
        routes={[
          {
            label: "Home",
            to: AppRoutes.home,
          },
          {
            label: "Dashboard",
          },
        ]}
      />
      {/* <div className="pt-32px">Dashboard</div> */}
    </div>
  );
});

export default Dashboard;
