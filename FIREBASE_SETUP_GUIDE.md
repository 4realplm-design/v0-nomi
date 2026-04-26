# Firebase Realtime Database Setup Guide

## Database Structure

Din Firebase Realtime Database skal have følgende struktur:

```json
{
  "bookings": {
    "YYYY-MM-DD": {
      "table_1": {
        "timeSlot1": {
          "name": "Kunde Navn",
          "phone": "+4512345678",
          "email": "kunde@email.dk",
          "guests": 4,
          "timestamp": "2025-12-15T12:00:00Z",
          "status": "confirmed"
        }
      }
    }
  },
  "members": {
    "user_uid_123": {
      "email": "admin@nomirestaurant.dk",
      "displayName": "Admin Navn",
      "photoURL": "https://...",
      "createdAt": "2025-12-13T10:00:00Z",
      "role": "admin"
    }
  }
}
```

## Trin-for-Trin Setup

### 1. Åbn Firebase Console
- Gå til: https://console.firebase.google.com/
- Vælg dit projekt: `nomi-restaurant` eller dit projekt navn

### 2. Naviger til Realtime Database
- I venstre menu, klik på **"Realtime Database"**
- Hvis databasen ikke er oprettet, klik på **"Create Database"**

### 3. Opret Database Struktur

#### Metode 1: Manuel Oprettelse
1. Klik på **"+"** ved siden af din database root
2. Opret første felt:
   - Key: `bookings`
   - Value: `null` (eller tom object)
   - Klik **"Add"**

3. Opret andet felt:
   - Key: `members`  
   - Value: `null` (eller tom object)
   - Klik **"Add"**

#### Metode 2: Import JSON
1. Klik på de tre prikker (⋮) i øverste højre hjørne
2. Vælg **"Import JSON"**
3. Upload denne JSON fil:

```json
{
  "bookings": {},
  "members": {}
}
```

### 4. Konfigurer Security Rules

I **"Rules"** fanen, erstat med disse regler (fra FIREBASE_DATABASE_RULES.md):

```json
{
  "rules": {
    "bookings": {
      ".read": "auth != null",
      ".write": "auth != null",
      "$date": {
        ".validate": "newData.hasChildren()",
        "$tableId": {
          ".validate": "newData.hasChildren()",
          "$timeSlot": {
            ".validate": "newData.hasChildren(['name', 'phone', 'guests'])",
            "name": {
              ".validate": "newData.isString() && newData.val().length > 0"
            },
            "phone": {
              ".validate": "newData.isString() && newData.val().length > 0"
            },
            "email": {
              ".validate": "!newData.exists() || newData.isString()"
            },
            "guests": {
              ".validate": "newData.isNumber() && newData.val() > 0 && newData.val() <= 20"
            },
            "timestamp": {
              ".validate": "newData.isString()"
            },
            "status": {
              ".validate": "newData.isString()"
            },
            "$other": {
              ".validate": false
            }
          }
        }
      }
    },
    "members": {
      ".read": "auth != null",
      "$uid": {
        ".write": "$uid === auth.uid || root.child('members').child(auth.uid).child('role').val() === 'admin'",
        ".validate": "newData.hasChildren(['email'])",
        "email": {
          ".validate": "newData.isString()"
        },
        "displayName": {
          ".validate": "newData.isString()"
        },
        "photoURL": {
          ".validate": "newData.isString()"
        },
        "role": {
          ".validate": "newData.isString() && (newData.val() === 'user' || newData.val() === 'admin')"
        },
        "createdAt": {
          ".validate": "newData.isString()"
        },
        "$other": {
          ".validate": false
        }
      }
    }
  }
}
```

5. Klik **"Publish"** for at aktivere reglerne

### 5. Test Database Connection

Din hjemmeside bruger disse environment variables:
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `FIREBASE_PRIVATE_KEY`
- `FIREBASE_CLIENT_EMAIL`

Booking systemet bruger Server-Side API route `/api/bookings` som bruger Firebase Admin SDK til at skrive til databasen, så client-side security rules påvirker ikke booking processen.

### 6. Verificer Setup

1. Gå til `/booking` på din hjemmeside
2. Prøv at lave en booking
3. Tjek Firebase Console under `bookings/` for at se om data bliver gemt

### Troubleshooting

**Problem: "PERMISSION_DENIED" fejl**
- Løsning: Tjek at security rules er published
- Løsning: Verificer at Firebase Admin credentials er korrekte

**Problem: Data bliver ikke gemt**
- Løsning: Tjek browser console for fejl
- Løsning: Verificer at `/api/bookings` route fungerer

**Problem: Kan ikke se bookings i dashboard**
- Løsning: Tjek at du er logged ind med Google
- Løsning: Verificer at din email er tilføjet til `members` med role="admin"

## Vigtige Noter

- **Bookings** struktur organiserer data efter dato (`YYYY-MM-DD`) → bord → tidspunkt
- **Members** struktur bruger Firebase Auth UID som key
- Server-side API routes bypasser client-side security rules
- Backup din database regelmæssigt via Firebase Console

## Support

Hvis du har problemer, tjek:
1. Firebase Console → Realtime Database → Data tab
2. Browser Developer Console for fejl (F12)
3. Network tab for at se API requests
```

```tsx file="components/soft-opening-banner.tsx" isDeleted="true"
...deleted...
