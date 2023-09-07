import React, { useEffect, useState } from "react";
import ServiceList from "../card/serviceList";
import { getServiceData } from "../../services";

const ServiceInfo = () => {
  const [data, setdata] = useState([]);

  useEffect(() => {
    const services = getServiceData();
    setdata(services);
  }, []);

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-20">
          <h2 className="text-xs text-indigo-500 tracking-widest font-medium title-font mb-1">
            TaskMaster Pro Services
          </h2>
          <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900">
            Empowering You to Master Daily Tasks and Collaborate Seamlessly
          </h1>
        </div>
        <div className="flex flex-wrap -m-4">
          {data.length > 0 && data.map((item) => <ServiceList data={item} />)}
        </div>
      </div>
    </section>
  );
};

export default ServiceInfo;
