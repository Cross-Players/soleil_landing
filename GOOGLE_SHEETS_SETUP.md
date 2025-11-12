# Google Sheets Integration Setup

This guide will help you set up the Google Sheets integration for the contact form.

## Step 1: Deploy Google Apps Script

1. Open your Google Sheet: example: https://docs.google.com/spreadsheets/d/1416L7_6sxvV61jw46U6brCIJ8eZ23ZaVFBh3JU3khB4/edit?gid=0#gid=0

2. Go to **Extensions** > **Apps Script**

3. Delete any existing code and paste the contents of `google-apps-script.js` from the project root

4. Click **Deploy** > **New deployment**

5. Click the gear icon (⚙️) next to "Select type" and choose **Web app**

6. Configure the deployment:
   - **Execute as**: Me
   - **Who has access**: Anyone

7. Click **Deploy**

8. **Copy the Web App URL** - you'll need this for the next step

9. When prompted, click **Authorize access** and follow the authorization steps

## Step 2: Configure Environment Variable

1. Create a `.env` file in the project root (if it doesn't exist)

2. Add the following line with your Web App URL:
   ```
   GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
   ```

3. Replace `YOUR_SCRIPT_ID` with the actual script ID from the URL you copied

## Step 3: Test the Integration

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to the contact form on your website

3. Fill out and submit the form

4. Check your Google Sheet - the data should appear in the next available row with:
   - **Column A (STT)**: Index number
   - **Column B (Họ và tên)**: Name
   - **Column C (Số điện thoại)**: Phone number
   - **Column D (Email)**: Email address
   - **Column E (Tin nhắn)**: Message

## Troubleshooting

- **403 Forbidden Error**: Make sure you set "Who has access" to "Anyone" in the Apps Script deployment
- **Data not appearing**: Check the browser console and server logs for errors
- **CORS errors**: The Google Apps Script should handle CORS automatically, but make sure the deployment is set to "Anyone"

## Notes

- The script automatically calculates the index (STT) based on the row number
- Each form submission adds a new row to the sheet
- The form includes validation for all required fields before submission

