# Architecture Decisions

## SegmentedControl as Action Toolbar Pattern

**Date:** 2026-07-13
**Status:** Accepted
**Context:** Attendance module navigation

### Decision

Use ADS SegmentedControl as a reusable action toolbar pattern for modules that need to switch between an action view (form/creation) and a data view (list/history).

### Pattern

```
Page Title
[ + Action Item ]   [ Data View Item ]
─────────────────────────────────────
Context-specific content
```

### Examples

| Module     | Action             | Data    |
| ---------- | ------------------ | ------- |
| Attendance | + Isi Absensi      | Riwayat |
| Finance    | + Tambah Transaksi | Riwayat |
| Inventory  | + Tambah Barang    | Stok    |
| Library    | Pinjam             | Riwayat |
| Violations | Catat              | Riwayat |

### Rationale

1. **Enterprise UX**: Admin dashboards prioritize primary actions. The "+" action item is prominently placed and visually distinct.

2. **Consistency**: The pattern is reusable across all CRUD modules. Users learn one interaction model.

3. **Semantic clarity**: "Isi Absensi" is an action (creating data), "Riwayat" is data (viewing data). The SegmentedControl visually distinguishes these.

4. **No route changes**: Switching views preserves all component state (form fields, selections, notes). This is critical for data entry workflows.

5. **Visual language**: Ghost Button style with active brand border matches ADS design system. No iOS-style sliding indicators.

### Consequences

- All future CRUD modules should adopt this pattern
- SegmentedControl is the standard ADS component for this use case
- Page layout follows: Title → Info Card → Toolbar → Filters → Content
