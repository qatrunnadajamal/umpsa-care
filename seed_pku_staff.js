import admin from "firebase-admin";
import { readFileSync } from "fs";

const serviceAccount = JSON.parse(
  readFileSync("./serviceAccountKey.json", "utf8")
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const auth = admin.auth();
const db = admin.firestore();

const staffList = [
  {
    fullName: "Dr Khairul Salleh Bin Abdul Basit",
    email: "khairulsalleh@umpsa.edu.my",
    phoneNumber: "0134567890",
    gender: "Male",
    dob: "10/02/1980",
    userType: "PKU Staff",
    position: "Director / Medical Officer",
    password: "password123",
  },
  {
    fullName: "Dr Norhilda Binti Abdul Karim",
    email: "norhilda@umpsa.edu.my",
    phoneNumber: "0147896541",
    gender: "Female",
    dob: "25/06/1985",
    userType: "PKU Staff",
    position: "Medical Officer (Pekan Campus)",
    password: "password123",
  },
  {
    fullName: "Dr Erwina Nursyaheera Binti Sulaiman",
    email: "erwinasyaheera@umpsa.edu.my",
    phoneNumber: "0176541230",
    gender: "Female",
    dob: "18/03/1988",
    userType: "PKU Staff",
    position: "Medical Officer (Pekan Campus)",
    password: "password123",
  },
  {
    fullName: "Julina Binti Samad",
    email: "julina@umpsa.edu.my",
    phoneNumber: "0198765432",
    gender: "Female",
    dob: "15/09/1978",
    userType: "PKU Staff",
    position: "Matron (Nursing)",
    password: "password123",
  },
  {
    fullName: "Nur Syafiqah Binti Abd Razak",
    email: "syafiqahrazak@umpsa.edu.my",
    phoneNumber: "0185557890",
    gender: "Female",
    dob: "02/12/1990",
    userType: "PKU Staff",
    position: "Administrative Executive",
    password: "password123",
  },
];

async function seedPKUStaffAuth() {
  for (const staff of staffList) {
    try {
      // Check if Auth user already exists
      let userRecord;
      try {
        userRecord = await auth.getUserByEmail(staff.email);
        console.log(`➡️ Auth user already exists: ${staff.email}`);
      } catch (error) {
        // Create Auth user if not exists
        userRecord = await auth.createUser({
          email: staff.email,
          password: staff.password,
          displayName: staff.fullName,
        });

        console.log(`✅ Created Auth user: ${staff.email}`);
      }

      const uid = userRecord.uid;

      // Save to Firestore users collection
      await db.collection("users").doc(uid).set({
        user_id: uid,
        full_name: staff.fullName,
        email: staff.email,
        phone_number: staff.phoneNumber,
        gender: staff.gender,
        DOB: staff.dob,
        user_type: staff.userType,
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
      });

      // Save to pkustaff collection
      await db.collection("pkustaff").doc(uid).set({
        staff_id: uid,
        user_id: uid,
        position: staff.position,
      });

      console.log(`🔥 Firestore saved for: ${staff.email}`);

    } catch (error) {
      console.error(`❌ Error with ${staff.email}:`, error);
    }
  }

  console.log("\n🎉 PKU Staff Seeding Completed Successfully!");
}

seedPKUStaffAuth();
