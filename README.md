# rhema-webstudio

A personal website and service business landing page with a Flutterwave payment flow for website packages.

## Tech stack
- Next.js
- TypeScript
- Flutterwave
- Vercel

## Local setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env.local` file with your project values:
   ```env
   FLUTTERWAVE_PUBLIC_KEY=your_public_key
   FLUTTERWAVE_SECRET_KEY=your_secret_key
   FLUTTERWAVE_ENCRYPTION_KEY=your_encryption_key
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

3. Run the app:
   ```bash
   npm run dev
   ```

4. Open http://localhost:3000

## Production deployment
- Deploy on Vercel
- Add your live environment variables
- Set your Flutterwave webhook URL to your production domain

## Payment flow
- the homepage shows website packages
- the client clicks a package button
- the frontend calls `/api/create-payment`
- the backend creates a Flutterwave payment session
- the client is redirected to the Flutterwave checkout page
- Flutterwave posts a webhook to `/api/flutterwave-webhook`
- payment is verified and saved
