# Interactive Room Management Implementation

## Steps to Complete

### 1. Create Tenant Data Hook
- [x] Create src/hooks/useTenantData.ts: Custom hook to fetch rooms/tenants from Firestore ('pgs/{pgId}/rooms'), transform to buildingData format (floors with rooms and occupants). Include loading/error states.

### 2. Update InteractiveBuildingVisualizer.tsx
- [x] Add pgId prop and use useTenantData hook to fetch real data instead of mock.
- [x] Enhance modal: Add "Call" button (tel: link), "Send Reminder" (placeholder for email/SMS), "Add Tenant" for empty rooms.
- [x] Implement real actions: Update markPaymentReceived to Firestore update (set rentStatus to true).
- [x] Add loading states and error handling for data fetch.

### 3. Update OwnerPGDashboard.tsx
- [x] Replace mock room grid with <InteractiveBuildingVisualizer pgId={pgData.id} />.
- [x] Update room summary: Calculate occupied/available from real fetched data (occupants.length vs capacity).
- [x] Add "Add New Tenant" button/modal for tenant management.
- [x] Ensure no breaking changes to existing PG details display.

### 4. Testing and Followup
- [ ] Run `npm run dev`, login as owner, navigate to /owner-pg-dashboard.
- [ ] Verify data loads, hover tooltips, modal details/actions work.
- [ ] Test updates (mark paid), empty rooms, edge cases.
- [ ] Deploy to Vercel, check Firestore rules for owner access.
- [ ] Update TODO.md: Mark steps as completed after each.

*Note: Ensure Firestore rules allow owner reads/writes to 'pgs/{pgId}/rooms'. No new dependencies; uses existing Firebase setup.*
