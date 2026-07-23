import { createRequire } from "module";
const require = createRequire(import.meta.url);
import nc from "next-connect";
import dbConnect from "../../../lib/dbConnect";
import Startup from "../../../models/Startup";
import verifyAdmin from "../../../middleware/VerifyAdmin";
import verifyEmail from "../../../middleware/VerifyEmail";
import verifyLoggedin from "../../../middleware/VerifyLoggedin";

const router = nc();

router.get(
  "/api/startup/email/",
  [verifyLoggedin, verifyEmail],
  async (request, response) => {
    await dbConnect();
    try {
      let finder = await Startup.find({
        email: request.headers.email,
      });
      response.status(201).send(finder);
    } catch (error) {
      response.send("Some error happened");
    }
  }
);

export default router;
