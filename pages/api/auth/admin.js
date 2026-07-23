import { createRequire } from "module";
const require = createRequire(import.meta.url);
import nc from "next-connect";
import dbConnect from "../../../lib/dbConnect.ts";
import verifyLoggedin from "../../../middleware/VerifyLoggedin";
import verifyAdmin from "../../../middleware/VerifyAdmin";

const router = nc();

router.get("/api/auth/admin/", [verifyLoggedin, verifyAdmin], (req, res) => {
  res.send("Admin");
});

export default router;
