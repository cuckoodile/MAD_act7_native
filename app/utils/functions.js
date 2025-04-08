export const dateSanitizer = (data) => {
    return new Date(data).toLocaleString("en-US", {
      year: "numeric",
      day: "2-digit",
      month: "long",
    });
  };