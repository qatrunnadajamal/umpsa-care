import admin from "firebase-admin";
import { readFileSync } from "fs";
import { v4 as uuidv4 } from "uuid";

// Path to your Firebase service account key
const serviceAccount = JSON.parse(
  readFileSync("./serviceAccountKey.json", "utf8")
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// List of 40 medicines
const medicines = [
  { medName: "Paracetamol", medType: "Tablet", medUnit: "500mg" },
  { medName: "Amoxicillin", medType: "Capsule", medUnit: "250mg" },
  { medName: "Ibuprofen", medType: "Tablet", medUnit: "200mg" },
  { medName: "Cetirizine", medType: "Tablet", medUnit: "10mg" },
  { medName: "Loratadine", medType: "Tablet", medUnit: "10mg" },
  { medName: "Ranitidine", medType: "Tablet", medUnit: "150mg" },
  { medName: "Omeprazole", medType: "Capsule", medUnit: "20mg" },
  { medName: "Metformin", medType: "Tablet", medUnit: "500mg" },
  { medName: "Aspirin", medType: "Tablet", medUnit: "100mg" },
  { medName: "Dextromethorphan", medType: "Syrup", medUnit: "15mg/5ml" },
  { medName: "Salbutamol", medType: "Inhaler", medUnit: "100mcg" },
  { medName: "Hydrocortisone", medType: "Cream", medUnit: "1%" },
  { medName: "Betadine", medType: "Solution", medUnit: "10ml" },
  { medName: "Chlorpheniramine", medType: "Tablet", medUnit: "4mg" },
  { medName: "Diphenhydramine", medType: "Capsule", medUnit: "25mg" },
  { medName: "Prednisolone", medType: "Tablet", medUnit: "5mg" },
  { medName: "Diclofenac", medType: "Tablet", medUnit: "50mg" },
  { medName: "Cefuroxime", medType: "Tablet", medUnit: "250mg" },
  { medName: "Azithromycin", medType: "Tablet", medUnit: "250mg" },
  { medName: "Mefenamic Acid", medType: "Capsule", medUnit: "500mg" },
  { medName: "Naproxen", medType: "Tablet", medUnit: "250mg" },
  { medName: "Metronidazole", medType: "Tablet", medUnit: "400mg" },
  { medName: "Cough Drops", medType: "Lozenge", medUnit: "10mg" },
  { medName: "Loperamide", medType: "Capsule", medUnit: "2mg" },
  { medName: "Oral Rehydration Salt", medType: "Powder", medUnit: "1 sachet" },
  { medName: "Fexofenadine", medType: "Tablet", medUnit: "120mg" },
  { medName: "Clarithromycin", medType: "Tablet", medUnit: "500mg" },
  { medName: "Fluconazole", medType: "Tablet", medUnit: "150mg" },
  { medName: "Vitamin C", medType: "Tablet", medUnit: "500mg" },
  { medName: "Multivitamins", medType: "Tablet", medUnit: "1 daily" },
  { medName: "Saline Nasal Spray", medType: "Spray", medUnit: "50ml" },
  { medName: "Hydroxyzine", medType: "Tablet", medUnit: "25mg" },
  { medName: "Clindamycin", medType: "Capsule", medUnit: "150mg" },
  { medName: "Topical Antiseptic", medType: "Ointment", medUnit: "5g" },
  { medName: "Acyclovir", medType: "Cream", medUnit: "5%" },
  { medName: "Salbutamol Syrup", medType: "Syrup", medUnit: "2mg/5ml" },
  { medName: "Diphenhydramine Syrup", medType: "Syrup", medUnit: "12.5mg/5ml" },
  { medName: "Epinephrine Auto-injector", medType: "Injection", medUnit: "0.3mg" },
  { medName: "Insulin", medType: "Injection", medUnit: "10ml" },
  { medName: "Glucose Gel", medType: "Gel", medUnit: "15g" },
];

async function seedMedicines() {
  const batch = db.batch();

  for (const med of medicines) {
    const medId = uuidv4();
    const medRef = db.collection("medicines").doc(medId);

    batch.set(medRef, {
      med_id: medId,
      med_name: med.medName,
      med_type: med.medType,
      med_unit: med.medUnit,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    });
  }

  await batch.commit();
  console.log(`✅ Successfully added ${medicines.length} medicines to Firestore.`);
}

seedMedicines().catch((error) => {
  console.error("❌ Error seeding medicines:", error);
});
