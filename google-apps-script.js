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
    // Get the spreadsheet - use getActiveSpreadsheet() to get the bound spreadsheet
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    
    // Get the first sheet (index 0) - this is more reliable than getActiveSheet()
    // If you need a specific sheet by name, use: spreadsheet.getSheetByName('Sheet1')
    const sheet = spreadsheet.getSheets()[0];
    
    if (!sheet) {
      return ContentService.createTextOutput(
        JSON.stringify({ success: false, error: 'No sheet found' })
      ).setMimeType(ContentService.MimeType.JSON);
    }
    
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    const { name, email, phone, message } = data;
    
    // Validate required fields (only name and phone are required)
    if (!name || !phone) {
      return ContentService.createTextOutput(
        JSON.stringify({ success: false, error: 'Missing required fields: name and phone are required' })
      ).setMimeType(ContentService.MimeType.JSON);
    }
    
    // Get the last row with data (header is row 1, so data starts at row 2)
    const lastRow = sheet.getLastRow();
    
    // Calculate the next STT (index)
    // If lastRow is 1 (only header), next STT is 1
    // If lastRow is 6 (header + 5 data rows), next STT is 5 (since row 2 has STT=1, row 6 has STT=5)
    // So next STT = lastRow (which will be the row number, and STT = row number - 1 for data rows)
    // Actually, looking at the sheet structure: row 2 has STT=1, row 3 has STT=2, etc.
    // So STT = lastRow - 1 (since header is row 1)
    // Next STT = lastRow (since we're adding to row lastRow + 1)
    const nextIndex = lastRow; // This will be the STT value for the new row
    
    // Prepare the row data: [STT, Họ và tên, Số điện thoại, Email, Tin nhắn]
    // Email and message are optional, use empty string if not provided
    const rowData = [
      nextIndex,           // Column A: STT (index)
      name,                // Column B: Họ và tên
      phone,               // Column C: Số điện thoại
      email || '',         // Column D: Email (optional)
      message || ''        // Column E: Tin nhắn (optional)
    ];
    
    // Append the new row to the sheet
    sheet.appendRow(rowData);
    
    // Return success response
    return ContentService.createTextOutput(
      JSON.stringify({ 
        success: true, 
        message: 'Data added successfully',
        index: nextIndex,
        row: lastRow + 1
      })
    ).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    // Log error for debugging
    Logger.log('Error in doPost: ' + error.toString());
    Logger.log('Stack: ' + error.stack);
    
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

