import jwt from "jsonwebtoken";

export function verifyToken(req, res, next) {
  const auth = req.headers.authorization || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : null;

  if (!token) {
    return res.status(401).json({ error: "Token missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Pastikan ada email_mahasiswa
    if (!decoded.email_mahasiswa) {
      return res.status(403).json({
        error: "Email not found in token",
      });
    }

    // Validasi domain email
    const allowedDomain = "@student.bakrie.ac.id";

    if (!decoded.email_mahasiswa.endsWith(allowedDomain)) {
      return res.status(403).json({
        error: "Only Bakrie student email is allowed",
      });
    }

    // Simpan payload ke request
    req.user = decoded;

    return next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Token expired" });
    }

    return res.status(403).json({ error: "Invalid token" });
  }
}
