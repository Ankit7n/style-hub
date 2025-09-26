import { useEffect, useState } from "react";
import Loader from "./Loader";

const AppLoader = ({ children }) => {
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsFirstLoad(false), 1500); // 1.5s splash
    return () => clearTimeout(timer);
  }, []);

  if (isFirstLoad) {
    return <Loader isLoading={true} />;
  }

  return children;
};

export default AppLoader;
