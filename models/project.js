const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    subtitle: { type: String },
    shortDescription: { type: String },
    longDescription: { type: String },
    images: [{ type: String }],
    category: { type: String },
    categoryIcon: { type: String },
    isFeatured: { type: Boolean },
    status: { type: String },
    detailedTech: {
      frontend: [{ type: String }],
      backend: [{ type: String }],
      infrastructure: [{ type: String }],
    },
    features: [
      {
        title: { type: String },
        description: { type: String },
        icon: { type: String },
      },
    ],
    metrics: {
      teams: { type: String },
      tasksLogged: { type: String },
      hoursTracked: { type: String },
      retention: { type: String },
    },
    client: {
      name: { type: String },
   
    },
    timeline: {
      duration: { type: String },
      phases: [
        {
          name: { type: String },
          duration: { type: String },
          status: { type: String },
        },
      ],
    },
    challenges: [
      {
        challenge: { type: String },
        solution: { type: String },
      },
    ],
    results: [
      {
        metric: { type: String },
        value: { type: String },
        improvement: { type: String },
      },
    ],
    testimonial: {
      quote: { type: String },
      author: { type: String },
      role: { type: String },
      avatar: { type: String },
    },
    year: { type: String },
    links: {
      live: { type: String },
      github: { type: String },
    },
    images: [{ type: String }],
    gradient: { type: String },
    isVisible:{type:Boolean}

    // createdBy: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User",
    //   required: true,
    // },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);
