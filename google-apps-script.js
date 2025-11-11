/**
 * Google Apps Script for Soleil Landing Contact Form
 * 
 * INSTRUCTIONS:
 * 1. Open your Google Sheet
 * 2. Go to Extensions > Apps Script
 * 3. Delete any existing code and paste this entire file
 * 4. Click the SAVE icon (floppy disk) or press Ctrl+S / Cmd+S
 * 5. Click "Deploy" > "New deployment"
 * 6. Click the gear icon next to "Select type" and choose "Web app"
 * 7. Set:
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 8. Click "Deploy"
 * 9. Copy the Web App URL and add it to your .env.local file as GOOGLE_SCRIPT_URL
 * 10. Make sure to authorize the script when prompted
 */

function doPost(e) {
  try {
    // Get the active spreadsheet
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    const { name, email, phone, message } = data;
    
    // Validate required fields
    if (!name || !email || !phone || !message) {
      return ContentService.createTextOutput(
        JSON.stringify({ success: false, error: 'Missing required fields' })
      ).setMimeType(ContentService.MimeType.JSON);
    }
    
    // Get the last row to calculate the next index (STT)
    const lastRow = sheet.getLastRow();
    const nextIndex = lastRow; // This will be the row number (STT column A)
    
    // Prepare the row data: [STT, Họ và tên, Số điện thoại, Email, Tin nhắn]
    const rowData = [
      nextIndex,           // Column A: STT (index)
      name,                // Column B: Họ và tên
      phone,               // Column C: Số điện thoại
      email,               // Column D: Email
      message              // Column E: Tin nhắn
    ];
    
    // Append the new row to the sheet
    sheet.appendRow(rowData);
    
    // Return success response
    return ContentService.createTextOutput(
      JSON.stringify({ 
        success: true, 
        message: 'Data added successfully',
        index: nextIndex
      })
    ).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    // Return error response
    return ContentService.createTextOutput(
      JSON.stringify({ 
        success: false, 
        error: error.toString() 
      })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

// Optional: Test function to verify the script works
function testDoPost() {
  const mockEvent = {
    postData: {
      contents: JSON.stringify({
        name: "Test User",
        email: "test@example.com",
        phone: "0123456789",
        message: "This is a test message"
      })
    }
  };
  
  const result = doPost(mockEvent);
  Logger.log(result.getContent());
}

