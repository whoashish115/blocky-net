<p align="center">
  <img src="banner.png" alt="Blocky Net banner" width="100%">
</p>

<h1 align="center">🟪Blocky Net</h1>
<p align="center">
  <strong>A full-stack crypto news, blogging, and content-management platform built with Next.js, MongoDB, and Express.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Frontend-Next.js-black?logo=next.js" alt="Next.js">
  <img src="https://img.shields.io/badge/React-17-61DAFB?logo=react&logoColor=black" alt="React">
  <img src="https://img.shields.io/badge/UI-Material_UI-007FFF?logo=mui&logoColor=white" alt="Material UI">
  <img src="https://img.shields.io/badge/Database-MongoDB-47A248?logo=mongodb&logoColor=white" alt="MongoDB">
  <img src="https://img.shields.io/badge/API-Express.js-404D59?logo=express" alt="Express">
  <img src="https://img.shields.io/badge/License-MIT-yellow" alt="MIT License">
</p>

## Overview

Blocky Net is a full-stack publishing platform focused on cryptocurrency content. It combines a public blog/news website, authentication, reader engagement features, an admin content-management dashboard, analytics views, newsletter/report handling, and a separate cryptocurrency data API.

The project is organized into two main applications:

- `site/` contains the Next.js web app, public pages, admin dashboard, API routes, MongoDB models, authentication flow, and UI components.
- `api/` contains an Express service that serves cryptocurrency coin and historical chart data from local JSON files with API fallback helpers.

## Features

### Modern Website

- Homepage with blog feed, recent posts, trending posts, and slider content.
- Blog category pages and blog detail pages.
- Dynamic static-style pages through `/page/[slug]`.
- Saved blogs page for authenticated users.
- Search and filtering support through query parameters.
- Responsive layout with light and dark themes.
- Custom 404 and 500 error pages.

### Blog and Content System

- Blog create, update, delete, publish-status, like, dislike, save, and unsave flows.
- Category-based content organization.
- Markdown/editor support for rich blog writing.
- Reading time, slug generation, sharing, and blog action components.
- Comment system with create, update, delete, like, dislike, publish, heart, and report flows.
- Blog view tracking and analytics data.

### Authentication and Users

- Sign up, sign in, account activation, forgot password, and reset password pages.
- JWT-based access and refresh token helpers.
- Password hashing with bcrypt.
- User profile update API.
- User roles, root/admin flags, ban status, avatar, bio, and saved blog list.

### Admin Dashboard

- Admin home dashboard.
- Create/edit flows for blogs, categories, pages, navigation items, navigation categories, and users.
- Data tables for blogs, categories, comments, pages, users, navigations, and navigation categories.
- Comment moderation tools.
- Analytics pages with chart components.
- Latest blog performance and latest joined user dashboard widgets.

### Crypto Data

- Separate Express cryptocurrency backend.
- `GET /api/cryptocurrency/coins` returns coin list/trending coin data.
- `GET /api/cryptocurrency/coin/:id` returns single coin details and historical chart data.
- Local JSON data cache under `api/data/`.
- CoinMarketCap/custom crypto API integration path through the frontend API route.

### Integrations

- MongoDB/Mongoose for persistent application data.
- Cloudinary upload support for images.
- Gmail OAuth2/Nodemailer support for account activation and password reset email.
- Chart.js and React Chart.js for analytics visualizations.
- MUI and Emotion for component styling and theming.

## Screenshots

