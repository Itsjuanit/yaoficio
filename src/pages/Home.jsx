import AppBanner from "../components/shared/AppBanner";
import WorkersGrid from "../components/workers/WorkersGrid";

const Home = () => {
  return (
    <div className="container mx-auto">
      <AppBanner></AppBanner>
      <WorkersGrid></WorkersGrid>
    </div>
  );
};

export default Home;
