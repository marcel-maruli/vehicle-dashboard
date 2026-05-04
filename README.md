# Vehicle Dashboard

## Description

# 🛠 Tech Stack

### Dependencies

| Package Name              | Version  |
| ------------------------- | -------- |
| @tailwindcss/vite         | ^4.2.1   |
| @tanstack/react-query     | ^5.90.21 |
| axios                     | ^1.13.6  |
| clsx                      | ^2.1.1   |
| jwt-decode                | ^4.0.0   |
| lucide-react              | ^0.576.0 |
| react                     | ^19.2.0  |
| react-dom                 | ^19.2.0  |
| react-hook-form           | ^7.71.2  |
| react-router-dom          | ^7.13.1  |
| tailwind-merge            | ^3.5.0   |
| tailwindcss               | ^4.2.1   |
| chart.js                  | ^4.5.1   |
| chartjs-plugin-datalabels | ^2.2.1   |
| react-chartjs-2           | ^5.3.1   |

### Dev Dependencies

| Package Name                | Version  |
| --------------------------- | -------- |
| @eslint/js                  | ^9.39.1  |
| @testing-library/jest-dom   | ^6.9.1   |
| @testing-library/react      | ^16.3.2  |
| @testing-library/user-event | ^14.6.1  |
| @types/jest                 | ^30.0.0  |
| @types/jsonwebtoken         | ^9.0.10  |
| @types/node                 | ^24.12.0 |
| @types/react                | ^19.2.7  |
| @types/react-dom            | ^19.2.3  |
| @vitejs/plugin-react        | ^5.1.1   |
| eslint                      | ^9.39.1  |
| eslint-plugin-react-hooks   | ^7.0.1   |
| eslint-plugin-react-refresh | ^0.4.24  |
| globals                     | ^16.5.0  |
| jest                        | ^30.2.0  |
| jest-environment-jsdom      | ^30.2.0  |
| ts-jest                     | ^29.4.6  |
| typescript                  | ~5.9.3   |
| typescript-eslint           | ^8.48.0  |
| vite                        | ^7.3.1   |

# Base API URL

**Deployed URL :**

```bash
https://vehicle-dashboard-r3b4.vercel.app/
```

**Local URL :**

```bash
http://localhost:5173/
```

When you running your application using **npm run dev**

# 🚀 Getting Started

## 1️⃣ Install Dependencies

```bash
npm install
```

---

## 2️⃣ Setup Environment Variables

Create `.env` file:

```env
// Vercel URL if railway expired already
VITE_API_BASE_URL=https://be-ticketing.vercel.app/
VITE_API_BACKEND_BASE_URL=https://vpic.nhtsa.dot.gov/api/
```

---

## 3️⃣ Run Development

```bash
npm run dev
```

---

## 🏗 Build Production

```bash
npm run build
```

## 🏗 Run Production

```bash
npm run preview
```

## 🏗 Testing

```bash
npm run test
```

# 📂 Project Structure

```
src/
 ├── assets/
 │    ├── svgs/
 │         │── car.tsx
 ├── components/
 │    ├── __test__/
 │         │── Button.test.tsx
 │         │── Dropdown.test.tsx
 │         │── Input.test.tsx
 │    ├── Button.tsx
 │    ├── Dropdown.tsx
 │    ├── Input.tsx
 ├── middlewares/
 │    └── AuthenticationRoute.tsx
 ├── lib/
 ├── pages/
 │    ├── Dashboard/
 │         │── index.tsx
 │         │── components/
 │              └── ComparisonChartByModels.tsx
 │              └── DynamicCountryDoughnutChart.tsx
 │    ├── Login/
 │    ├── ...
 ├── utils/
 │    ├── classnames.ts
 │    ├── date.ts
 │    ├── clearCookie.ts
 │    ├── ...
 ├── types/
 ├── App.css
 ├── App.tsx
 ├── index.tsx
 └── index.css
```
