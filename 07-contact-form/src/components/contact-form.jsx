import submitForm, { SUBMIT_URL } from "../lib/submitForm";

export default function ContactForm() {
  return (
    <form
      onSubmit={submitForm}
      method="post"
      action={SUBMIT_URL}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
        gap: "12px",
      }}
    >
      <label htmlFor="name">Name</label>
      <input className="border" type="text" id="name" name="name" />

      <label htmlFor="email">Email</label>
      <input className="border" type="email" id="email" name="email" />

      <label htmlFor="message">Message</label>
      <textarea className="border"id="message" name="message" />

      <button className="border p-2 bg-slate-100">Send</button>
    </form>
  );
}
