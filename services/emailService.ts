import { http } from "@/lib/http";

export type ContactEmailRequest = {
  name: string;
  email: string;
  message: string;
};

export type SendEmailResponse = {
  success: boolean;
  message: string;
};

async function contact(
  payload: ContactEmailRequest
): Promise<SendEmailResponse> {
  return http<SendEmailResponse>("/emails/contact", {
    method: "POST",
    body: {
      to: "contact@foodfloripa.com", // destino fixo
      nome: payload.name,
      email: payload.email,
      mensagem: payload.message,
    },
  });
}

export const emailService = {
  contact,
};