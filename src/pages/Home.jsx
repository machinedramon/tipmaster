/* eslint-disable no-unused-vars */
import { Content } from "../components/Content";
import { ContentMenu } from "../components/ContentMenu";
import { Charts } from "../components/Charts";
import { ChartMenu } from "../components/ChartsMenu";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { ChartRollsPerHour } from "../components/ChartRollsPerHour";
import { ChartRollStatus } from "../components/ChartRollStatus";

export const Home = () => {
  return (
    <div className="grid h-screen grid-rows-[12vh_82vh_6vh] bg-[#1A242D]">
      <div className="bg-[#0F1923] flex items-center justify-center">
        <Header />
      </div>
      <div className="bg-[#1A242D] w-full grid grid-cols-[70vw_30vw] grid-rows-[100%_100%]">
        <div className="flex flex-col items-center justify-center gap-4">
          <ContentMenu />
          <Content />
        </div>
        <div className="flex flex-col items-center">
          <Charts />
        </div>
      </div>
      <div className="bg-[#0F1923] flex items-center justify-center">
        <Footer />
      </div>
    </div>
  );
};