Screenshots are stored in `screenshots/light/` and `screenshots/dark/`.
<table>
  <tr>
    <td align="center"><strong>Light Theme</strong><br><br><img src="screenshots/light/1.png" width="360" alt="Blocky Net light screenshot 1"></td>
    <td align="center"><strong>Dark Theme</strong><br><br><img src="screenshots/dark/1.png" width="360" alt="Blocky Net dark screenshot 1"></td>
  </tr>
  <tr>
    <td align="center"><img src="screenshots/light/2.png" width="360" alt="Blocky Net light screenshot 2"></td>
    <td align="center"><img src="screenshots/dark/2.png" width="360" alt="Blocky Net dark screenshot 2"></td>
  </tr>
  <tr>
    <td align="center"><img src="screenshots/light/3.png" width="360" alt="Blocky Net light screenshot 3"></td>
    <td align="center"><img src="screenshots/dark/3.png" width="360" alt="Blocky Net dark screenshot 3"></td>
  </tr>
  <tr>
    <td align="center"><img src="screenshots/light/4.png" width="360" alt="Blocky Net light screenshot 4"></td>
    <td align="center"><img src="screenshots/dark/4.png" width="360" alt="Blocky Net dark screenshot 4"></td>
  </tr>
  <tr>
    <td align="center"><img src="screenshots/light/5.png" width="360" alt="Blocky Net light screenshot 5"></td>
    <td align="center"><img src="screenshots/dark/5.png" width="360" alt="Blocky Net dark screenshot 5"></td>
  </tr>
  <tr>
    <td align="center"><img src="screenshots/light/6.png" width="360" alt="Blocky Net light screenshot 6"></td>
    <td align="center"><img src="screenshots/dark/6.png" width="360" alt="Blocky Net dark screenshot 6"></td>
  </tr>
  <tr>
    <td align="center"><img src="screenshots/light/7.png" width="360" alt="Blocky Net light screenshot 7"></td>
    <td align="center"><img src="screenshots/dark/7.png" width="360" alt="Blocky Net dark screenshot 7"></td>
  </tr>
  <tr>
    <td align="center"><img src="screenshots/light/8.png" width="360" alt="Blocky Net light screenshot 8"></td>
    <td align="center"><img src="screenshots/dark/8.png" width="360" alt="Blocky Net dark screenshot 8"></td>
  </tr>
  <tr>
    <td align="center"><img src="screenshots/light/9.png" width="360" alt="Blocky Net light screenshot 9"></td>
    <td align="center"><img src="screenshots/dark/9.png" width="360" alt="Blocky Net dark screenshot 9"></td>
  </tr>
  <tr>
    <td align="center"><img src="screenshots/light/10.png" width="360" alt="Blocky Net light screenshot 10"></td>
    <td align="center"><img src="screenshots/dark/10.png" width="360" alt="Blocky Net dark screenshot 10"></td>
  </tr>
  <tr>
    <td align="center"><img src="screenshots/light/11.png" width="360" alt="Blocky Net light screenshot 11"></td>
    <td align="center"><img src="screenshots/dark/11.png" width="360" alt="Blocky Net dark screenshot 11"></td>
  </tr>
  <tr>
    <td align="center"><img src="screenshots/light/12.png" width="360" alt="Blocky Net light screenshot 12"></td>
    <td align="center"><img src="screenshots/dark/12.png" width="360" alt="Blocky Net dark screenshot 12"></td>
  </tr>
  <tr>
    <td align="center"><img src="screenshots/light/13.png" width="360" alt="Blocky Net light screenshot 13"></td>
    <td align="center"><img src="screenshots/dark/13.png" width="360" alt="Blocky Net dark screenshot 13"></td>
  </tr>
</table>


## Technology Stack

| Layer | Technologies |
| --- | --- |
| Frontend | Next.js 12, React 17 |
| UI | Material UI, Emotion, CSS, Swiper |
| State | React Context with reducer/action structure |
| Backend in `site/` | Next.js API Routes |
| Crypto Backend in `api/` | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Auth | JWT, bcrypt, cookies |
| Media Upload | Cloudinary |
| Email | Nodemailer, Google OAuth2 |
| Analytics | Chart.js, React Chart.js |
| Crypto Data | Local JSON cache, CoinMarketCap/custom API support |

## Project Structure

```text
blocky-net/
├── README.md
├── LICENSE
├── banner.png
├── screenshots/
│   ├── dark/
│   └── light/
├── api/
│   ├── package.json
│   ├── server.js
│   ├── env.txt
│   ├── content/
│   ├── controllers/
│   ├── data/
│   ├── routes/
│   └── utils/
└── site/
    ├── package.json
    ├── next.config.js
    ├── components/
    ├── middleware/
    ├── models/
    ├── pages/
    ├── public/
    ├── store/
    ├── styles/
    ├── theme/
    └── utils/
```


