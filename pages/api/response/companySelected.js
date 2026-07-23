import verifyLoggedin from "../../../middleware/VerifyLoggedin";
import Opportunity from "../../../models/Opportunity";
import Student from "../../../models/Student";
import Response from "../../../models/Response";
import nc from "next-connect";
import dbConnect from "../../../lib/dbConnect";

const router = nc();

router.get(
  "/api/response/companySelected",
  [verifyLoggedin],
  async (req, res) => {
    await dbConnect();
    try {
      Student.findOne({ email: req.headers.email })
        .populate("Postbystudent")
        .exec(function (err, student) {
          res.send(student.Postbystudent);
        });
    } catch (error) {
      res.send(error);
    }
  }
);

export default router;
