import FBLeadScript from "@/components/shared/FBLeadScript";
import Success from "@/components/shared/success";

const SuccessPage = () => {
  return (
    <>
      <FBLeadScript />

      <div className="wrapper flex-1 space-y-4 my-5">
        <div className="flex flex-col items-center justify-center p-8 space-y-8">
          <Success />
        </div>
      </div>
    </>
  );
};

export default SuccessPage;
