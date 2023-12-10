import express from 'express'
import {PrevLinkCtr} from '../controllers/prevLink.controllers'
const router = express.Router();
import { wrapperError  } from '../middlewares/error-handler'


router.get('/preview', wrapperError(PrevLinkCtr.getPrevLink));

router.get('/image-proxy', wrapperError(PrevLinkCtr.getMedia));

export default router;
