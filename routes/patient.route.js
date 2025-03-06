const express = require("express");
const patientController = require("../controller/patient.controller");
const upload = require('../middleware/upload.middleware');

const router = express.Router();

// Define '/enrolled' routes BEFORE '/:id'
router.put("/enrolled/:id", patientController.enrollPatient);
router.get("/enrolled", patientController.getEnrolledPatients);

// CRUD Routes
router.post("/create", upload.single("image"), patientController.createPatient);
router.get("/", patientController.getAllPatients);
router.get("/:id", patientController.getSinglePatient);
router.put("/:id", patientController.updatePatient);
router.delete("/:id", patientController.deletePatient);

module.exports = router;