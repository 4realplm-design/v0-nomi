# Firebase Realtime Database - Bookings Setup Guide

## Trin 1: Opret "bookings" feltet i Firebase

1. Gå til Firebase Console: https://console.firebase.google.com
2. Vælg dit projekt
3. Klik på "Realtime Database" i menuen til venstre
4. Klik på "Data" tab

## Trin 2: Tilføj bookings struktur

Klik på "+" knappen ved roden af din database og tilføj:

```
bookings/
  └── (auto-generated booking IDs vil blive oprettet her)
```

## Trin 3: Database struktur eksempel

Når bookinger bliver lavet, vil strukturen se sådan ud:

```json
{
  "bookings": {
    "booking_1734123456789_abc123": {
      "date": "2025-12-15",
      "time": "18:00",
      "guests": 4,
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "+4512345678",
      "tables": [1, 2],
      "createdAt": 1734123456789,
      "status": "confirmed"
    }
  },
  "members": {
    "member_id_here": {
      "name": "Jane Smith",
      "email": "jane@example.com",
      "createdAt": 1734123456789
    }
  }
}
```

## Trin 4: Database Rules (vigtigt for sikkerhed)

Gå til "Rules" tab og opdater dine regler:

```json
{
  "rules": {
    "bookings": {
      ".read": false,
      ".write": false,
      "$bookingId": {
        ".read": false,
        ".write": false
      }
    },
    "members": {
      ".read": false,
      ".write": false,
      "$memberId": {
        ".read": false,
        ".write": false
      }
    }
  }
}
```

**VIGTIGT:** Fordi vi bruger Firebase Admin SDK via Server API route (`/api/bookings`), skal database rules være lukket for client-side access. Admin SDK har fuld adgang uanset rules.

## Trin 5: Verificer at det virker

1. Prøv at lave en booking på hjemmesiden
2. Gå til Firebase Console > Realtime Database > Data
3. Du skulle nu kunne se din booking under "bookings"

## Fejlfinding

### Hvis bookinger ikke bliver gemt:

1. **Tjek Firebase credentials** - Gå til Project Settings > Service Accounts i Firebase Console
2. **Verificer environment variables**:
   - `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
   - `FIREBASE_PRIVATE_KEY`
   - `FIREBASE_CLIENT_EMAIL`
3. **Tjek browser console** for fejlmeddelelser
4. **Verificer at Admin SDK er aktiveret** - Gå til Firebase Console > Project Settings > Service Accounts

### Hvis du får "PERMISSION_DENIED" fejl:

- Dette er normalt fordi client-side Firebase prøver at skrive direkte til database
- Vores løsning bruger Server API route med Admin SDK, så dette skulle ikke ske
- Hvis det sker alligevel, tjek at alle bookings går gennem `/api/bookings` endpoint

## Support

Hvis du stadig har problemer, tjek:
- Firebase Console > Usage tab for at se om der er requests
- Vercel logs for server-side errors
- Browser DevTools Console for client-side errors
