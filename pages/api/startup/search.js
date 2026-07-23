import { createRequire } from "module";
const require = createRequire(import.meta.url);
import nc from "next-connect";
import dbConnect from "../../../lib/dbConnect";
import Startup from "../../../models/Startup";
import verifyAdmin from "../../../middleware/VerifyAdmin";
import verifyEmail from "../../../middleware/VerifyEmail";
import verifyLoggedin from "../../../middleware/VerifyLoggedin";

const router = nc();

// Startup search
router.post("/api/startup/search/", async (request, response) => {
  await dbConnect();
  try {
    let finder = await Startup.find(request.body);
    response.status(201).send(finder);
  } catch (error) {}
});

export default router;
