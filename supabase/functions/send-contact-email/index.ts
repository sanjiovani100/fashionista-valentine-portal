import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const formData: ContactFormData = await req.json();
    
    // Send confirmation email to the user
    const userEmailResponse = await resend.emails.send({
      from: "Fashionistas <onboarding@resend.dev>",
      to: [formData.email],
      subject: "We've received your message!",
      html: `
        <h1>Thank you for contacting us, ${formData.firstName}!</h1>
        <p>We have received your message and will get back to you as soon as possible.</p>
        <p>Your message details:</p>
        <ul>
          <li>Subject: ${formData.subject}</li>
          <li>Message: ${formData.message}</li>
        </ul>
        <p>Best regards,<br>The Fashionistas Team</p>
      `,
    });

    // Send notification email to admin
    const adminEmailResponse = await resend.emails.send({
      from: "Fashionistas Contact Form <onboarding@resend.dev>",
      to: ["ai@socialmediaville.ca"],
      subject: `New Contact Form Submission: ${formData.subject}`,
      html: `
        <h1>New Contact Form Submission</h1>
        <h2>Contact Details:</h2>
        <ul>
          <li>Name: ${formData.firstName} ${formData.lastName}</li>
          <li>Email: ${formData.email}</li>
          <li>Phone: ${formData.phone || 'Not provided'}</li>
          <li>Subject: ${formData.subject}</li>
        </ul>
        <h2>Message:</h2>
        <p>${formData.message}</p>
      `,
    });

    return new Response(
      JSON.stringify({ 
        message: "Emails sent successfully",
        userEmail: userEmailResponse,
        adminEmail: adminEmailResponse
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);