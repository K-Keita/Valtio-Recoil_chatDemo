import type { NextPage } from "next";
import { RecoilRoot } from "recoil";
import { RecoilComponent } from "src/components/RecoilComponent";
import { ValtioComponent } from "src/components/valtioComponent";

const Home: NextPage = () => {
  return (
    <main className="p-3 md:flex">
      <ValtioComponent />
      <RecoilRoot>
        <RecoilComponent />
      </RecoilRoot>
    </main>
  );
};

export default Home;
