// reminder.js

// Change this function to match how your app checks if today's questions are filled in
function questionsFilledToday() {
  // Example: Save a flag in localStorage when questions are filled
  const today = new Date().toISOString().slice(0, 10); // "YYYY-MM-DD"
  return localStorage.getItem("questionsFilled") === today;
}

// Call this when questions are filled in your form
function markQuestionsFilled() {
  const today = new Date().toISOString().slice(0, 10);
  localStorage.setItem("questionsFilled", today);
}

// Request notification permission if needed
function requestNotificationPermission() {
  if ("Notification" in window && Notification.permission !== "granted") {
    Notification.requestPermission();
  }
}

// Send a reminder
function sendReminder() {
  if (questionsFilledToday()) return; // Stop reminding if already filled

  const message = "Please fill in your daily Chatboyt questions!";
  if ("Notification" in window && Notification.permission === "granted") {
    new Notification("Chatboyt Reminder", { body: message });
  } else {
    alert(message);
  }
}

// Schedule reminders from 17:00 to 22:00 (5 PM–10 PM)
function startReminders() {
  const now = new Date();
  const hour = now.getHours();
  const minute = now.getMinutes();

  // Only run reminders between 17:00 and 21:45 (last at 21:45)
  if (hour >= 17 && hour < 22) {
    // Calculate time until next 15-min slot
    const nextSlotMinutes = 15 - (minute % 15);
    const msUntilNextSlot = nextSlotMinutes * 60 * 1000;

    setTimeout(function() {
      sendReminder();
      // After first, continue every 15 min until 22:00
      const reminderInterval = setInterval(function() {
        // Stop at 22:00 or if filled
        const h = new Date().getHours();
        if (h >= 22 || questionsFilledToday()) {
          clearInterval(reminderInterval);
          return;
        }
        sendReminder();
      }, 15 * 60 * 1000);
    }, msUntilNextSlot);
  }
}

// Call these when the app starts
requestNotificationPermission();
startReminders();

// Make sure you call markQuestionsFilled() in your form when questions are completed!