## Getting Started

### Prerequisites

- Node.js 16 or newer
- npm
- MongoDB database, local or hosted
- Cloudinary account for uploads
- Gmail OAuth2 credentials if email activation/reset is used

### 1. Install Frontend Dependencies

```bash
cd site
npm install
```

### 2. Install Crypto API Dependencies

```bash
cd ../api
npm install
```

### 3. Configure Environment Variables

Create `.env.local` inside `site/` and `.env` inside `api/`. Use the variables below as a starting point.

### 4. Run the Frontend

```bash
cd site
npm run dev
```

The frontend runs on `http://localhost:3000`.

### 5. Run the Crypto API

```bash
cd api
npm start
```

The Express API runs on `http://localhost:5000` by default.

## Environment Variables

### Frontend: `site/.env.local`

```env
NEXT_PUBLIC_BASE_URL=http://localhost:3000

MONGODB_URL=mongodb://127.0.0.1:27017/blocky_net

CLIENT_URL=http://localhost:3000
BASE_URL=http://localhost:3000

ACTIVATION_TOKEN_SECRET=your_activation_secret
ACCESS_TOKEN_SECRET=your_access_secret
REFRESH_TOKEN_SECRET=your_refresh_secret

MAILING_SERVICE_CLIENT_ID=your_google_oauth_client_id
MAILING_SERVICE_CLIENT_SECRET=your_google_oauth_client_secret
MAILING_SERVICE_REFRESH_TOKEN=your_google_oauth_refresh_token
SENDER_EMAIL_ADDRESS=your_email@example.com

NEXT_PUBLIC_CLOUD_NAME=your_cloudinary_cloud_name
NEXT_PUBLIC_CLOUD_UPDATE_PRESET=your_cloudinary_upload_preset

COINMARKETCAP_CUSTOM_API=http://localhost:5000/api/cryptocurrency/coins
```

### Crypto API: `api/.env`

```env
PORT=5000
CLIENT_URL=http://localhost:3000
ADMIN_URL=http://localhost:3000/admin
BASE_URL=http://localhost:5000

MONGODB_URL=mongodb://127.0.0.1:27017/blocky_net

ACTIVATION_TOKEN_SECRET=your_activation_secret
ACCESS_TOKEN_SECRET=your_access_secret
REFRESH_TOKEN_SECRET=your_refresh_secret

MAILING_SERVICE_CLIENT_ID=your_google_oauth_client_id
MAILING_SERVICE_CLIENT_SECRET=your_google_oauth_client_secret
MAILING_SERVICE_REFRESH_TOKEN=your_google_oauth_refresh_token
SENDER_EMAIL_ADDRESS=your_email@example.com

GOOGLE_SECRET=your_google_secret
```

## Available Scripts

### `site/`

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Next.js development server. |
| `npm run build` | Build the production frontend. |
| `npm start` | Start the production frontend with Next.js. |

### `api/`

| Command | Description |
| --- | --- |
| `npm start` | Start the Express cryptocurrency API. |

## Important Routes

### Public Frontend Routes

| Route | Purpose |
| --- | --- |
| `/` | Homepage with blog feed, slider, recent posts, and trending posts. |
| `/blog/[category]` | Blog listing filtered by category. |
| `/blog/[category]/[slug]` | Blog detail page. |
| `/blog/mysaved` | Authenticated user's saved blogs. |
| `/page/[slug]` | Dynamic CMS page. |
| `/auth/signin` | Sign-in page. |
| `/auth/signup` | Sign-up page. |
| `/auth/forgotpassword` | Forgot password page. |
| `/auth/resetpassword/[token]` | Reset password page. |
| `/auth/user/activate/[token]` | Account activation page. |

### Admin Routes

