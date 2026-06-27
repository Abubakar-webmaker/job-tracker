const router  = require("express").Router();
const auth    = require("../middleware/auth");
const Job     = require("../models/Job");

// Get all jobs
router.get("/", auth, async (req, res) => {
  const jobs = await Job.find({ userId: req.user.id }).sort({ createdAt: -1 });
  res.json(jobs);
});

// Add job
router.post("/", auth, async (req, res) => {
  const job = await Job.create({ ...req.body, userId: req.user.id });
  res.status(201).json(job);
});

// Update job
router.put("/:id", auth, async (req, res) => {
  const job = await Job.findOneAndUpdate(
    { _id: req.params.id, userId: req.user.id },
    req.body,
    { new: true }
  );
  res.json(job);
});

// Delete job
router.delete("/:id", auth, async (req, res) => {
  await Job.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
  res.json({ message: "Deleted" });
});

module.exports = router;