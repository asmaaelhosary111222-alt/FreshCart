import { z } from "zod";

const egyptianPhoneRegex =
  /^(?:\+20|20|0)?1[0125][0-9]{8}$/;

function countWords(value: string) {
  return value.trim().split(/\s+/).filter(Boolean).length;
}

export const checkoutSchema = z
  .object({
    city: z
      .string()
      .trim()
      .min(1, "City is required."),

    details: z
      .string()
      .trim()
      .min(1, "Street address is required."),

    phone: z
      .string()
      .trim()
      .min(1, "Phone number is required.")
      .regex(
        egyptianPhoneRegex,
        "Please enter a valid Egyptian phone number."
      ),

    paymentMethod: z.enum(["cash", "online"]),

    usingSavedAddress: z.boolean(),
  })
  .superRefine((data, ctx) => {
    /*
     * Existing saved addresses come directly from the API,
     * so their stored details are accepted as-is.
     *
     * The 50-word requirement applies to a newly entered address.
     */
    if (
      !data.usingSavedAddress &&
      countWords(data.details) < 50
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["details"],
        message:
          "Street address must contain at least 50 words.",
      });
    }
  });

export type CheckoutFormValues = z.infer<
  typeof checkoutSchema
>;