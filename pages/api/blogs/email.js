import { createRequire } from "module";
const require = createRequire(import.meta.url);
import nc from "next-connect";
import dbConnect from "../../../lib/dbConnect.ts";
import Blog from "../../../models/Blog";
import verifyAdmin from "../../../middleware/VerifyAdmin";
import verifyLoggedin from "../../../middleware/VerifyLoggedin";

const router = nc();

router.get(
  "/api/blogs/email/",
  [verifyLoggedin, verifyAdmin],
  async (request, response) => {
    await dbConnect();
    try {
      let finder = await Blog.find({
        email: request.headers.email,
      });
      response.status(201).send(finder);
    } catch (error) {
      response.send("Some error happened");
    }
  }
);

export default router;
