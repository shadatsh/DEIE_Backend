const lecturerSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: String,
    createdAt: Date,
  });
  
  const Lecturer = mongoose.model("Lecturer", lecturerSchema);
  
  app.get("/lecturers", async (req, res) => {
    try {
      const lecturers = await Lecturer.find({ role: "lecturer" });
  
      if (lecturers.length === 0) {
        return res.status(404).json({ error: "No lecturers found" });
      }
  
      const lecturerNames = lecturers.map((lecturer) => lecturer.name);
  
      res.json({ lecturerNames });
    } catch (error) {
      console.error("Error retrieving lecturers", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  