// Format time from dateAdded

export function formatTime(dateString: string): string {
  const date = new Date(dateString);

  // Specify the options for formatting
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
    // hour: "numeric",
    // minute: "numeric",
    // second: "numeric",
    // timeZoneName: "short",
  };

  // Create a formatter with the specified options
  const formatter = new Intl.DateTimeFormat("en-US", options);

  // Format the date
  const formattedDate = formatter.format(date);

  return formattedDate;
}

/////////////////////

// Generate skeletonLoading
export const skeletonItems = Array.from({ length: 9 }, (_, index) => index);
