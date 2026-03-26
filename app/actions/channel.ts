"use server";

import { redirect } from "next/navigation";

export async function analyzeChannel(formData: FormData) {
    const handle = formData.get("handle") as string;
    if (!handle) return;

    // Basic validation and formatting
    const formattedHandle = handle.startsWith("@") ? handle : `@${handle}`;

    // Redirect to dashboard with handle
    redirect(`/dashboard?channel=${encodeURIComponent(formattedHandle)}`);
}