| Route Group | Purpose |
| --- | --- |
| `/admin` | Admin dashboard. |
| `/admin/create/*` | Create blogs, categories, pages, users, and navigation records. |
| `/admin/edit/*` | Edit existing content and navigation records. |
| `/admin/data/*` | Manage users, blogs, categories, pages, comments, and navigation records. |
| `/admin/analytics` | Analytics dashboard. |
| `/admin/analytics/[slug]` | Per-content analytics page. |

### API Route Summary

| Module | Examples |
| --- | --- |
| Auth | `/api/auth/signup`, `/api/auth/signin`, `/api/auth/accessToken`, `/api/auth/forgotPassword`, `/api/auth/resetPassword` |
| Blog | `/api/blog`, `/api/blog/all`, `/api/blog/bySlug/[slug]`, `/api/blog/byCategory/[slug]`, `/api/blog/search/[search]` |
| Blog Actions | `/api/blog/actions/[id]/like`, `/save`, `/dislike`, `/unsave` |
| Comments | `/api/comment`, `/api/comment/actions/[id]/like`, `/delete`, `/update` |
| Admin | `/api/admin/blog`, `/api/admin/category`, `/api/admin/page`, `/api/admin/user`, `/api/admin/navigation` |
| Views | `/api/views`, `/api/views/updateBlogViews`, `/api/views/allViews` |
| CMS | `/api/page`, `/api/category`, `/api/navigation`, `/api/navigationCategory` |
| Other | `/api/newsletter`, `/api/report`, `/api/cryptoCurrency` |
| Express Crypto API | `/api/cryptocurrency/coins`, `/api/cryptocurrency/coin/:id` |

## System Design

Blocky Net follows a layered full-stack architecture. The Next.js app owns presentation, server-rendered pages, application API routes, authentication, and CMS data. MongoDB stores durable application state. The separate Express service acts as a crypto-data provider, returning locally cached coin JSON data and falling back to external crypto data utilities where possible.

```mermaid
flowchart LR
    User["User Browser"] --> Next["Next.js Site"]
    Next --> Pages["Public Pages and Admin UI"]
    Next --> ApiRoutes["Next.js API Routes"]
    ApiRoutes --> Mongo["MongoDB"]
    ApiRoutes --> Mail["Gmail OAuth2 / Nodemailer"]
    Next --> Cloudinary["Cloudinary Upload API"]
    Next --> CryptoRoute["/api/cryptoCurrency"]
    CryptoRoute --> Express["Express Crypto API"]
    Express --> JsonCache["api/data JSON Cache"]
    Express --> External["External Crypto Data APIs"]
```

From a software-design perspective, the system separates concerns into clear layers:

- Presentation layer: React components, themes, layouts, admin screens, and public pages.
- Application layer: Next.js API routes implement blog, auth, user, comment, admin, CMS, newsletter, report, and analytics behavior.
- Persistence layer: Mongoose models define users, blogs, categories, comments, pages, navigation, reports, newsletters, and views.
- Integration layer: Cloudinary handles media uploads, Nodemailer handles email workflows, and the Express API serves cryptocurrency market data.
- Data-access layer: Utility modules centralize database connection, request helpers, validation, token generation, image upload, and mail sending.

This design is useful for a CMS-style crypto publication because editorial workflows, reader-facing pages, authentication, and market data have different change rates. Keeping the cryptocurrency service separate from the main content platform makes market-data handling easier to cache, replace, or deploy independently.

## Data Models

The `site/models/` folder includes schemas for:

- Blogs
- Categories
- Comments
- Navigation and navigation categories
- Newsletters
- Pages
- Reports
- Single-type content
- Users
- Views

These models support both the public website and admin dashboard.

## Deployment Notes

- Deploy `site/` as the main Next.js application.
- Deploy `api/` separately if the cryptocurrency API is needed in production.
- Set all environment variables in the hosting provider.
- Configure Cloudinary upload presets securely before public deployment.
- Use strong JWT secrets for all token variables.
- Make sure MongoDB network access allows the deployed application.

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

## Author

Ashish Kumar
