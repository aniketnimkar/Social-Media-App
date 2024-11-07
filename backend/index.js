const express = require("express");
// const multer = require("multer");
// const { cloudinary, storage } = require("./cloudinaryConfig");
// const Image = require('./models/Image'); //
// const upload = multer({ storage }); // Using Cloudinary storage with multer
const app = express();
const cors = require("cors");

const corsOptions = {
  origin: "*",
  credential: true,
};

//initialising DataBase
const { intializeDatabase } = require("./db/db.connect");
//export model here
const { User, Post } = require("./models/user.models");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));

//calling db
intializeDatabase();

app.get("/", (req, res) => {
  res.send("Express server");
});

//for getting all users profile
app.get("/users", async (req, res) => {
  try {
    const users = await User.find().populate("posts");
    if (users.length >= 0) {
      res.status(200).json({ message: "Users found.", users });
    } else {
      res.status(400).json({ error: "Users not found." });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to getting users.", error });
  }
});

//for getting perticular user profile
app.get("/userProfile/:name", async (req, res) => {
  try {
    const name = req.params.name;
    const user = await User.findOne({ name: name }).populate("posts");
    if (user) {
      res.status(200).json({ message: "User found.", user });
    } else {
      res.status(404).json({ error: "User not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Faild to get User.", error });
  }
});

// for posting users
app.post("/user/postUser", async (req, res) => {
  try {
    const user = req.body;
    const newUser = new User(user);
    const saveUser = await newUser.save();
    if (saveUser) {
      res.status(200).json({ message: "User saved successfully", saveUser });
    } else {
      res.status(400).json({ error: "User not saved" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to create a user", error });
  }
});

// for making a post and storing it in the user posts array
app.post("/:userId/post", async (req, res) => {
  try {
    const userId = req.params.userId;

    const post = req.body;

    const newPost = new Post(post);
    const savedPost = await newPost.save();

    const user = await User.findByIdAndUpdate(
      userId,
      {
        $push: {
          posts: {
            $each: [savedPost._id],
            $position: 0,
          },
        },
      },
      { new: true }
    );

    res
      .status(201)
      .json({ message: "Post created successfully", post: savedPost, user });
  } catch (error) {
    res.status(500).json({ message: "Error creating post", error });
  }
});

//for storing the post in the user bookmark array
app.post("/:userId/post/:postId/bookmark", async (req, res) => {
  try {
    const userId = req.params.userId;
    const postId = req.params.postId;

    const post = await Post.findByIdAndUpdate(
      postId,
      { bookmarked: true },
      { new: true }
    );

    const user = await User.findByIdAndUpdate(
      userId,
      { $push: { bookmarks: postId }, bookmarked: true },
      { new: true }
    );

    if (post) {
      res.status(200).json({ message: "Post bookmarked", postId });
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to bookmark post" });
  }
});

// for removing post from bookmark
app.post("/user/remove-bookmark/:userId/:postId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const postId = req.params.postId;

    const post = await Post.findByIdAndUpdate(
      postId,
      { bookmarked: false },
      { new: true }
    );

    const user = await User.findByIdAndUpdate(
      userId,
      { $pull: { bookmarks: postId }, bookmarked: false },
      { new: true }
    ).populate("bookmarks");

    if (post) {
      res.status(200).json({
        messsage: "post removed from bookmarks",
        bookmarks: user.bookmarks,
      });
    } else {
      res.status(404).json({
        messsage: "Post not found",
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error removing post from bookmarks", error });
  }
});
// for making post likes update
app.post("/posts/like/:postId", async (req, res) => {
  try {
    const postId = req.params.postId;
    const post = await Post.findByIdAndUpdate(
      postId,
      {
        $inc: { likes: 1 },
        liked: true,
      },
      { new: true }
    );

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json({ message: "Post liked", post });
  } catch (error) {
    res.status(500).json({ message: "Error liking post", error });
  }
});

// for making post unlike update
app.post("/posts/unlike/:postId", async (req, res) => {
  try {
    const postId = req.params.postId;

    const post = await Post.findById(postId);

    if (post.likes > 0) {
      const post = await Post.findByIdAndUpdate(
        postId,
        {
          $inc: { likes: -1 },
          liked: false,
        },
        { new: true }
      );

      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      res.status(200).json({ message: "Post disliked", post });
    } else {
      res.status(400).json({ message: "Likes cannot be less than 0" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error liking post", error });
  }
});

// for getting all the posts
app.get("/users/posts", async (req, res) => {
  try {
    const allPosts = await Post.find().populate(
      "userId",
      "name userName profileImage"
    );
    if (allPosts.length >= 0) {
      res.status(200).json({ message: "All users post found", allPosts });
    } else {
      res.status(404).json({ message: "No posts found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Unable to get all posts", error });
  }
});

// for getting user posts only
app.get("/user/:userId/posts", async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId).populate("posts");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User posts found", posts: user.posts });
  } catch (error) {
    res.status(500).json({ message: "Error fetching user's posts", error });
  }
});

// for getting all bookmarked posts
app.get("/user/:userId/bookmarked/posts", async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId).populate({
      path: "bookmarks",
      populate: {
        path: "userId", // This will populate the userId field inside each post
        select: "name userName profileImage", // Specify which user fields to return
      },
    });

    if (user) {
      res.status(200).json({
        message: "bookmarked posts found",
        bookmarks: user.bookmarks,
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching bookmarked posts", error });
  }
});
//for getting main user profile
app.get("/profileUser/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId).populate("posts");
    if (user) {
      res.status(200).json({
        messsage: "User found.",
        user: user,
      });
    } else {
      res.status(404).json({
        messsage: "User not found",
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Error while finding user", error });
  }
});
//for editing post
app.put("/posts/editPost/:postId", async (req, res) => {
  try {
    const postId = req.params.postId;
    const postTextContent = req.body.postTextContent;
    console.log(postTextContent);
    const postImage = req.body.postImage;

    const post = await Post.findByIdAndUpdate(
      postId,
      {
        postTextContent: postTextContent,
        postImage: postImage,
      },
      { new: true }
    );

    if (post) {
      res.status(200).json({ message: "Post updated successfully", post });
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Unable to update psot", error });
  }
});

// for deleting post
app.delete("/user/:userId/delete/posts/:postId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const postId = req.params.postId;
    const deletePost = await Post.findByIdAndDelete(postId);

    const user = await User.findByIdAndUpdate(
      userId,
      { $pull: { posts: postId } },
      { new: true }
    );

    if (deletePost) {
      res
        .status(200)
        .json({ message: "Post deleted successfully", deletePost });
    } else {
      res.status(404).json({ message: "Post not deleted" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error occured while deleting post", error });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
