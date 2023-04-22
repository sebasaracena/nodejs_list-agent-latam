const express = require("express");
const router = express.Router();
const { nodejs_logsController } = require("./node_logs.controller");
//to search and view the diferents data have the view;
router.post("/list_logs", nodejs_logsController.logsList);

module.exports = router;
