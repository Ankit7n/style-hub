import { useEffect, useState } from "react";

const Loader = ({ isLoading }) => {
  const [visible, setVisible] = useState(isLoading);

  useEffect(() => {
    if (!isLoading) {
      // wait for fade-out animation before unmounting
      const timer = setTimeout(() => setVisible(false), 500);
      return () => clearTimeout(timer);
    } else {
      setVisible(true);
    }
  }, [isLoading]);

  if (!visible) return null;

  return (
    <div className={`loader-overlay ${isLoading ? "fade-in" : "fade-out"}`}>
      <div className="loader">
        <div className="loader-items">
          <span className="item">👕</span>
          <span className="item">👗</span>
          <span className="item">👜</span>
          <span className="item">👟</span>
          <span className="item">⌚</span>
        </div>
        <p className="loading-text">Loading your Style Hub...</p>
      </div>
    </div>
  );
};

export default Loader;
