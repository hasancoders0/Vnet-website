import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,

  port: Number(process.env.SMTP_PORT),

  secure: process.env.SMTP_SECURE === "true",

  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendContactEmail({
  firstName,
  lastName,
  email,
  subject,
  message,
}) {
  const fullName = `${firstName} ${lastName}`;

  await transporter.sendMail({
    from: `"${fullName}" <${process.env.SMTP_USER}>`,

    to: process.env.CONTACT_EMAIL,

    replyTo: email,

    subject: `New Contact Form: ${subject}`,

    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.7;">
        <h2>New Contact Form Submission</h2>

        <p><strong>Name:</strong> ${fullName}</p>

        <p><strong>Email:</strong> ${email}</p>

        <p><strong>Subject:</strong> ${subject}</p>

        <hr />

        <p><strong>Message:</strong></p>

        <p>${message.replace(/\n/g, "<br>")}</p>
      </div>
    `,
  });
}