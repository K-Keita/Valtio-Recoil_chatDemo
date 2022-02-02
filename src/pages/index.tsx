import type { NextPage } from "next";
import { RecoilComponent } from "src/components/RecoilComponent";
import { ValtioComponent } from "src/components/valtioComponent";
import { RecoilRoot } from "recoil";

const Home: NextPage = () => {
  return (
    <main className="flex">
      <p className="text-2xl">valtio</p>
      <ValtioComponent />
      <RecoilRoot>
        <p className="text-2xl">recoil</p>
        <RecoilComponent />
      </RecoilRoot>
    </main>
  );
};

export default Home;
