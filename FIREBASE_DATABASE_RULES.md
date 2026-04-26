# Firebase Realtime Database Rules

Copy and paste these rules into your Firebase Console:

1. Go to Firebase Console: https://console.firebase.google.com
2. Select your project: `nomi-50f1e`
3. Navigate to: **Realtime Database** → **Rules** tab
4. Replace the existing rules with the rules below
5. Click **Publish**

```json
{
  "rules": {
    "bookings": {
      ".read": true,
      ".write": true,
      "$bookingId": {
        ".validate": "newData.hasChildren(['name', 'phone', 'date', 'time', 'guests', 'tableId', 'createdAt', 'status'])"
      }
    },
    "members": {
      "$uid": {
        ".read": "$uid === auth.uid || root.child('members/' + $uid + '/public').val() === true",
        ".write": "$uid === auth.uid",
        ".validate": "newData.hasChildren(['name', 'email', 'createdAt'])"
      }
    },
    "jobs": {
      ".read": false,
      ".write": true,
      "$jobId": {
        ".validate": "newData.hasChildren(['name', 'email', 'phone', 'position', 'appliedAt'])"
      }
    },
    ".read": false,
    ".write": false
  }
}
```

## What These Rules Do:

**Bookings:**
- Anyone can read and write bookings
- Each booking must have: name, phone, date, time, guests, tableId, createdAt, status

**Members:**
- Users can only read/write their own member profile
- Public profiles can be read by anyone

**Jobs:**
- Anyone can submit job applications (write)
- No one can read job applications (admin only via Firebase Console)

**Default:**
- Everything else is denied by default for security
