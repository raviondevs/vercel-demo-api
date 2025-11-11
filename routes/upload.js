// const express = require("express");
// const multer = require("multer");

// const Document = require("../models/Document");
// const authenticateToken = require("../middleware/auth");
// const fs = require("fs");
// const ImageKit = require("imagekit");

// // const router = express.Router();
// const imagekit = new ImageKit({
//   publicKey: "public_lT7FWLB4O0wjLOaJDz4BILaeQ3M=",
//   privateKey: "private_ZHbZOed9A99mV5fblUnZO83pcPQ=",
//   urlEndpoint: "https://ik.imagekit.io/your_imagekit_id/",
// });

// // Multer Config
// const upload = multer({ dest: "uploads/" });

// router.post(
//   "/upload-doc",

//   upload.single("file"),
//   async (req, res) => {
//     try {
//       const file = req.file;

//       const uploadedFile = await imagekit.upload({
//         file: fs.readFileSync(file.path),
//         fileName: file.originalname,
//         folder: "/documents", // Optional folder in ImageKit
//         useUniqueFileName: true,
//       });

//       fs.unlinkSync(file.path); // Clean up temp file

//       res.status(201).json({
//         message: "Document uploaded successfully",
//         document: { url: uploadedFile.url },
//       });
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   }
// );

// module.exports = router;
