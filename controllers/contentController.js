const { contents } = require("../models");
const { users } = require("../models");
const { imageKit } = require("../utils");

module.exports = {
  upload: async (req, res) => {
    try {
      const userId = parseInt(req.body.user_id);
      const user = await users.findUnique({
        where: {
          id: userId,
        },
      });

      if (!user) {
        return res.status(404).json({ error: "User Not Found" });
      }

      const fileToString = req.file.buffer.toString("base64");

      const uploadFile = await imageKit.upload({
        fileName: req.file.originalname,
        file: fileToString,
      });

      const data = await contents.create({
        data: {
          title: req.body.title,
          description: req.body.description,
          image: uploadFile.url,
          user: { connect: { id: userId } },
        },
      });
      return res.status(200).json({ data: data });
    } catch (error) {
      return res.status(500).json({
        error,
      });
    }
  },

  getAllContent: async (req, res) => {
    try {
      const data = await contents.findMany({
        orderBy: {
          id: 'asc'
        },
        include : {
          user : {
            select : {
              name: true,
            }
          }
        }
      });
      return res.status(200).json({ data: data });
    } catch (error) {
      return res.status(500).json({
        error,
      });
    }
  },

  getContentById: async (req, res) => {
    try {
      const contentById = parseInt(req.params.id);
      const data = await contents.findUnique({
        where: { id: contentById },
        include: {
          user: {
            select: {
              email: true,
              name: true,
            },
          },
        },
      });
      if (!data) {
        return res.status(404).json({
          error: "Content Not Found",
        });
      }
      return res.status(200).json({ data: data });
    } catch (error) {
      return res.status(500).json({
        error,
      });
    }
  },

  deleteContent: async (req, res) => {
    try {
      const id = parseInt(req.params.id);

      const content = await contents.findUnique({
        where: { id },
      });

      if (!content) {
        return res.status(404).json({ message: "Content not found" });
      }

      await contents.delete({
        where: { id },
      });

      return res.status(200).json({
        message: "Content was deleted",
      });
    } catch (error) {
      return res.status(500).json({
        error,
      });
    }
  },

  editContent: async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { title, description } = req.body;

      // Mengecek apakah content tersedia
      const content = await contents.findUnique({
        where: { id },
      });

      if (!content) {
        return res.status(404).json({ message: "Content not found" });
      }

      // Variabel untuk menyimpan hasil upload file jika ada
      let uploadFile;

      // Mengecek apakah ada file yang diunggah
      if (req.file) {
        const fileToString = req.file.buffer.toString("base64");

        uploadFile = await imageKit.upload({
          fileName: req.file.originalname,
          file: fileToString,
        });
      }

      const updateData = {
        title: title,
        description: description,
      };

      // Jika ada file yang diubah, tambahkan data gambar ke data update
      if (uploadFile) {
        updateData.image = uploadFile.url;
      }

      const updateContent = await contents.update({
        where: {
          id,
        },
        data: updateData,
      });

      return res.status(200).json({
        message: "Content updated successfully",
        data: updateContent,
      });
    } catch (error) {
      return res.status(500).json({
        error
      });
    }
  },
};
