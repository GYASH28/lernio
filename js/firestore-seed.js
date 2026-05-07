/* ============================================================
   FIRESTORE SEED SCRIPT
   Run `SeedFirestore.run()` in the browser console to initialize
   the semester database structure.
   ============================================================ */

const SeedFirestore = {
    async run() {
        if (!window.firestoreDb) {
            console.error("Firestore DB not initialized. Ensure firebase-config.js is loaded.");
            return;
        }
        if (!window.SemestersConfig) {
            console.error("SemestersConfig not found. Ensure data/semesters.config.js is loaded.");
            return;
        }

        const db = window.firestoreDb;
        console.log("🌱 Starting Firestore Seed...");

        try {
            for (const sem of window.SemestersConfig) {
                console.log(`Writing ${sem.name}...`);
                const semRef = db.collection('semesters').doc(sem.id);
                
                await semRef.set({
                    name: sem.name,
                    subtitle: sem.subtitle,
                    color: sem.color,
                    isUnlocked: sem.isUnlocked,
                    order: parseInt(sem.id.split('_')[1])
                });

                for (const sub of sem.subjects) {
                    await semRef.collection('subjects').doc(sub.id).set({
                        name: sub.name,
                        code: sub.code,
                        credits: sub.credits,
                        icon: sub.icon,
                        order: sem.subjects.indexOf(sub)
                    });
                }
                console.log(`✅ ${sem.name} and its ${sem.subjects.length} subjects written.`);
            }
            console.log("🎉 Seed complete! Data is now in Firestore.");
        } catch (error) {
            console.error("❌ Seed failed:", error);
        }
    }
};

window.SeedFirestore = SeedFirestore;
