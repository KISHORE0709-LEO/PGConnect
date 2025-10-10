# PG Data Import and Student Dashboard Enhancement

## Steps to Complete

### 1. Update Import Function
- [x] Edit src/utils/importPGData.js: Modify importPGDataFromFile to parse specific XLSX columns (College -> nearestCollege, PGName -> name, Location -> address, Gender -> pgType, DistanceFromCollege -> distance, Room Types -> sharing, Price (_/month) -> monthlyRent, Amenities -> amenities array (split by comma), Images -> images array (split by comma)). Add defaults for missing fields (e.g., city: 'Bangalore', availableRooms: 2, rating: 4.5, ownerId: 'imported', status: 'active'). Handle parsing for numbers and arrays.

### 2. Update Import UI
- [x] Edit src/pages/ImportData.tsx: Add better error handling for column mismatches (e.g., check if required columns exist in sheet). Show preview of mapped data count before import. Ensure it works with the updated function.

### 3. Update Student Dashboard
- [x] Edit src/pages/StudentDashboard.tsx:
  - Remove mockPGs and combined array; fetch only real data from Firestore.
  - Update fetch mapping to new fields (e.g., data.nearestCollege, data.distance, data.sharing, data.images[0] for card image).
  - Enhance filters: Make college select dynamic (fetch unique colleges from PGs on load or hardcoded list like ['NMIT', 'RVCE', 'IISc']). Update gender to 'boys'/'girls'/'any'. Add room types filter (checkboxes for sharing options). Ensure client-side filtering aligns (e.g., filter by nearestCollege, sharing).
  - Improve PG cards: Use real images if available, add college badge, fix navigation.
  - Add empty results message and better error handling.

### 4. Testing and Followup
- [x] Restart dev server if needed (`npm run dev`).
- [x] Test import: Navigate to /import-data, upload XLSX (or use public/pg_list.xlsx), verify success, check Firestore 'pgs' collection for correct data.
- [x] Test dashboard: Navigate to /student, verify PGs load, apply filters (college, price, amenities, etc.), check cards render and navigate to details without errors.
- [x] Update TODO.md: Mark steps as completed after each.

*Note: Assumes Firestore rules allow authenticated writes to 'pgs'. If issues, update rules in Firebase console.*
