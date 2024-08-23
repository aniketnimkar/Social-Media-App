import { useState } from "react";

const LeftView = () => {
  return (
    <>
      <section className="border border-dark bg-body-tertiary">
        <div
          className="d-flex flex-column align-items-center justify-content-center p-3"
          style={{ width: "250px", height: "100vh" }}
        >
          <ul className="nav flex-column mb-auto">
            <li className="nav-item fs-4">
              <a
                href="#"
                className="nav-link d-flex align-items-center text-dark"
              >
                <i className="bi bi-house-door-fill me-2"></i>
                <span className="d-none d-sm-inline">Home</span>
              </a>
            </li>
            <li className="nav-item fs-4">
              <a
                href="#"
                className="nav-link d-flex align-items-center text-dark"
              >
                <i className="bi bi-compass-fill me-2"></i>
                <span className="d-none d-sm-inline">Explore</span>
              </a>
            </li>
            <li className="nav-item fs-4">
              <a
                href="#"
                className="nav-link d-flex align-items-center text-dark"
              >
                <i className="bi bi-bookmark-fill me-2"></i>
                <span className="d-none d-sm-inline">Bookmarks</span>
              </a>
            </li>
            <li className="nav-item fs-4">
              <a
                href="#"
                className="nav-link d-flex align-items-center text-dark"
              >
                <i className="bi bi-heart-fill me-2"></i>
                <span className="d-none d-sm-inline">Liked Posts</span>
              </a>
            </li>
            <li className="nav-item">
              <button className="btn btn-dark w-100 mt-3">Post</button>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
};

export default LeftView;
