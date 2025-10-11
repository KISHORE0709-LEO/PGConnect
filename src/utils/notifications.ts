// Utility functions for sending notifications and reminders

export const sendRentReminder = async (tenantName: string, tenantEmail: string, roomNo: string) => {
  // In a real application, this would integrate with email service or SMS service
  // For demo purposes, we'll just show a success message
  
  try {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In production, you would call your email/SMS service here
    console.log(`Rent reminder sent to ${tenantName} (${tenantEmail}) for room ${roomNo}`);
    
    return {
      success: true,
      message: `Rent reminder sent successfully to ${tenantName}`
    };
  } catch (error) {
    return {
      success: false,
      message: 'Failed to send reminder. Please try again.'
    };
  }
};

export const makePhoneCall = (phoneNumber: string) => {
  // Open phone dialer
  if (phoneNumber) {
    window.location.href = `tel:${phoneNumber}`;
  }
};

export const sendWhatsAppMessage = (phoneNumber: string, message: string) => {
  // Open WhatsApp with pre-filled message
  if (phoneNumber) {
    const cleanNumber = phoneNumber.replace(/[^0-9]/g, '');
    const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  }
};

export const generateRentReminderMessage = (tenantName: string, roomNo: string, monthlyRent: number) => {
  return `Hi ${tenantName}, this is a friendly reminder that your rent for room ${roomNo} (₹${monthlyRent.toLocaleString()}) is due. Please make the payment at your earliest convenience. Thank you!`;
};