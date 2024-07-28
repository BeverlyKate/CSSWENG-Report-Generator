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
  },

  //Import file into database
  delete: async function (req, res) {
    const repairId = req.body.repairId;
    console.log(repairId);

    await repairModel
      .deleteOne({ repairId: repairId })
      .then((repair) => {
        console.log(repair);
      })
      .catch((error) => {
        console.log("delete error: " + error);
      });

    res.redirect(`/table`);
  },

  deleteAll: async function (req, res) {
    await repairModel
      .deleteAll()
      .then((repair) => {
        console.log("this is repair: ");
        console.log(repair);
      })
      .catch((error) => {
        console.log("delete error: " + error);
      });

    res.redirect(`/table`);
  },
};

//Export dbController to be used
module.exports = dbController;
