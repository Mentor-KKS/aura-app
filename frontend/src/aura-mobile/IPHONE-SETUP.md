# 📱 iPhone Setup - Testing Expo on Physical Device

## 🎯 What You Need:
1. ✅ iPhone with Expo Go App (App Store)
2. ✅ iPhone and Mac on the **same WiFi network**
3. ✅ Your computer's IP address

---

## Step 1: Find Your Computer's IP Address

### macOS:
```bash
# Option 1: Terminal
ifconfig | grep "inet " | grep -v 127.0.0.1

# Option 2: GUI
System Settings → Network → WiFi → Details → IP Address
```

**Example:** `192.168.1.10`

⚠️ **IMPORTANT:** Write down this IP address!

---

## Step 2: Configure Backend to Accept External Connections

### Option A: Bind Backend to 0.0.0.0 (Recommended)

Open `backend/src/AuraContract.Api/Properties/launchSettings.json`:

```json
{
  "profiles": {
    "http": {
      "commandName": "Project",
      "dotnetRunMessages": true,
      "launchBrowser": false,
      "applicationUrl": "http://0.0.0.0:5094",  // ← CHANGE THIS!
      "environmentVariables": {
        "ASPNETCORE_ENVIRONMENT": "Development"
      }
    }
  }
}
```

**Alternative:** Start backend with:
```bash
dotnet run --project AuraContract.Api --urls "http://0.0.0.0:5094"
```

---

## Step 3: Configure Frontend

Open `src/config/api.config.ts`:

```typescript
// IMPORTANT: Enter your computer's IP address here!
const YOUR_COMPUTER_IP = '192.168.1.10'; // ⚠️ CHANGE THIS!
```

Enter your IP address from Step 1.

---

## Step 4: Install Expo Go App

1. Open App Store
2. Search for "Expo Go"
3. Install

---

## Step 5: Start the App

### Terminal 1: Backend
```bash
cd backend/src
dotnet run --project AuraContract.Api --urls "http://0.0.0.0:5094"
```

**Check:** You should see:
```
Now listening on: http://0.0.0.0:5094
```

### Terminal 2: Frontend
```bash
cd frontend/src/aura-mobile
npm start
```

**Choose Tunnel Option:**
- Press `t` for Tunnel mode (recommended for first try)
- Or scan QR code directly

---

## Step 6: Connect with iPhone

### Option 1: Scan QR Code (Easiest Method)
1. Open Expo Go on iPhone
2. Tap "Scan QR Code"
3. Scan the QR code in Terminal
4. App should load

### Option 2: Manual Connection
1. Open Expo Go
2. Select "Enter URL manually"
3. Enter URL (shown in Terminal below QR code)

---

## 🔍 Debugging - What's Being Loaded?

When the app starts, you'll see in the console:
```
🌐 API URL: http://192.168.1.10:5094/api
📱 Platform: ios
🔧 DEV Mode: true
```

**Check:**
- Is the IP address correct?
- Is the backend reachable?

---

## 🧪 Test Backend from iPhone

Test if backend is reachable from iPhone:

1. **Open Safari on iPhone**
2. **Go to:** `http://[YOUR-IP]:5094/swagger`
   - Example: `http://192.168.1.10:5094/swagger`
3. **You should see Swagger UI**

❌ **Error "Can't connect"?**
- Ensure backend is running on `0.0.0.0` (not `localhost`)
- Check that iPhone is on same WiFi
- Check firewall settings

---

## 🚨 Troubleshooting

### Problem: "Network request failed"

**Solution 1: Backend Not Reachable**
```bash
# Terminal 1 - Stop backend (Ctrl+C)
# Restart on 0.0.0.0:
cd backend/src
dotnet run --project AuraContract.Api --urls "http://0.0.0.0:5094"
```

**Solution 2: Wrong IP in Config**
```typescript
// Check src/config/api.config.ts
const YOUR_COMPUTER_IP = '192.168.1.10'; // ← Must be your current IP!
```

**Solution 3: Firewall Blocking Port 5094**
```bash
# Check macOS Firewall:
System Settings → Network → Firewall

# Allow port 5094 or temporarily disable firewall
```

### Problem: "Unable to resolve host"

**Cause:** iPhone can't find backend server

**Solution:**
1. Check IP address: `ifconfig | grep inet`
2. Check if backend is running: `curl http://0.0.0.0:5094/api`
3. Test from iPhone: Safari → `http://[IP]:5094/swagger`

### Problem: Expo Go Won't Load

**Solution:**
```bash
# Restart frontend
cd frontend/src/aura-mobile
npm start -- --clear

# Or with tunnel:
npm start -- --tunnel
```

---

## ⚡ Performance Tips

### Tunnel vs. LAN:

**Tunnel (ngrok):**
- ✅ Always works
- ✅ No firewall issues
- ❌ Slower
- Start with: `npm start -- --tunnel`

**LAN (WiFi):**
- ✅ Much faster
- ❌ Requires same network
- ❌ Firewall may block
- Start with: `npm start -- --lan`

---

## 📊 Comparison: Simulator vs. iPhone

| Feature | iOS Simulator | Real iPhone |
|---------|--------------|-------------|
| API URL | `localhost:5094` | `192.168.1.X:5094` |
| Setup | Easy | Medium |
| Performance | Fast | Real |
| Camera | ❌ | ✅ |
| Push Notifications | ⚠️ | ✅ |
| Touch Gestures | ⚠️ | ✅ |

---

## ✅ Pre-Testing Checklist

- [ ] iPhone and Mac on same WiFi
- [ ] Expo Go app installed
- [ ] IP address entered in `api.config.ts`
- [ ] Backend running on `0.0.0.0:5094`
- [ ] Backend reachable from Safari: `http://[IP]:5094/swagger`
- [ ] Frontend started: `npm start`
- [ ] QR code scanned in Expo Go

---

## 🎉 When Everything Works:

You should:
1. ✅ See login screen
2. ✅ Be able to register
3. ✅ Be able to create contracts
4. ✅ Experience real performance on iPhone

---

**Good luck! 📱🚀**
