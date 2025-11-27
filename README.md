# Habits Tracker

A modern, intuitive habit tracking application built with React and Vite. This app helps users build and maintain positive habits through visual tracking, streak monitoring, and insightful analytics. Whether you're aiming to develop daily routines, break bad habits, or simply stay consistent with personal goals, Habits Tracker provides the tools you need in a clean, responsive interface.

## Key Features

- **Habit Management**: Easily add, edit, and delete habits with custom icons and colors
- **Calendar View**: Interactive calendar for daily habit tracking and visualization
- **Streak Tracking**: Monitor your current and best streaks to stay motivated
- **Analytics & Insights**: View detailed statistics and progress reports through the analytics modal
- **Filtering & Organization**: Filter habits by category or status for better organization
- **Responsive Design**: Optimized for desktop and mobile devices using Tailwind CSS
- **Smooth Animations**: Enhanced user experience with Framer Motion animations
- **Data Persistence**: Local storage integration to keep your data between sessions

## Benefits

- **Build Consistency**: Visual feedback and streaks help reinforce positive behaviors
- **Track Progress**: Detailed analytics show your improvement over time
- **Stay Motivated**: Gamification elements like streaks keep you engaged
- **Flexible Tracking**: Support for various habit types and frequencies
- **User-Friendly**: Intuitive interface makes habit tracking effortless

## Use Cases

- **Personal Development**: Track reading, exercise, meditation, or learning goals
- **Health & Wellness**: Monitor water intake, sleep patterns, or meal planning
- **Productivity**: Build habits like early rising, task completion, or focused work sessions
- **Skill Building**: Track practice sessions for musical instruments, languages, or coding
- **Behavioral Changes**: Break habits like smoking or excessive screen time

## Prerequisites

Before running this project, ensure you have the following installed:

- **Node.js** (version 16 or higher) - [Download from nodejs.org](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn** package manager
- A modern web browser (Chrome, Firefox, Safari, or Edge)

## Installation

Follow these step-by-step instructions to set up the project on your local machine:

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd habits_tracker
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```
   This will install all required packages including React, Vite, Tailwind CSS, and other dependencies.

3. **Start the development server**:
   ```bash
   npm run dev
   ```
   The application will start on `http://localhost:5173` by default.

4. **Open in browser**:
   Open your web browser and navigate to `http://localhost:5173` to start using the app.

## Usage

### Getting Started
1. **Add Your First Habit**: Click the "Add Habit" button to create a new habit
2. **Customize**: Choose an icon, color, and description for your habit
3. **Track Daily**: Use the calendar view to mark habits as completed each day

### Key Interactions
- **Calendar Navigation**: Use the arrow buttons to navigate between months
- **Mark Completion**: Click on any day in the calendar to toggle habit completion
- **View Details**: Click on a calendar day to see detailed habit status for that date
- **Edit Habits**: Use the edit button on any habit to modify its properties
- **Delete Habits**: Remove habits you no longer want to track
- **Analytics**: Access the analytics modal to view your progress and streaks

### Tips for Effective Habit Tracking
- Start with 2-3 habits to avoid overwhelm
- Set realistic goals and build gradually
- Review your progress weekly using the analytics feature
- Use reminders or notifications if available in your environment

## Project Structure

```
habits_tracker/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── calendar/       # Calendar-related components
│   │   ├── habits/         # Habit management components
│   │   └── menu/           # Navigation components
│   ├── context/            # React context for state management
│   ├── hooks/              # Custom React hooks
│   ├── layouts/            # Layout components
│   ├── pages/              # Page components
│   └── styles/             # Global styles and CSS
├── package.json            # Project dependencies and scripts
└── vite.config.js          # Vite configuration
```

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the project for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint for code quality checks

## Technologies Used

- **React 19** - Modern JavaScript library for building user interfaces
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library for React
- **Lucide React** - Icon library
- **Day.js** - Lightweight date manipulation library
- **UUID** - For generating unique identifiers

## Troubleshooting

### Common Issues

**Port 5173 is already in use**
- Vite will automatically prompt you to use a different port
- Or manually specify a port: `npm run dev -- --port 3000`

**Build fails with dependency errors**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Styling issues or Tailwind not working**
- Ensure Tailwind CSS is properly configured in `vite.config.js`
- Check that the CSS imports are correct in your components

**Data not persisting**
- The app uses localStorage; clear browser data if issues occur
- Check browser console for any storage-related errors

**Performance issues**
- Ensure you're using a modern browser with good JavaScript support
- Check that all dependencies are up to date

### Getting Help

If you encounter issues not covered here:
1. Check the browser console for error messages
2. Verify your Node.js and npm versions
3. Ensure all prerequisites are met
4. Try clearing browser cache and restarting the dev server

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Make your changes and test thoroughly
4. Commit your changes: `git commit -m 'Add some feature'`
5. Push to the branch: `git push origin feature/your-feature-name`
6. Open a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built with [Vite](https://vitejs.dev/) for fast development
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons from [Lucide](https://lucide.dev/) and [Font Awesome](https://fontawesome.com/)
- Date handling with [Day.js](https://day.js.org/)
