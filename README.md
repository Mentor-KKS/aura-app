# Aura - Intelligent Contract Management

> Smart contract and subscription management app with AI-powered features.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![.NET](https://img.shields.io/badge/.NET-8.0-purple.svg)
![React Native](https://img.shields.io/badge/React%20Native-Expo-blue.svg)

---

## Overview

Aura helps users manage their contracts, subscriptions, and financial obligations with intelligent reminders and automated cancellation letters.

### Key Features

- 📝 **Contract Management** - Track all your subscriptions in one place
- 🔔 **Smart Reminders** - 3-level reminder system (Blue → Yellow → Red)
- ✉️ **Cancellation Letters** - Generate professional cancellation letters
- 🔄 **Cloud Sync** - Sync across all your devices
- 🔐 **End-to-End Encryption** - Your data is secure
- 📱 **Cross-Platform** - iOS and Android support

---

## Tech Stack

### Backend

- **.NET 8** - Modern web framework
- **PostgreSQL 16** - Reliable database
- **Entity Framework Core** - ORM
- **JWT Authentication** - Secure auth
- **Hangfire** - Background jobs

### Frontend

- **React Native (Expo)** - Cross-platform mobile
- **TypeScript** - Type-safe development
- **Zustand** - State management
- **NativeWind** - Tailwind CSS for React Native

---

## Getting Started

### Prerequisites

- .NET 8 SDK
- Node.js 18+
- Docker (for PostgreSQL)
- Expo CLI

### Backend Setup

```bash
# Clone repository
git clone https://github.com/Mentor-KKS/aura-app.git
cd aura/backend

# Install dependencies
dotnet restore

# Start PostgreSQL
docker-compose up -d

# Run migrations
dotnet ef database update

# Start API
dotnet run
```

API will be available at `http://localhost:5000`

### Frontend Setup

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Start Expo
npm start

# Run on device
npm run ios  # or npm run android
```

---

## API Documentation

Once the backend is running, visit:

- Swagger UI: `http://localhost:5000/swagger`
- Health Check: `http://localhost:5000/health`

---

## Project Structure

```
aura/
├── backend/              # .NET 8 API
│   ├── src/
│   │   ├── AuraContract.Api/
│   │   ├── AuraContract.Core/
│   │   ├── AuraContract.Application/
│   │   └── AuraContract.Infrastructure/
│   └── tests/
├── frontend/             # React Native (Expo)
│   ├── src/
│   │   ├── screens/
│   │   ├── components/
│   │   ├── services/
│   │   └── state/
│   └── app/
└── docker-compose.yml
```

---

## Environment Variables

### Backend (.env)

```bash
ConnectionStrings__DefaultConnection=Host=localhost;Port=5432;Database=aura_contracts;Username=aura;Password=your_password
Jwt__SecretKey=your-jwt-secret-key
```

### Frontend (.env)

```bash
API_URL=http://localhost:5000/api
```

---

## Features Roadmap

### ✅ Phase 1 (In Progress)

- [ ] Manual contract input
- [ ] Basic templates
- [ ] 3-level reminders
- [ ] Cloud sync
- [ ] Authentication

### 🚧 Phase 2 (In Progress)

- [ ] Voice input (AI)
- [ ] Document OCR
- [ ] AI-generated letters
- [ ] Chat interface

### 📋 Phase 3 (Planned)

- [ ] Email integration
- [ ] Bill splitting
- [ ] Web dashboard
- [ ] International support

---

## Testing

### Backend

```bash
cd backend
dotnet test
```

### Frontend

```bash
cd frontend
npm test
```

---

## Deployment

### Backend

```bash
docker build -t aura-api .
docker run -p 5000:5000 aura-api
```

### Frontend

```bash
# Build for production
eas build --platform ios
eas build --platform android
```

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Support

For support, open an issue on GitHub.

---

## Acknowledgments

- Built with ❤️ using .NET and React Native
- Inspired by the need for better contract management

---

**Made with 💙 by Mentor-KKS**
