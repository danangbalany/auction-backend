const express = require('express')
const router = express.Router()
const postController = require('../controller/posts')

router.get('/', postController.getAllList)
router.post('/store/', postController.createPost)
router.get('/:id', postController.getByid)
router.patch('/update/:id', postController.updatePost)
router.delete('/delete/:id', postController.deletePost)

module.exports = router;