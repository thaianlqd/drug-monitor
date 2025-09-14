module.exports = (req, res, next) => {
  const { name, dosage, card, pack, perDay } = req.body;

  // Name dài hơn 5 ký tự
  if (!name || name.length <= 5) {
    return res.status(400).json({ message: "Name must be longer than 5 characters" });
  }

  // Dosage đúng định dạng: XX-morning,XX-afternoon,XX-night
  const dosageRegex = /^\d+-morning,\d+-afternoon,\d+-night$/;
  if (!dosageRegex.test(dosage)) {
    return res.status(400).json({ message: "Dosage format is invalid" });
  }

  // Card > 1000
  if (card <= 1000) {
    return res.status(400).json({ message: "Card must be more than 1000" });
  }

  // Pack > 0
  if (pack <= 0) {
    return res.status(400).json({ message: "Pack must be more than 0" });
  }

  // PerDay > 0 và < 90
  if (perDay <= 0 || perDay >= 90) {
    return res.status(400).json({ message: "PerDay must be between 1 and 89" });
  }

  next();
};
