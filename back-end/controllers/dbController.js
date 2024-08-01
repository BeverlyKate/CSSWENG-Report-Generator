const repairModel = require("../models/repairSchema.js");

const dbController = {
  update: async function (req, res) {
    const repairId = req.params.id;
    const updateData = req.body;

    try {
      const repair = await repairModel.findOneAndUpdate(
        { repairId: repairId },
        updateData,
        { new: true }
      );
      if (repair) {
        res.status(200).json(repair);
      } else {
        res.status(404).json({ message: "Task not found" });
      }
    } catch (error) {
      console.error("update error: " + error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
    // res.render(table);
  },

  //Delete from database
  delete: async function (req, res) {
    const repairId = req.params.repairId; // Extract from req.params
    console.log(repairId);

    try {
      const result = await repairModel.deleteOne({ repairId: repairId });
      if (result.deletedCount === 0) {
        // res.render(table);
        return res.status(404).json({ error: "Task not found" });
      }
      console.log(result);
      return res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
      console.log("delete error: " + error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },
};

//Export dbController to be used
module.exports = dbController;
