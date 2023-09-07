import React from "react";

const ServiceList = ({ data }) => {
  return (
    <div key={data.id} className="p-4 md:w-1/3">
      <div className="flex rounded-lg h-full bg-gray-100 p-8 flex-col">
        <div className="flex items-center mb-3">
          <h2 className="text-gray-900 text-lg title-font font-medium">
            {data.Title}
          </h2>
        </div>
        <div className="flex-grow">
          <p className="leading-relaxed text-base">
           {data.Description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ServiceList;
