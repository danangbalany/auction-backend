
const models = require('../models/index')
const asyncHandler = require('../middleware/asyncHandler')

/**
 * Route untuk mengambil semua data artikel
 */
exports.getAllList = asyncHandler(async(req,res, next) => {
        const posts = await models.posts.findAll({order: [['id', 'ASC'] ]});
        // const list =  posts.docs.map((doc) => ({id: doc.id, ... doc.data()}))
        res.json({
          'status': 'OK',
          'message': '',
          'data': posts
        })
})

/**
 * Route untuk mengambil artikel berdasarkan ID
 */
exports.getByid = asyncHandler(async(req,res,next) =>{
    try {			
        //mengangkap param ID
        const id = req.params.id;
        const post = await models.posts.findByPk(id);		
            
        if (post) {
          res.json({
            'status': 'OK',
            'messages': '',
            'data': post
          });
        } else {
          res.status(404).json({
            'status': 'NOT_FOUND',
            'messages': 'Data not found',
            'data': null 
          });
        }
      } catch (err) {		
        res.status(500).json({
          'status': 'ERROR',
          'messages': 'Internal Server Error'
        })
      }
})


/**
* Route untuk membuat artikel baru
*/
exports.createPost = asyncHandler( async(req, res, next) => {
    try {
        //menangkap form data yang dikirim melalu request body
        const {
          title,
          content,
          tags,
          published
        } = req.body;
        //membuat data baru di db menggunakan method create
        const post = await models.posts.create({
          title,
          content,
          tags,
          published
        });
        //jika data berhasil dibuat, kembalikan response dengan kode 201 dan status OK
        if (post) {
          res.status(201).json({
            'status': 'OK',
            'messages': 'Post berhasil ditambahkan',
            'data': post
          });
        }
      } catch(err) {
        res.status(400).json({
          'status': 'ERROR',
          'messages': err.message
        });
      }
})
/**
 * Controller untuk mengupdate artikel berdasarkan ID
 */
exports.updatePost = asyncHandler(async(req, res, next) => {
    try {
        const id = req.params.id
        const {
          title,
          content,
          tags,
          published
        } = req.body
        console.log(id)
        const post = models.posts.update({
          title,
          content,
          tags,
          published
        }, {
          where: {
            id: id
          }
        })
        if (post) {
          res.json({
            'status': 'OK',
            'messages': 'Post berhasil diubah'
          })
        }
      } catch(err) {
        res.status(400).json({
          'status': 'ERROR',
          'messages': err.message
        })
      }
})

/**
 * Route untuk menghapus artikel berdasarkan ID
 */
exports.deletePost = asyncHandler(async(req,res,next) => {
    try {
        const id = req.params.id
        const post = models.posts.destroy({
          where: {
            id: id
          }
        })
    
        if (post) {
          res.json({
            'status': 'OK',
            'messages': 'Post berhasil dihapus'
          })
        }
      } catch(err) {
        res.status(400).json({
          'status': 'ERROR',
          'messages': err.message
        })
      }
})