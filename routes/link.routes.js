const express = require('express');
const router = express.Router();
const PrevLinkCtr = require('../controllers/prevLink.controllers');
const { wrapper: wrapperError } = require('../middlewares/error-handler');

router.get('/preview', wrapperError(PrevLinkCtr.getPrevLink));

module.exports = router;
