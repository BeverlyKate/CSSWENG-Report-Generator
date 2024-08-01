const express = require("express");
const app = express.Router();
const verifyJWT = require("../middleware/verifyJWT");
const loginLimiter = require("../middleware/loginLimiter");

async function dynamicImport() {
  try {
    // Dynamically import the module
    const { default: importController } = await import(
      "../controllers/importController.mjs"
    );

    // Now you can use the methods from importController
    //   importController.getFile
    app.post("/importFile", importController.importFile);
    // ... other logic ...
  } catch (error) {
    console.error("Error importing importController:", error);
  }
}
dynamicImport();
const mainController = require("../controllers/mainController.js");
const repairController = require("../controllers/repairController.js");
const dbController = require("../controllers/dbController.js");

app.post("/auth", loginLimiter, mainController.getMain);

// Refresh Token
app.route("/refresh").get(mainController.refresh);

// Logout
app.route("/logout").post(mainController.logout);

app.use(verifyJWT);


//Open Login
app.route("/").post(loginLimiter, mainController.login);
// app.get("/", mainController.login);
//Open Home
app.post("/login", mainController.getMain);
//Item Quantity Per Model
app.post("/IQPMpost", repairController.getTotalItemQuantityPerItemModel);
//Top Defects per Model
app.post("/TDPMpost", repairController.getTopDefectsPerItemModel);
//Pending Tasks per Model
app.post("/PTPMpost", repairController.getPendingStatusPerItemModel);
//Total Item Quantity Per Technician
app.post("/TIQPTpost", repairController.getTotalItemQuantityPerTechnician);
//Total item quantity per model per technician
app.post(
  "/TIQPMPTpost",
  repairController.getTotalItemQuantityPerItemModelPerTechnician
);
//Average working days per technician
app.post("/AWDPTpost", repairController.getAverageWorkingDaysPerTechnician);

//Update from db
app.patch("/api/tasks/update/:id", dbController.update);
// app.post('/update', dbController.update);

//Delete from db
app.delete("/api/tasks/delete/:repairId", dbController.delete);
// app.post("/delete", dbController.delete);

app.get("/table", repairController.getAllRepairs);

app.get("/import", mainController.getImport);

app.get("/home", mainController.getHome);

app.get("/passwordRecovery", mainController.getRecovery);

app.post("/recovery", mainController.postRecovery);

app.get("/registerUser", mainController.getRegister);

app.post("/newUser", mainController.postRegister);

app.route("/refresh").get(mainController.refresh);

app.route("/logout").post(mainController.logout);

module.exports = { app, dynamicImport };
