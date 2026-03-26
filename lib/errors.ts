export class AppError extends Error {
    constructor(public message: string, public code: string, public status: number = 500) {
        super(message);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}

export class QuotaExceededError extends AppError {
    constructor(message: string = "YouTube API quota exceeded. Please try again tomorrow.") {
        super(message, "QUOTA_EXCEEDED", 403);
    }
}

export class ChannelNotFoundError extends AppError {
    constructor(handle: string) {
        super(`Channel not found for handle: ${handle}`, "CHANNEL_NOT_FOUND", 404);
    }
}

export class YouTubeApiError extends AppError {
    constructor(message: string) {
        super(message, "YOUTUBE_API_ERROR", 500);
    }
}
