import { MessageSquareText } from "lucide-react";
import Image from "next/image";

export default function VisualHookAnalysis() {
    const hooks = [
        { channel: "MrBeast", thumb: "https://lh3.googleusercontent.com/aida-public/AB6AXuBvwAUH398cNIKxTouDU4QBc_ceDMhstwq02JFs-Vaq1OY_4L6cnCklEVK8Fdc7joxLmzEHTI4v2iXyfKZT_wmRNB512dhR6fHW1BDmFSgmZu1vaFdw8BIdRtSxdGbmgrSGcc8YRzv9A5TdCv2_UaOmrJsaLZAkTqZonQXi0zAu8G5EuGNcxjfPVbkTibGCrtQE_FPoHHqrbw-amcAlZBSlKkqSB9ljz3M7C9xtR_CEqTPKmZ0dkWe85wUm7BRcUrMyLoxoueBeWubW" },
        { channel: "MKBHD", thumb: "https://lh3.googleusercontent.com/aida-public/AB6AXuBO-Qt9YX9doV8Lf0oY4OYgZlT2kX0TVgx8BYnxpJXFMCpj8CZnWpPw53mu1WP9O7N16i4bu7RWPIF1tMADMQXvJsXUr-MDx7w4ZgdjSShm74AsbyTj-MkAx28rB8z8Etfx2ES6ZNAg2XA6zxCujGXM7VNHRobW7MG76_pXGLhE-BgwD9Q3DAThln7C-E0DCLLu3G6CW6RQLqI2C9IrVjoh9giiQhgqNez4E0sjJmOl9cO-3VmQ9UGmfTPLxjdrVT84fOyOSxVGsJ_5" },
        { channel: "Veritasium", thumb: "https://lh3.googleusercontent.com/aida-public/AB6AXuAFK2SjWCwfAntFx3SSQvnZ0QdMh7UvqWsLTdPibYXCPZ3XGDY-nr5EoGwCSmJIGgxitIrm8n7W9bWsoJqpYfKV6A3CQx2WYN9OZfAQWYAYzsljVWhTMOpLt7L9q8HzL0DqBUBYU9EC3rKMwjqYoPMagnFK2P_iW0hXncd744oZNH8mfj6ST9FA3kcsLkjiCqvuWKrKOPf8-PsUZD4mOByRYEo0c-Tyew_DKSf_I5iNomZ-GHSbHGx3BoZs2nPXsfpWuHb992p49hBM" }
    ];

    return (
        <div className="bg-surface-container rounded-2xl border border-outline-variant p-6 space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg tracking-tight">Visual Hook Analysis</h3>
                <MessageSquareText className="w-5 h-5 text-primary" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {hooks.map((h) => (
                    <div key={h.channel} className="space-y-3 group">
                        <div className="relative aspect-video rounded-xl overflow-hidden border border-outline-variant/30 group-hover:border-primary/50 transition-all">
                            <Image src={h.thumb} alt={h.channel} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-primary rounded-full text-[8px] font-black text-on-primary uppercase tracking-tighter shadow-glow-sm">Top Hook</div>
                        </div>
                        <p className="text-[10px] font-black uppercase text-on-surface-variant tracking-widest text-center group-hover:text-primary">{h.channel}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
