export function convertUnixTimestampToReadableFormat(unixTimestamp, timezoneOffset) {
    // Convert the Unix timestamp to a dayjs object in UTC
    const dateObject = dayjs.unix(unixTimestamp).utc();

    // Apply the timezone offset in seconds
    const localDateObject = dateObject.add(timezoneOffset, 'second');

    // Format the date and time
    const formattedDate = localDateObject.format('dddd, D MMMM YYYY');
    const formattedTime = localDateObject.format('h:mm A');

    return [formattedDate, formattedTime];
}
  