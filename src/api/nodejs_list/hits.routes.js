const express = require('express');
const router= express.Router();
const {hitsController}= require('./hits.controller');
//to search and view the diferents data have the view;
router.post('/list_hits', hitsController.hitsList);
router.delete('/delete_hits/:id', hitsController.deleteHit);
router.get('/get_data_hits/', hitsController.serverConectHits);

module.exports = router;