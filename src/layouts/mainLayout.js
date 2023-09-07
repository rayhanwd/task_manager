import React from "react";
import Navigation from "../components/navigation/navigation";
import Footer from "../components/footer/footer";

const MainLayout = ({ children }) => {
  return (
    <div>
      <div className="container mx-auto">
        <Navigation />
      </div>
      {children}
      <Footer />
    </div>
  );
};

export default MainLayout;
