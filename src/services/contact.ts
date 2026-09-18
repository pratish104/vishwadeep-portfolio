export type ContactPayload = {
  name: string;
  email: string;
  message: string;
};

export type ContactResult =
  | { status: "sent" }
  | { status: "unavailable"; message: string };

export async function sendContactMessage(
  payload: ContactPayload,
): Promise<ContactResult> {
  // Replace this function with a real backend call.
  //
  // Example:
  //
  // const response = await fetch("/api/contact", {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify(payload),
  // });
  //
  // if (!response.ok) {
  //   throw new Error("Message delivery failed.");
  // }
  //
  // return { status: "sent" };
  //
  // Keep email-service secret keys on the server, never in Vite variables
  // exposed to the browser.

  void payload;

  return {
    status: "unavailable",
    message:
      "Your message has not been sent because message delivery is not connected yet. Your text is still here so you can copy it.",
  };
}
