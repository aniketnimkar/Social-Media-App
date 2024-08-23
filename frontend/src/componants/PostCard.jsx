import React from "react";
import { OverlayTrigger, Popover } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector } from "react-redux";

const PostCard = () => {
  const post = useSelector((state) => state);
  console.log(post.posts.posts[0]);
  const popover = (
    <Popover id="popover-basic">
      {/* <Popover.Header as="h3">Popover Title</Popover.Header> */}
      <Popover.Body className="bg-dark rounded text-center">
        <span
          className="popover-item border-bottom pb-2"
          style={{ cursor: "pointer", display: "block", color: "white" }}
        >
          Edit
        </span>
        <span
          className="popover-item pt-2"
          style={{ cursor: "pointer", display: "block", color: "white" }}
        >
          Delete
        </span>
      </Popover.Body>
    </Popover>
  );

  return (
    <section>
      {/* <div className="mx-5 px-5">
        <div className="d-flex align-items-start border-bottom">
          <img
            style={{ width: "50px" }}
            className="img-fluid"
            src="
https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=1024x1024&w=is&k=20&c=6XEZlH2FjqdpXUqjUK4y0LlWF6yViZVWn9HZJ-IR8gU=
"
            alt="avatar"
          />
          <div className="ms-3" style={{ flexGrow: 1 }}>
            <p>
              Malaya Tiwari <span>Aug 21 2024</span>
              <OverlayTrigger
                trigger="click"
                placement="bottom"
                overlay={popover}
              >
                <i
                  className="bi bi-three-dots ms-4"
                  style={{ cursor: "pointer" }}
                ></i>
              </OverlayTrigger>
              <br />
              <span>@Malaya13</span>
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam
              commodi perferendis accusantium dolorem dolor eum delectus. Labore
              nobis asperiores consectetur doloribus eveniet maiores cupiditate,
              necessitatibus consequuntur, earum repellat nihil reprehenderit.
            </p>
          </div>
        </div>
        <div className="d-flex justify-content-between">
          <div>
            <i className="bi bi-heart"></i> <span>2</span>
          </div>
          <i className="bi bi-bookmark"></i>
          <div>
            <i className="bi bi-chat"></i> <span>4</span>
          </div>
          <i className="bi bi-share"></i>
        </div>
      </div> */}

      {post.posts.posts.map((post) => (
        <div className="mx-5 px-5">
          <div className="d-flex align-items-start border-bottom">
            <img
              style={{ width: "50px" }}
              className="img-fluid"
              src="
https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=1024x1024&w=is&k=20&c=6XEZlH2FjqdpXUqjUK4y0LlWF6yViZVWn9HZJ-IR8gU=
"
              alt="avatar"
            />
            <div className="ms-3" style={{ flexGrow: 1 }}>
              <p>
                Aniket Nimkar <span>Aug 21 2024</span>
                <OverlayTrigger
                  trigger="click"
                  placement="bottom"
                  overlay={popover}
                >
                  <i
                    className="bi bi-three-dots ms-4"
                    style={{ cursor: "pointer" }}
                  ></i>
                </OverlayTrigger>
                <br />
                <span>@half_pro88</span>
              </p>
              <p>
                {post.userContent.image && (
                  <img className="img-fluid" src={post.userContent.image} />
                )}
              </p>
              <p>{post.userContent.text}</p>
            </div>
          </div>
          <div className="d-flex justify-content-between">
            <div>
              <i className="bi bi-heart"></i> <span>2</span>
            </div>
            <i className="bi bi-bookmark"></i>
            <div>
              <i className="bi bi-chat"></i> <span>4</span>
            </div>
            <i className="bi bi-share"></i>
          </div>
        </div>
      ))}
    </section>
  );
};

export default PostCard;
