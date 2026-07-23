import { createRequire } from "module";
const require = createRequire(import.meta.url);
import verifyLoggedin from "../../../middleware/VerifyLoggedin";
import verifyGammaAdmin from "../../../middleware/VerifyGammaAdmin";
import NormalAdmin from "../../../models/NormalAdmin";
import Blog from "../../../models/Blog";
import Schemes from "../../../models/Schemes";
import Student from "../../../models/Student";
import Startup from "../../../models/Startup";
import verifyAdmin from "../../../middleware/VerifyAdmin";
import nc from "next-connect";
import dbConnect from "../../../lib/dbConnect";

const router = nc();

router.post(
  "/api/normalAdmin/unregistered/",
  [verifyLoggedin, verifyGammaAdmin],
  async (req, res) => {
    await dbConnect();
    try {
      let finder1 = await Student.find({
        email: req.headers.email,
      });

      let finder2 = await NormalAdmin.find({
        email: req.headers.email,
      });

      if (finder1.length == 0 && finder2.length == 0) {
        NormalAdmin.create({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          confirmPassword: req.body.confirmPassword,
          postByNormalAdmin: [new Blog({}), new Schemes({}), new Startup({})],
        });
        res.status(201).send("Email given admin rights");
      } else {
        res.status(401).send("User exists");
      }
    } catch (error) {
      res.send(error);
    }
  }
);

export default router;
