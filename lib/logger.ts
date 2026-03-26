import { promises as fs } from 'node:fs';
import path from 'node:path';

const LOG_FILE = path.join(process.cwd(), 'error.log');

/**
 * Logs an error to a local 'error.log' file asynchronously.
 * Handles both Error instances and plain objects from Client Components.
 */
export async function logError(error: unknown, context?: string): Promise<void> {
    const timestamp = new Date().toLocaleString();

    let summary = 'Unknown Error';
    let details = '';

    // 1. Handle standard Error instances (usually from server-side throws)
    if (error instanceof Error) {
        summary = error.message;
        details = error.stack || 'No stack trace available';
    }
    // 2. Handle plain objects sent via Server Actions (from Client Components)
    else if (typeof error === 'object' && error !== null) {
        const errObj = error as {
            message?: string;
            stack?: string;
            digest?: string;
            code?: string
        };

        // Use the message if available, otherwise fall back to a generic label
        summary = errObj.message || 'Object-based Error';

        // In Production, the 'digest' is the only way to link client errors to server logs
        if (errObj.digest) {
            summary += ` [Digest: ${errObj.digest}]`;
        }

        // If a custom error code exists (like QUOTA_EXCEEDED), include it
        if (errObj.code) {
            summary = `(${errObj.code}) ${summary}`;
        }

        details = errObj.stack || JSON.stringify(error, null, 2);
    }
    // 3. Handle simple string errors
    else if (typeof error === 'string') {
        summary = error;
        details = 'N/A';
    }

    const location = context ? ` [Context: ${context}]` : "";

    const logEntry = `
========================================
TIMESTAMP: ${timestamp}${location}
ERROR: ${summary}
DETAILS:
${details}
========================================
`;

    try {
        // Append to file asynchronously
        await fs.appendFile(LOG_FILE, logEntry, 'utf8');
    } catch (err) {
        // Fallback to a clean console error if file writing fails
        const message = err instanceof Error ? err.message : 'Unknown logging error';
        console.error('❌ Log File Write Failed:', message);

        // Only dump the full object in development to keep production logs clean
        if (process.env.NODE_ENV === 'development') {
            console.error('Original Error:', error);
        }
    }
}