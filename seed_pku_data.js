// C:\xampp\htdocs\FYP\umpsa_care\seed_pku_data.js

const admin = require("firebase-admin");

// Initialize Firebase Admin SDK
// Make sure you have downloaded your serviceAccountKey.json from Firebase Console
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function seedPkuData() {
  const pkuData = {
    title: "Pusat Kesihatan Universiti UMPSA",
    subtitle: "Main healthcare centre of UMPSA",
    description: "Pusat Kesihatan Universiti (University Health Centre) at Universiti Malaysia Pahang (UMP), a primary healthcare provider for students and staff, offering general medical services, minor procedures, pharmacy, and health education, aiming to provide holistic health support for the university community",
    services: [
      "Consultation",
      "Dental",
      "Health Screening",
      "Physiotherapy",
      "Medical Checkup",
      "Health Talk",
      "Community Health Programs"
    ],
    programs: [
      {
        name: "IFitER Programme",
        details: "Weight management program for students/staff with BMI 25–35."
      },
      {
        name: "Blood Donation Program",
        details: "Organized monthly, open to students and staff."
      }
    ],
    contact: {
      email: "pku@umpsa.edu.my",
      phone: "+6094315042",
      gambang_address: "Pusat Kesihatan UMPSA Gambang",
      pekan_address: "Pusat Kesihatan UMPSA Pekan",
      hours: "Mon-Thu: 8am-12:45pm, 2pm-4:45pm; Fri: 8am-12pm, 2:45pm-4:45pm"
    },
    image_url: "https://your-image-link.com/pku.jpg"
  };

seedPkuData();
