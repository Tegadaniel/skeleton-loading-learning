import React from "react";
import "../Global.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function SkeletonCard() {
  return (
    <section>
      <div className="grid-container">
        {Array(9)
          .fill()
          .map((item, index) => (
            <div className="grid-item" key={index}>
              <Skeleton duration={2} height={200} />
              <div className="overlay-text">
                <Skeleton duration={2} height={36} width={`40%`} />
                <Skeleton duration={2} height={36} width={`40%`} />
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}

export default SkeletonCard;
