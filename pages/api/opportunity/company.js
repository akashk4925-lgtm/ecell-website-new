import { createRequire } from "module";
const require = createRequire(import.meta.url);
import Opportunity from "../../../models/Opportunity";
import verifyLoggedin from "../../../middleware/VerifyLoggedin";
import nc from "next-connect";
import dbConnect from "../../../lib/dbConnect";
// import verifyEmail from "../middleware/VerifyEmail"

const router = nc();

router.get(
  "/api/opportunity/company/",
  verifyLoggedin,
  async (request, response) => {
    await dbConnect();
    try {
      let finder = await Opportunity.find({
        companyName: request.body.companyName,
      });
      response.status(201).send(finder);
    } catch (error) {
      response.send("Some error happened");
    }
  }
);

export default router;
