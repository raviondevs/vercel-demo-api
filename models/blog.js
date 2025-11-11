const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    subtitle: String,
    excerpt: String,
    content: String,
    author: {
      name: String,
      bio: String,
      avatar: String,
      social: {
        twitter: String,
        linkedin: String,
        github: String,
      },
    },
    readTime: String,
    category: String,
    tags: [String],
    image: String,
    featured: Boolean,
    tableOfContents: [
      {
        id: String,
        title: String,
        level: Number,
      },
    ],
    seoMeta: {
      description: String,
      keywords: [String],
      canonical: String,
    },
     isVisible:{type:Boolean}
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", blogSchema);
