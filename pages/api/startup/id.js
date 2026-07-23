import { createRequire } from "module";
const require = createRequire(import.meta.url);
import nc from "next-connect";
import dbConnect from "../../../lib/dbConnect.ts";
import Startup from "../../../models/Startup";
import verifyAdmin from "../../../middleware/VerifyAdmin";
import verifyEmail from "../../../middleware/VerifyEmail";
import verifyLoggedin from "../../../middleware/VerifyLoggedin";

const router = nc();

router.get(
  "/api/startup/id/",
  [verifyLoggedin, verifyEmail],
  async (request, response) => {
    await dbConnect();
    try {
      let finder = await Startup.find({
        email: request.headers.email,
        _id: request.body.id,
      });
      response.status(201).send(finder);
    } catch (error) {
      response.send("Some error happened");
    }
  }
);

export default router;
