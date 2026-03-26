"use server";

import { redirect } from "next/navigation";
import { revalidateTag } from "next/cache";
import { logError } from "@/lib/logger";

/**
 * Logs an error to the server-side file from a Client Component.
 */
/**
 * Logs an error to the server-side file from a Client Component.
 */
export async function logErrorAction(
    error: {
        message: string;
        stack?: string;
        digest?: string;
        code?: string;
    },
    context?: string
) {
    await logError(error, context);
}

export async function analyzeChannel(formData: FormData) {
    const handle = formData.get("handle") as string;
    if (!handle) return;

    // Basic validation and formatting
    const formattedHandle = handle.startsWith("@") ? handle : `@${handle}`;

    // Redirect to dashboard with handle
    redirect(`/dashboard?channel=${encodeURIComponent(formattedHandle)}`);
}

export async function revalidateChannelData() {
    revalidateTag('channel-profile', 'max');
    revalidateTag('videos', 'max');
    revalidateTag('shorts', 'max');
    revalidateTag('competitors', 'max');
    return { revalidated: true, now: Date.now() };
}
