import Image from "next/image";

export default function CompetitorHeader() {
    const competitors = [
        { name: "MrBeast", avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDkBRfVhXIFJqlR1JZA8lZ46-I9mm3ShhMFURNtefAaQSeZEyz-wNyvN8uR3r9UmUi_MHaUmlva5fAtEaVpEMlnfjwYaZ_mFlsVmtj_Jeaw8-lFlrZxC0lZGXzSDwI2PLyRSrSMULc_gOh0SxfbBMEHAoLgv1QzqUXlyFNIpobUJOiTnV1mT5AjOA_CPzS0iqVL4MX2RyBqsos_KfZwacxJGYe675h46GW9XTZK7dqx8PBB5NC8JbxSa8J94GGpHyncUUi5I3RTZ1rW" },
        { name: "Veritasium", avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDkBRfVhXIFJqlR1JZA8lZ46-I9mm3ShhMFURNtefAaQSeZEyz-wNyvN8uR3r9UmUi_MHaUmlva5fAtEaVpEMlnfjwYaZ_mFlsVmtj_Jeaw8-lFlrZxC0lZGXzSDwI2PLyRSrSMULc_gOh0SxfbBMEHAoLgv1QzqUXlyFNIpobUJOiTnV1mT5AjOA_CPzS0iqVL4MX2RyBqsos_KfZwacxJGYe675h46GW9XTZK7dqx8PBB5NC8JbxSa8J94GGpHyncUUi5I3RTZ1rW" },
        { name: "MKBHD", avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDkBRfVhXIFJqlR1JZA8lZ46-I9mm3ShhMFURNtefAaQSeZEyz-wNyvN8uR3r9UmUi_MHaUmlva5fAtEaVpEMlnfjwYaZ_mFlsVmtj_Jeaw8-lFlrZxC0lZGXzSDwI2PLyRSrSMULc_gOh0SxfbBMEHAoLgv1QzqUXlyFNIpobUJOiTnV1mT5AjOA_CPzS0iqVL4MX2RyBqsos_KfZwacxJGYe675h46GW9XTZK7dqx8PBB5NC8JbxSa8J94GGpHyncUUi5I3RTZ1rW" }
    ];

    return (
        <div className="flex items-center justify-center gap-4 bg-surface-container-low p-6 rounded-2xl border border-outline-variant/30 shadow-xl overflow-x-auto no-scrollbar">
            {competitors.map((comp, i) => (
                <div key={comp.name} className="flex items-center gap-4">
                    <div className="flex flex-col items-center gap-2 group cursor-pointer transition-all duration-300 hover:scale-110">
                        <div className={`relative w-16 h-16 rounded-full border-2 ${i === 2 ? 'border-primary ring-4 ring-primary/10' : 'border-outline-variant'}`}>
                            <Image
                                src={comp.avatar}
                                alt={comp.name}
                                fill
                                className="rounded-full object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all"
                            />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant group-hover:text-primary">{comp.name}</span>
                    </div>
                    {i < competitors.length - 1 && (
                        <span className="text-xl font-black italic text-outline-variant/50 mx-2">Vs.</span>
                    )}
                </div>
            ))}
        </div>
    );
}
