var Blogs = require('../models/blog')
const upload = require('../functions/upload')
const multer = require('multer')
module.exports = {
  addBlogs: async (req, res, next) => {
    try {

      let newUpload = multer({
        storage: upload.blogStorage,
        fileFilter: upload.fileFilter
      }).fields([
        { name: 'blogImage', maxCount: 1 }
      ]);


      newUpload(req, res, async function (err) {
        try {
          let file = req.files;
          let image = file ? (file?.blogImage ? file.blogImage[0].filename || null : null) : null
          const { title, content } = req.body;

          var checkField = []

          if (!title) {
            checkField.push("title")
          }

          if (!content) {
            checkField.push("content")
          }

          if (checkField.length > 0) {
            return res.status(400).json({
              success: false,
              status: 400,
              message: `Required field ${checkField} are missing, please check`,
            });
          }

          const blogs = await Blogs.create({
            title,
            content,
            image: image
          });

          if (!blogs) {
            return res.status(400).json({
              success: false,
              status: 400,
              message: "Blogs has not been added successfully",
            });
          }

          return res.status(200).json({
            success: true,
            status: 200,
            message: "Blogs has been added successfully",
          })
        }
        catch (error) {
          console.log(error)
          return res.status(500).json({
            success: false,
            status: 500,
            message: "Something went wrong, please try again",
          });
        }
      })
    } catch (error) {
      next(error);
      return res.status(500).json({
        success: false,
        status: 500,
        message: "Something went wrong, please try again",
      });
    }
  },
  getBlogs: async (req, res, next) => {
    try {
      const data = await Blogs.findAll();
      if (!data.length) {

        return res.status(404).json({
          success: false,
          status: 404,
          message: "No record(s) found",
        });
      }

      return res.status(200).json({
        success: true,
        status: 200,
        message: "Success",
        data: data
      })
    } catch (error) {
      next(error);
      return res.status(500).json({
        success: false,
        status: 500,
        message: "Something went wrong, please try again",
      });
    }
  },
  updateBlogs: async (req, res, next) => {
    try {

      let newUpload = multer({
        storage: upload.blogStorage,
        fileFilter: upload.fileFilter
      }).fields([
        { name: 'blogImage', maxCount: 1 }
      ]);


      newUpload(req, res, async function (err) {
        try {

          const { title, content } = req.body;
          const id = req.params.id;
          let file = req.files;
          let image = file ? (file?.blogImage ? file.blogImage[0].filename || null : null) : null
          const exist = await Blogs.findByPk(id);

          if (!exist) {
            return res.status(404).json({
              success: false,
              status: 404,
              message: "No record(s) found",
            });
          }

          var checkField = []

          if (!title) {
            checkField.push("title")
          }

          if (!content) {
            checkField.push("content")
          }

          if (checkField.length > 0) {
            return res.status(400).json({
              success: false,
              status: 400,
              message: `Required field ${checkField} are missing, please check`,
            });
          }

          const blogs = await Blogs.update({ title, content, image: image },
            {
              where: {
                id: id
              }
            }
          );

          if (!blogs) {
            return res.status(400).json({
              success: false,
              status: 400,
              message: "Blogs has not been updated successfully",
            });
          }

          return res.status(200).json({
            success: true,
            status: 200,
            message: "Blogs has been updated successfully",
          })
        }
        catch (error) {
          console.log(error)
          return res.status(500).json({
            success: false,
            status: 500,
            message: "Something went wrong, please try again",
          });
        }
      })
    } catch (error) {
      next(error);
      return res.status(500).json({
        success: false,
        status: 500,
        message: "Something went wrong, please try again",
      });
    }
  },

  deleteBlogs: async (req, res, next) => {
    try {
      const id = req.params.id;
      const exist = await Blogs.findOne({
        where: {
          id,
        },
      });

      if (exist) {
        const exist = await Blogs.destroy({
          where: {
            id: id,
          },
        });

        if (exist) {
          return res.status(200).json({
            success: true,
            status: 200,
            message: "Blog has been deleted successfully",
          });
        } else {
          return res.status(500).json({
            success: false,
            status: 500,
            message: "Something went wrong, please try again",
          });
        }
      } else {
        return res.status(404).json({
          success: false,
          status: 404,
          message: "No record(s) found",
        });
      }
    } catch (error) {
      next(error);
      return res.status(500).json({
        success: false,
        status: 500,
        message: "Something went wrong, please try again",
      });
    }
  }
}

