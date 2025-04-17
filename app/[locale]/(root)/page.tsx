import HeroImage from "@/components/shared/hero/hero";
import { getProductBy } from "@/lib/actions/products.action";
import Bestsellers from "@/components/shared/product/bestsellers";
import GeneralComments from "@/components/shared/general-comments";
import HomeFeature from "@/components/shared/home-feature";

const Homepage = async () => {
  const [bestsellerDevices] = await Promise.all([
    getProductBy({ types: "isNew" }),
    getProductBy({ types: "isBestseller" }),
  ]);

  return (
    <div className="grow">
      <HeroImage />

      {/* Bestsellers section*/}
      <Bestsellers bestsellers={bestsellerDevices} />

      {/* Featured section */}
      <HomeFeature />
      {/* Comments section */}
      <GeneralComments />
    </div>
  );
};

export default Homepage;
