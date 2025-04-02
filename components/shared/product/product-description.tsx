import type { ProductsDescription } from "@/types";

const ProductDescription = ({
  descriptionInfo,
}: {
  descriptionInfo: ProductsDescription;
}) => {
  return (
    <div className="space-y-6">
      {descriptionInfo.description.map(([category, details], index) => (
        <div key={index}>
          <h3 className="font-bold text-lg mb-2">{category}</h3>
          <div className="grid grid-cols-1 gap-4">
            {details.map(([key, value], i) => (
              <div
                key={i}
                className="grid grid-cols-2 items-center border-b pb-1"
              >
                <span className="text-gray-600">{key}</span>
                <span className="font-medium">{value}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductDescription;
