import catchAsync from "../utils/catchAsync.js";
import Report from "../models/Report.js";
import crypto from "crypto";

export const listPendingReports = catchAsync(async (_req, res) => {
  const list = await Report.find({
    status: { $in: ["submitted", "pending_review"] },
  });
  res.json(list);
});

export const approveReport = catchAsync(async (req, res) => {
  const updated = await Report.findByIdAndUpdate(
    req.params.id,
    { status: "approved" },
    { new: true }
  );
  res.json(updated);
});

export const verifyHash = catchAsync(async (req, res) => {
  const { id, payload } = req.body; // payload is original JSON used to compute hash
  const report = await Report.findById(id);
  const hash = crypto
    .createHash("sha256")
    .update(JSON.stringify(payload))
    .digest("hex");
  const ok = report?.dataHash && hash === report.dataHash;
  res.json({
    verified: !!ok,
    computed: hash,
    stored: report?.dataHash || null,
  });
});
