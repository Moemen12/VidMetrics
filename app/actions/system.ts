"use server";

import { revalidateTag } from "next/cache";
import { logError } from "@/lib/logger";

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

export async function revalidateChannelData() {
    try {
        revalidateTag('channel-profile', 'max');
        revalidateTag('videos', 'max');
        revalidateTag('shorts', 'max');
        revalidateTag('competitors', 'max');

        return { success: true, now: Date.now() };
    } catch (error) {
        await logError({
            message: error instanceof Error ? error.message : "Revalidation failed",
            stack: error instanceof Error ? error.stack : undefined
        }, "Revalidation Action");
        return { success: false };
    }
}
