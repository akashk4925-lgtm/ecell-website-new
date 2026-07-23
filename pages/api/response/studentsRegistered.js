import verifyLoggedin from "../../../middleware/VerifyLoggedin";
import Opportunity from "../../../models/Opportunity";
import Student from "../../../models/Student";
import Response from "../../../models/Response";
import nc from "next-connect";
import dbConnect from "../../../lib/dbConnect";

const router = nc();

router.get(
  "/api/response/studentsRegistered",
  [verifyLoggedin],
  async (req, res) => {
    await dbConnect();
    try {
      Opportunity.findOne({ _id: req.body.id })
        .populate("responses")
        .exec(function (err, opportunity) {
          res.send(opportunity);
        });
    } catch (error) {
      res.send(error);
    }
  }
);

export default router;
