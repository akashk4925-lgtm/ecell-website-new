import { createRequire } from "module";
const require = createRequire(import.meta.url);
import nc from "next-connect";
import dbConnect from "../../lib/dbConnect";
import Help from "../../models/Help";
import verifyAdmin from "../../middleware/VerifyAdmin";
import verifyLoggedin from "../../middleware/VerifyLoggedin";

const router = nc();

router.post("/api/help", [verifyLoggedin], async (request, response) => {
  await dbConnect();
  try {
    Help.create({
      email: request.headers.email,
      firstName: request.body.firstName,
      description: request.body.description,
    });
    response.send("Successful");
  } catch (error) {
    response.send("Some error happened");
  }
});

router.get(
  "/api/help",
  [verifyLoggedin, verifyAdmin],
  async (request, response) => {
    await dbConnect();
    try {
      let finder = await Help.find();
      response.status(201).send(finder);
    } catch (error) {
      response.send("Some error happened");
    }
  }
);

export default router;
