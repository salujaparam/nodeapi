const express = require("express");
const {
  getPosts,
  createPost,
  postByUser,
  postById,
  isPoster,
  deletePost,
  updatePost,
  photo,
  singlePost,
  like,
  unlike,
  comment,
  uncomment
} = require("../controllers/post");
const { createPostValidator } = require("../validator");
const { requireSignin } = require("../controllers/auth");
const { userById } = require("../controllers/user");

const router = express.Router();

router.get("/posts", getPosts);
router.put("/post/like", requireSignin, like);
router.put("/post/unlike", requireSignin, unlike);
router.put("/post/comment", requireSignin, comment);
router.put("/post/uncomment", requireSignin, uncomment);
router.post(
  "/post/new/:userId",
  requireSignin,
  createPost,
  createPostValidator
);
router.get("/posts/by/:userId", requireSignin, postByUser);
router.get("/post/:postId", singlePost);
router.put("/post/:postId", requireSignin, isPoster, updatePost);
router.delete("/post/:postId", requireSignin, isPoster, deletePost);
router.get("/post/photo/:postId", photo);

router.param("userId", userById);
router.param("postId", postById);

module.exports = router;
