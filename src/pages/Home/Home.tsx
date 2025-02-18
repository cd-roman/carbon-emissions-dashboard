import { Layout } from "../../components/modules";

import "./Home.scss";

export const Home = () => {
  return (
    <Layout>
      <main className="home">
        <div className="home__info">
          <h1>Travel smart, reduce carbon emissions</h1>
          <p>
            By calculating the number of your carbon emissions caused by flights
            and car trips, you can start planning your traveling more
            consciously and help mitigate climate change.
          </p>
          <p>
            You can do the calculation for flights, car trips, or both. The
            carbon calculator will sum your carbon emissions in total and count
            how many trees are needed to offset your footprint. Additionally,
            you can easily switch between km-mi and kg-lb in the side menu. Wish
            you a low-carbon journey!
          </p>
        </div>
        <div className="home__image">
          <img src="/Mask%20group.png" alt="plane and town" />
        </div>
      </main>
    </Layout>
  );
};
