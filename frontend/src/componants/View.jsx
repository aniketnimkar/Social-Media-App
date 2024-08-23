import React from "react";
import LeftView from "./LeftView";
import MiddleView from "./MiddleView";
import RightView from "./RightView";

const View = () => {
  return (
    <>
      <section>
        <div className="row">
          <div className="col-md-3">
            <LeftView />
          </div>
          <div className="col-md-6 ">
            <MiddleView />
          </div>
          <div className="col-md-3">
            <RightView />
          </div>
        </div>
      </section>
    </>
  );
};

export default View;
