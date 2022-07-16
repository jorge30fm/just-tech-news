<<<<<<< HEAD:routes/api/comment-routes.js
const router = require("express").Router();
const { Comment } = require("../../models");
=======
const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');
>>>>>>> develop:controllers/api/comment-routes.js

router.get("/", (req, res) => {
	Comment.findAll()
		.then((dbCommentData) => res.json(dbCommentData))
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

<<<<<<< HEAD:routes/api/comment-routes.js
router.post("/", (req, res) => {
	// expects => {comment_text: "This is the comment", user_id: 1, post_id: 2}
	Comment.create({
		comment_text: req.body.comment_text,
		user_id: req.body.user_id,
		post_id: req.body.post_id,
	})
		.then((dbCommentData) => res.json(dbCommentData))
		.catch((err) => {
			console.log(err);
			res.status(400).json(err);
		});
});

router.delete("/:id", (req, res) => {
	Comment.destroy({
		where: {
			id: req.params.id,
		},
	})
		.then((dbCommentData) => {
			if (!dbCommentData) {
				res.status(404).json({ message: "No comment found with this id!" });
				return;
			}
			res.json(dbCommentData);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
=======
router.post('/', withAuth, (req, res) => {
  // expects => {comment_text: "This is the comment", user_id: 1, post_id: 2}
  Comment.create({
    comment_text: req.body.comment_text,
    user_id: req.session.user_id,
    post_id: req.body.post_id
  })
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.delete('/:id', withAuth, (req, res) => {
  Comment.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbCommentData => {
      if (!dbCommentData) {
        res.status(404).json({ message: 'No comment found with this id!' });
        return;
      }
      res.json(dbCommentData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
>>>>>>> develop:controllers/api/comment-routes.js
});

module.exports = router;
