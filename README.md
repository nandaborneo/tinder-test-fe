# 💕 Tinder Replicate Frontend

A modern **Tinder-like dating app** built with React Native, featuring swipe gestures, real-time data fetching, and a beautiful UI following Atomic Design principles.

## 🚀 Features

### Core Functionality
- **🔥 Card Swiping**: Smooth swipe gestures with animations for like/dislike actions
- **📱 Tab Navigation**: Discover and Liked pages with seamless navigation
- **♾️ Infinite Scrolling**: Automatic loading of more profiles as you swipe
- **💖 Like Management**: Track and view liked profiles with real-time updates
- **🖼️ Photo Gallery**: Multiple photos per profile with indicator dots
- **⚡ Optimistic Updates**: Instant UI feedback for better user experience

### Technical Features
- **🏗️ Atomic Design**: Clean component architecture (Atoms → Molecules → Organisms)
- **🔄 React Query**: Efficient data fetching, caching, and synchronization
- **🌐 Recoil State**: Global state management for app-wide data
- **📱 Responsive Design**: Optimized for various screen sizes
- **🎨 Modern UI**: Beautiful gradients, animations, and smooth transitions
- **⚡ Performance**: Image prefetching and optimized rendering

## 🛠️ Tech Stack

### Frontend
- **React Native** `0.82.0` - Cross-platform mobile development
- **TypeScript** `5.8.3` - Type-safe development
- **React Navigation** `7.1.18` - Navigation and routing
- **React Query** `5.90.5` - Server state management
- **Recoil** `0.7.7` - Global state management
- **React Native Reanimated** `4.1.3` - Smooth animations
- **React Native Gesture Handler** `2.28.0` - Touch gestures

### UI & Styling
- **React Native Linear Gradient** `2.8.3` - Beautiful gradients
- **React Native Safe Area Context** `5.6.1` - Safe area handling
- **Custom Theme System** - Consistent colors and styling

### Development Tools
- **ESLint** - Code linting and formatting
- **Prettier** - Code formatting
- **Jest** - Unit testing framework
- **TypeScript** - Static type checking

## 📁 Project Structure

```
src/
├── api/                    # API layer
│   ├── client.ts          # HTTP client configuration
│   └── people.ts          # People-related API calls
├── atoms/                 # Atomic Design - Atoms
│   ├── IconButton.tsx     # Reusable icon button
│   └── PhotoIndicator.tsx # Photo gallery indicators
├── molecules/             # Atomic Design - Molecules
│   └── ProfileCard.tsx    # Individual profile card
├── organisms/             # Atomic Design - Organisms
│   └── CardStack.tsx      # Swipeable card stack
├── pages/                 # Screen components
│   ├── DiscoverPage.tsx   # Main swiping interface
│   └── LikedPage.tsx      # Liked profiles page
├── navigation/            # Navigation setup
│   └── MainTabs.tsx       # Tab navigation
├── hooks/                 # Custom React hooks
│   └── useOpponents.ts    # Data fetching hooks
├── state/                 # Global state management
│   └── atoms.ts           # Recoil atoms
├── theme/                 # Design system
│   └── colors.ts          # Color palette
└── types.ts               # TypeScript type definitions
```

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **React Native CLI**
- **Android Studio** (for Android development)
- **Xcode** (for iOS development, macOS only)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd tfe
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **iOS Setup** (macOS only)
   ```bash
   cd ios && pod install && cd ..
   ```

4. **Start Metro bundler**
   ```bash
   npm start
   # or
   yarn start
   ```

5. **Run the app**
   
   **For Android:**
   ```bash
   npm run android
   # or
   yarn android
   ```
   
   **For iOS:**
   ```bash
   npm run ios
   # or
   yarn ios
   ```

## 📱 Usage

### Discover Page
- **Swipe Right** ➡️ to like a profile
- **Swipe Left** ⬅️ to dislike a profile
- **Tap Photos** 📸 to view multiple images
- **Auto-load** 🔄 more profiles as you swipe

### Liked Page
- **View** all your liked profiles
- **Infinite scroll** to load more liked profiles
- **Real-time updates** when you like new profiles

## 🏗️ Architecture

### Atomic Design Pattern
- **Atoms**: Basic building blocks (IconButton, PhotoIndicator)
- **Molecules**: Simple combinations (ProfileCard)
- **Organisms**: Complex components (CardStack)
- **Pages**: Full screen layouts (DiscoverPage, LikedPage)

### Data Flow
1. **API Layer**: Handles HTTP requests and responses
2. **React Query**: Manages server state, caching, and synchronization
3. **Custom Hooks**: Encapsulate data fetching logic
4. **Components**: Consume data through hooks
5. **Recoil**: Manages global client state

### State Management
- **Server State**: React Query (people data, liked profiles)
- **Global State**: Recoil (app-wide settings, user preferences)
- **Local State**: React useState (component-specific state)

## 🧪 Testing

```bash
# Run tests
npm test
# or
yarn test

# Run linting
npm run lint
# or
yarn lint
```

## 🔧 Development Scripts

```bash
npm start          # Start Metro bundler
npm run android    # Run on Android
npm run ios        # Run on iOS
npm run lint       # Run ESLint
npm test           # Run Jest tests
```

## 🎨 Customization

### Colors
Modify `src/theme/colors.ts` to customize the app's color scheme:

```typescript
export const colors = {
  primary: '#FF4458',      // Main brand color
  bg: '#000000',           // Background
  text: '#FFFFFF',         // Primary text
  // ... more colors
};
```

### API Configuration
Update `src/api/client.ts` to point to your backend:

```typescript
const API_BASE_URL = 'your-api-endpoint';
```

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

For support and questions, please open an issue in the repository.

---

**Built with ❤️ using React Native and modern development practices**
